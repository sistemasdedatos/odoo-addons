# -*- coding: utf-8 -*-
from odoo import fields, models


class PurchaseConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    group_margin_calculation_method = fields.Selection([
        (0, "Method: 'Sale = cost + (cost * %margin)'"),
        (1, "Method: 'Sale = cost / (1 - %margin)'")
        ], "Sale price in distribution cost",
        implied_group='distribution_price_margin.group_margin_calculation_type',
        help="""Method to calculate sale price in distribution cost.""")