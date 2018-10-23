# -*- encoding: utf-8 -*-
from odoo import models, fields, exceptions, api, _
#import odoo.addons.decimal_precision as dp


class DistributionLinePricelistWizard(models.TransientModel):
    _name = "distribution.line.pricelist.wizard"
    
    distribution_line_id = fields.Many2one(comodel_name="purchase.cost.distribution.line", string="Distribution")
    name = fields.Char(related="distribution_line_id.product_id.display_name", store=True)
    pricelist_ids = fields.Many2many(comodel_name="pricelist.value.wizard")
    standard_price = fields.Float(related="distribution_line_id.standard_price_new", store=True)
    benefit_margin = fields.Float(related="distribution_line_id.benefit_margin", store=True)
    old_sale_price = fields.Float(related="distribution_line_id.old_sale_price", store=True)
    benefit_price = fields.Float(related="distribution_line_id.benefit_price", store=True)
    sale_price = fields.Float(compute="_sale_price_compute")
    
    def _sale_price_comute(self):
        print "jojo"
        
    @api.model
    def create(self, vals):
        res = super(DistributionLinePricelistWizard, self).create(vals)
        
        return res

class PricelistValuesWizard(models.TransientModel):
    _name = "pricelist.values.wizard"
    
    name = fields.Float(string="Value")
    product_id = fields.Many2one()
    pricelist_id = fields.Many2one()