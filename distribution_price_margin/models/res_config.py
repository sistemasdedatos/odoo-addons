# -*- coding: utf-8 -*-
from odoo import fields, models


class PurchaseConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    group_margin_calculation_method = fields.Selection([
        (0, "Method: 'Sale = cost + (cost * %margin)'"),
        (1, "Method: 'Sale = cost / (1 - %margin)'")
        ], "Sale price in cost distribution",
        implied_group='purchase.group_purchase_manager')
