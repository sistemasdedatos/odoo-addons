# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
import openerp.addons.decimal_precision as dp
from openerp import api, models, fields, _


class purchaseAddVariants(models.TransientModel):
    _name = 'purchase.add.variants'

    product_tmpl_id = fields.Many2one('product.template', string="Template",
                                      required=True)
    variant_line_ids = fields.One2many('purchase.add.variants.line', 'wizard_id',
                                       string="Variant Lines")

    @api.multi
    def clear_previous_selections(self):
        self.mapped('variant_line_ids').unlink()

    @api.onchange('product_tmpl_id')
    def _onchange_product_tmpl_id(self):
        if self.product_tmpl_id:
            variant_lines = []
            for variant in self.product_tmpl_id.product_variant_ids:
                variant_lines.append([0, 0, {
                    'product_id': variant.id,
                    'product_uom_qty': 0,
                    'product_uom': variant.uom_id.id,
                    'price_unit': 0.0
                }])
            self.variant_line_ids = variant_lines

    @api.multi
    def add_to_order(self):
        context = self.env.context
        purchase_order = self.env['purchase.order'].browse(context.get('active_id'))
        for line in self.variant_line_ids:
            if not line.product_uom_qty:
                continue
            line_values = {
                'product_id': line.product_id.id,
                'product_qty': line.product_uom_qty,
                'product_uom': line.product_uom.id,
                'order_id': purchase_order.id,
                'price_unit': line.price_unit,
                'name': line.product_id.display_name,
                'date_planned': purchase_order.date_order,
            }
            l = purchase_order.order_line.create(line_values)
            l.onchange_item_id ()

    @api.multi
    def add_to_order_continue(self):
        self.add_to_order()
        self.clear_previous_selections()
        return self.open_new_window()

    @api.multi
    def open_new_window(self):
        return {
            'type': 'ir.actions.act_window',
            'res_model': 'purchase.add.variants',
            'name': _('Add Variants'),
            'view_type': 'form',
            'view_mode': 'form',
            'target': 'new',
            'nodestroy': True,
            'context': self.env.context
        }


class purchaseAddVariantsLine(models.TransientModel):
    _name = 'purchase.add.variants.line'

    wizard_id = fields.Many2one('purchase.add.variants')
    product_id = fields.Many2one('product.product', string="Variant",
                                 required=True, readonly=True)
    product_uom_qty = fields.Float(
        string="Quantity", digits_compute=dp.get_precision('Product UoS'))
    product_uom = fields.Many2one('product.uom', string='Unit of Measure ',
                                  required=True)
    price_unit = fields.Float(
        string="Price", digits_compute=dp.get_precision('Product Price'))
