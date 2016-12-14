import openerp
from openerp import tools, api
from openerp.osv import osv, fields
from openerp.osv.expression import get_unaccent_wrapper
from openerp.tools.translate import _
import openerp.addons.decimal_precision as dp

class res_partner(osv.Model):
    _inherit = "res.partner"
    
    def _sale_order_count (self, cr, uid, ids, field_name, arg, context=None):
        res = super (res_partner, self)._sale_order_count (cr, uid, ids, field_name, arg, context = None)
        try:
            for partner in self.browse(cr, uid, ids, context):
                for sale in partner.sale_order_ids + partner.mapped ('child_ids.sale_order_ids'):
                    if sale.state in ['draft', 'sent', 'cancel']:
                        res[partner.id] -= 1
        except:
            pass
        return res
    
    def _sale_order_total_amount (self, cr, uid, ids, field_name, arg, context=None):
        res = dict(map(lambda x: (x,0), ids))
        amount = lambda sale: (sale.state not in ['draft', 'sent', 'cancel'], sale.amount_untaxed)
        try:
            for partner in self.browse(cr, uid, ids, context):
                for sale in partner.sale_order_ids + partner.mapped ('child_ids.sale_order_ids'):
                    res[partner.id] += amount (sale)[1] if amount (sale)[0] else 0
        except:
            pass
        return res
    
    def _sale_quotations_count (self, cr, uid, ids, field_name, arg, context=None):
        res = super (res_partner, self)._sale_order_count (cr, uid, ids, field_name, arg, context = None)
        try:
            for partner in self.browse(cr, uid, ids, context):
                for sale in partner.sale_order_ids + partner.mapped ('child_ids.sale_order_ids'):
                    if sale.state not in ['draft', 'sent', 'cancel']:
                        res[partner.id] -= 1
        except:
            pass
        return res
    
    def _sale_quotations_total_amount (self, cr, uid, ids, field_name, arg, context=None):
        res = dict(map(lambda x: (x,0), ids))
        amount = lambda sale: (sale.state in ['draft', 'sent', 'cancel'], sale.amount_untaxed)
        try:
            for partner in self.browse(cr, uid, ids, context):
                for sale in partner.sale_order_ids + partner.mapped ('child_ids.sale_order_ids'):
                    res[partner.id] += amount (sale)[1] if amount (sale)[0] else 0
        except:
            pass
        return res
    
    _columns = {
        'sale_quotations_total_amount': fields.function (_sale_quotations_total_amount, digits_compute = dp.get_precision ('Account'), string = '# of Quotations', type = 'float'),
        'sale_quotations_count': fields.function (_sale_quotations_count, string = '# of Quotations', type = 'integer'),
        'sale_order_count': fields.function (_sale_order_count, string = '# of Sales Order', type = 'integer'),
        'sale_order_total_amount': fields.function (_sale_order_total_amount, digits_compute = dp.get_precision ('Account'), string = '# of Sales Order', type = 'float'),
        }
    
    

