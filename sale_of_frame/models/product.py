# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import fields, models, api


class ProductProduct(models.Model):
    _inherit = 'product.product'
    
    left_over = fields.Float(string='Left Over', help="Left over to sale frame aplication")
    
    
class ProductTemplate(models.Model):
    _inherit = "product.template"
    
    left_over = fields.Float(string='Left Over', compute='_compute_left_over', inverse='_set_left_over', store=True, help="Left over to sale frame aplication")
    
    @api.depends('product_variant_ids', 'product_variant_ids.volume')
    def _compute_left_over(self):
        unique_variants = self.filtered(lambda template: len(template.product_variant_ids) == 1)
        for template in unique_variants:
            template.left_over = template.product_variant_ids.left_over
        for template in (self - unique_variants):
            template.left_over = 0.0

    @api.one
    def _set_left_over(self):
        if len(self.product_variant_ids) == 1:
            self.product_variant_ids.left_over = self.left_over