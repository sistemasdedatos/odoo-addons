from datetime import datetime, timedelta
from openerp.tools import DEFAULT_SERVER_DATE_FORMAT, DEFAULT_SERVER_DATETIME_FORMAT, DATETIME_FORMATS_MAP, float_compare
from openerp.osv import fields, osv
from openerp.tools.safe_eval import safe_eval as eval
from openerp.tools.translate import _
import pytz
from openerp import SUPERUSER_ID
from openerp import models, api

class sale_order_line(osv.osv):
    _inherit = 'sale.order.line'
    
    def product_id_change_with_wh(self, cr, uid, ids, pricelist, product, qty=0,
            uom=False, qty_uos=0, uos=False, name='', partner_id=False,
            lang=False, update_tax=True, date_order=False, packaging=False, fiscal_position=False, flag=False, warehouse_id=False, context=None):
        context = context or {}
        product_uom_obj = self.pool.get('product.uom')
        product_obj = self.pool.get('product.product')
        warning = {}
        #UoM False due to hack which makes sure uom changes price, ... in product_id_change
        res = self.product_id_change(cr, uid, ids, pricelist, product, qty=qty,
            uom=False, qty_uos=qty_uos, uos=uos, name=name, partner_id=partner_id,
            lang=lang, update_tax=update_tax, date_order=date_order, packaging=packaging, fiscal_position=fiscal_position, flag=flag, context=context)

        if not product:
            res['value'].update({'product_packaging': False})
            return res

        # set product uom in context to get virtual stock in current uom
        if 'product_uom' in res.get('value', {}):
            # use the uom changed by super call
            context = dict(context, uom=res['value']['product_uom'])
        elif uom:
            # fallback on selected
            context = dict(context, uom=uom)

        #update of result obtained in super function
        product_obj = product_obj.browse(cr, uid, product, context=context)
        res['value'].update({'product_tmpl_id': product_obj.product_tmpl_id.id, 'delay': (product_obj.sale_delay or 0.0)})

        # Calling product_packaging_change function after updating UoM
        res_packing = self.product_packaging_change(cr, uid, ids, pricelist, product, qty, uom, partner_id, packaging, context=context)
        res['value'].update(res_packing.get('value', {}))
        warning_msgs = res_packing.get('warning') and res_packing['warning']['message'] or ''

        if product_obj.type == 'product':
            #determine if the product needs further check for stock availibility
            is_available = self._check_routing(cr, uid, ids, product_obj, warehouse_id, context=context)

            #check if product is available, and if not: raise a warning, but do this only for products that aren't processed in MTO
            if not is_available:
                uom_record = False
                if uom:
                    uom_record = product_uom_obj.browse(cr, uid, uom, context=context)
                    if product_obj.uom_id.category_id.id != uom_record.category_id.id:
                        uom_record = False
                if not uom_record:
                    uom_record = product_obj.uom_id
                compare_qty = float_compare(product_obj.virtual_available, qty, precision_rounding=uom_record.rounding)
                if compare_qty == -1:
                    warn_msg = _('You plan to sell %.2f %s but you only have %.2f %s available !\nThe real stock is %.2f %s. (without reservations)') % \
                        (qty, uom_record.name,
                         max(0,product_obj.virtual_available), uom_record.name,
                         max(0,product_obj.qty_available), uom_record.name)
                    warning_msgs += _("Prueba ! : ") + warn_msg + "\n\n" 

        #update of warning messages
        if warning_msgs:
            warning = {
                       'title': _('Configuration Error!'),
                       'message' : warning_msgs
                    }
        ###########res.update({'warning': warning})            #quitamos el mensaje de stock negativo
        return res