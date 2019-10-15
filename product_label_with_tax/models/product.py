#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

import odoo.addons.decimal_precision as dp
from odoo import models, fields, api, _, exceptions

class ProductTemplate(models.Model):
    _inherit = "product.template"

    @api.multi
    def _compute_price_tax(self):
        for product in self:
            taxes = False
            if product.taxes_id:
                taxes = product.taxes_id.compute_all(price_unit=product.list_price, product=product)
            product.list_price_notax = taxes['total_excluded'] if taxes else product.list_price
            product.list_price_tax = taxes['total_included'] if taxes else product.list_price

    @api.multi
    def _compute_tax_included(self):
        for product in self:
            if product.list_price == product.list_price_notax:
                product.tax_included = True
            elif product.list_price == product.list_price_tax:
                product.tax_included = False

    list_price_tax = fields.Float(
        'Sale Price with tax', compute=_compute_price_tax,
        digits=dp.get_precision('Product Price'),
        help="Base price with tax.")

    list_price_notax = fields.Float(
        'Sale Price without tax', compute=_compute_price_tax,
        digits=dp.get_precision('Product Price'),
        help="Base price without tax.")

    tax_included = fields.Boolean(
        'Price Tax Included', compute=_compute_tax_included)