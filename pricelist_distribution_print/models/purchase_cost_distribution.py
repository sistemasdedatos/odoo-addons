from odoo import models, fields, exceptions, api, _
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta


class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"

    def print_pricelist(self):
        wz_pricelist = self.env['product.pricelist.print'].create({'show_sale_price': True,
                                                                   'show_standard_price': True,
                                                                   'product_tmpl_ids': [(6, 0, self.cost_lines.mapped('product_id.product_tmpl_id').ids)],
                                                                   'product_ids': [(6, 0, self.cost_lines.mapped('product_id').ids)]})
        return {
            'type': 'ir.actions.act_window',
            'name': 'Price List',
            'res_model': 'product.pricelist.print',
            'res_id': wz_pricelist.id,
            'src_model': 'purchase.cost.distribution',
            'view_type': 'form',
            'view_mode': 'form',
            'target': 'new'
        }