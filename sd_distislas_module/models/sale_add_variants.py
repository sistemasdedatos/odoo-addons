from openerp import api, models

class SaleAddVariants (models.TransientModel):
    _inherit = 'sale.add.variants'

    @api.multi
    def add_to_order (self):
        context = self.env.context
        sale_order = self.env['sale.order'].browse (context.get ('active_id'))
        for line in self.variant_line_ids:
            if not line.product_uom_qty:
                continue
            line_values = {
                'product_id': line.product_id.id,
                'product_uom_qty': line.product_uom_qty,
                'product_uom': line.product_uom.id,
                'order_id': sale_order.id
            }
            l = sale_order.order_line.create (line_values)
            l.onchange_item_id ()
