# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _


class WizardDimension(models.TransientModel):
    _name = 'wizard.dimension'
    _description = 'Wizard to set the dimension product'
    
    @api.onchange('length', 'width', 'units', 'dimensional_uom_id')
    def onchange_calculate_quantity(self):
        if not self.dimensional_uom_id or not self.product_tmpl_id:
            return False
        
        l = 1 if not self.length else self.length
        w = 1 if not self.width else self.width
        u = 1 if not self.units else self.units

        length_m = self.convert_to_meters(l, self.dimensional_uom_id)
        width_m = self.convert_to_meters(w, self.dimensional_uom_id)
        self.quantity = length_m * width_m * u
    
    def convert_to_meters(self, measure, dimensional_uom):
        uom_meters = self.env.ref('product.product_uom_meter')
        return dimensional_uom._compute_quantity(measure, uom_meters)
    
    @api.model
    def _get_dimension_uom_domain(self):
        return [('category_id', '=', self.env.ref('product.uom_categ_length').id)]
    
    @api.model
    def _get_product_with_dimension(self):
        return [('uom_id', 'in', [self.env.ref('product_dimension_extend.product_uom_m2').id, 
                                  self.env.ref('product_dimension_extend.product_uom_cm2').id])]
        
    def _set_default_uom(self):
        return self.env.ref('product.product_uom_cm').id
    
    product_tmpl_id = fields.Many2one ('product.template', domain=_get_product_with_dimension, required = True)
    length = fields.Float (string = 'Length')
    width = fields.Float (string = 'Width')
    units = fields.Float (string = 'Units')
    dimensional_uom_id = fields.Many2one ('product.uom', string = 'Dimensional UoM', domain=_get_dimension_uom_domain, default = _set_default_uom, help='UoM for length and width', required = True)
    quantity = fields.Float (string = 'Quantity', readonly = True, compute = onchange_calculate_quantity)
    
    @api.model
    def create(self, vals):
        res = super(WizardDimension, self).create(vals)
        ctx = self.env.context
        order = self.env[ctx['active_model']].browse(ctx['active_id'])
        values = {'order_id': order.id,
                  'name': _('%s: %s%s x %s%s, %s units') % (res.product_tmpl_id.display_name, 
                                                            res.length, 
                                                            res.dimensional_uom_id.name, 
                                                            res.width, 
                                                            res.dimensional_uom_id.name, 
                                                            res.units),
                  'product_id': res.product_tmpl_id.id,
                  'product_uom_qty': res.quantity,
                  'product_uom': res.product_tmpl_id.uom_id.id}
        line = order.order_line.create(values)
        return res
    
    @api.multi
    def action_set_order_line(self):
        self.ensure_one()
        if 'open_window' in self.env.context.keys() and self.env.context['open_window']:
            return {'view_mode': 'form',
                    'res_model': 'wizard.dimension',
                    'type': 'ir.actions.act_window',
                    'target': 'new',
                    'context': {'active_id': self.env.context['active_id'], 
                                'active_model': self.env.context['active_model']}}
        
        