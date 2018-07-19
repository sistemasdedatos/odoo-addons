# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions


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
    
    @api.onchange('length_to_edged', 'width_to_edged', 'dimensional_uom_id', 'width', 'length')
    def onchange_calculate_total_edged(self):
        self.total_edged = self.convert_to_meters ((self.length_to_edged * self.length) + (self.width_to_edged * self.width), self.dimensional_uom_id)
    
    def convert_to_meters(self, measure, dimensional_uom):
        uom_meters = self.env.ref('product.product_uom_meter')
        return dimensional_uom._compute_quantity(measure, uom_meters)
    
    @api.model
    def _get_dimension_leng_domain(self):
        return [('type', '=', 'service'), ('uom_id.category_id', '=', self.env.ref('product.uom_categ_length').id)]
    
    @api.model
    def _get_dimension_uom_domain(self):
        return [('category_id', '=', self.env.ref('product.uom_categ_length').id)]
    
    @api.model
    def _get_product_with_dimension(self):
        return [('uom_id', 'in', [self.env.ref('product_dimension_and_edge.product_uom_m2').id, 
                                  self.env.ref('product_dimension_and_edge.product_uom_cm2').id])]
        
    def _set_default_uom(self):
        return self.env.ref('product.product_uom_cm').id
      
    product_tmpl_id = fields.Many2one ('product.template', domain = _get_product_with_dimension, required = True)
    service_cant_id = fields.Many2one ('product.template', domain = _get_dimension_leng_domain)
    length = fields.Float (string = 'Length')
    width = fields.Float (string = 'Width')
    units = fields.Float (string = 'Units', default = 1)
    dimensional_uom_id = fields.Many2one ('product.uom', string = 'Dimensional UoM', domain=_get_dimension_uom_domain, default = _set_default_uom, help='UoM for length and width', required = True)
    to_edged = fields.Boolean (string = 'Edged', required = True, default = False)
    quantity = fields.Float (string = 'Quantity', readonly = True, compute = onchange_calculate_quantity)
    length_to_edged = fields.Float (string = 'Length', default = 0)
    width_to_edged = fields.Float (string = 'Width', default = 0)
    total_edged = fields.Float (string = 'Total to edged (m)', default = 0, readonly = True, compute = onchange_calculate_total_edged)
    
    @api.model
    def create(self, vals):
        max_size = (vals.get('units') if vals.get('units') else self.units) * 4
        current_size = (vals.get('length_to_edged') if vals.get('length_to_edged') else self.length_to_edged) + (vals.get('width_to_edged') if vals.get('width_to_edged') else self.width_to_edged)
        if current_size > max_size:
            raise exceptions.ValidationError(_("You can't edge more sides than there are."))
        res = super(WizardDimension, self).create(vals)
        ctx = self.env.context
        order = self.env[ctx['active_model']].browse(ctx['active_id'])
        product_value = {'order_id': order.id,
                  'name': _('%s: %s%s x %s%s, %s units') % (res.product_tmpl_id.display_name, 
                                                            res.length, 
                                                            res.dimensional_uom_id.name, 
                                                            res.width, 
                                                            res.dimensional_uom_id.name, 
                                                            res.units),
                  'product_id': res.product_tmpl_id.id,
                  'product_uom_qty': res.quantity,
                  'product_uom': res.product_tmpl_id.uom_id.id}
        line = order.order_line.create(product_value)
        if not line:
            raise exceptions.ValidationError(_("ERROR: To add product"))
        if res.to_edged:
            service_value = {'order_id': order.id,
                      'name': _('Edged %s: Lenght %s x %s%s and Width %s x %s%s') % (res.product_tmpl_id.name,
                                                                         res.length_to_edged,
                                                                         res.length, 
                                                                         res.dimensional_uom_id.name,
                                                                         res.width_to_edged, 
                                                                         res.width, 
                                                                         res.dimensional_uom_id.name),
                      
                      'product_id': res.service_cant_id.id,
                      'product_uom_qty': res.total_edged,
                      'product_uom': res.service_cant_id.uom_id.id}
            line = order.order_line.create(service_value)
            if not line:
                raise exceptions.ValidationError(_("ERROR: To add service"))
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
    
    @api.onchange('length_to_edged', 'width_to_edged', 'units')
    def dimension_to_edge(self):
        max_size = self.units * 4
        current_size = self.length_to_edged + self.width_to_edged
        if current_size > max_size:
            raise exceptions.ValidationError(_("You can't edge more sides than there are."))
    
