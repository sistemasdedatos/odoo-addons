# -*- encoding: utf-8 -*-
#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
import odoo.addons.decimal_precision as dp
from odoo import models, fields, api, _, exceptions

class ProductTemplate(models.Model):
    _inherit = "product.template"

    @api.multi
    def _compute_price_tax(self):
        for product in self:
            taxes = product.taxes_id
            amount = 0.0
            for t in taxes:
                amount = amount * (t.amount/100) if amount > 0 and t.amount > 0 else t.amount/100
            product.list_price_tax = product.list_price + (product.list_price * amount) if amount > 0 else t.list_price

    list_price_tax = fields.Float(
        'Sale Price with tax', compute=_compute_price_tax,
        digits=dp.get_precision('Product Price'),
        help="Base price with tax.")