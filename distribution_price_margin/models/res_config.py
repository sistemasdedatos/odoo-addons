from odoo import fields, models, _


class PurchaseConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    group_margin_calculation_method = fields.Selection([
        (0, "Method: 'Sale = cost + (cost * %margin)'"),
        (1, "Method: 'Sale = cost / (1 - %margin)'")
        ], "Sale price in cost distribution",
        implied_group='distribution_price_margin.group_margin_calculation_type')
    last_distribution_years = fields.Integer(related="company_id.last_distribution_years", string="Distribution Years", readonly=False)
