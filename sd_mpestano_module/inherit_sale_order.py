from openerp.osv import osv, fields, orm
from openerp import models, api

class sale_order(osv.osv):

    _inherit = 'sale.order'
    def action_button_confirm(self, cr, uid, ids, context=None):
        super(sale_order, self).action_button_confirm(cr, uid, ids, context=context)
        for order in self.browse(cr, uid, ids, context=context):
            order._check_constrains()
            if order.installment_sale:
                order.project_id.write({'contact_id': order.partner_shipping_id.id})