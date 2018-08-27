# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import fields, models, api, _, exceptions


class SaleFrame(models.Model):
    _name = 'sale.frame'
    _inherit = ['mail.thread']
    _description = 'Sale of frames'
    _order = 'create_date desc'
    
    @api.onchange('product_id')
    def onchange_product_id(self):
        if self.product_id.left_over:
            self.left_over = self.product_id.left_over 
    
    @api.onchange('length', 'width', 'units', 'uom_id', 'left_over')
    def onchange_calculate_meters(self):
        if not self.uom_id or not self.product_id:
            return False

        length_m = self.convert_to_meters(self.length, self.uom_id)
        width_m = self.convert_to_meters(self.width, self.uom_id)
        left_over_m = self.convert_to_meters(self.left_over, self.uom_id)
        
        self.lineal_meters = ((length_m*2 + width_m*2) + left_over_m)*self.units
        self.square_metres = length_m*width_m*self.units
    
    def convert_to_meters(self, measure, dimensional_uom):
        uom_meters = self.env.ref('product.product_uom_meter')
        return dimensional_uom._compute_quantity(measure, uom_meters)
    
    @api.model
    def _get_dimension_leng_domain(self):
        return [('uom_id.category_id', '=', self.env.ref('product.uom_categ_length').id)]
    
    @api.model
    def _get_product_with_dimension(self):
        return [('uom_id', 'in', [self.env.ref('product_dimension_and_edge.product_uom_m2').id, 
                                  self.env.ref('product_dimension_and_edge.product_uom_cm2').id])]
        
    @api.model
    def _get_dimension_uom_domain(self):
        return [('category_id', '=', self.env.ref('product.uom_categ_length').id)]
        
    def _set_default_uom(self):
        return self.env.ref('product.product_uom_cm').id
    
    name = fields.Char(string='Number', readonly=True, required=True, copy=False, default=lambda self: self.env['ir.sequence'].next_by_code('sale.frame'), index=True)
    description = fields.Char(string='Description', states={'definitive': [('readonly', True)]})
    partner_id = fields.Many2one('res.partner', string='Customer', readonly=True, states={'draft': [('readonly', False)]}, required=True, index=True, track_visibility='always')
    state = fields.Selection([('draft', 'Draft'),
                              ('definitive', 'Definitive')], string='Status', readonly=True, copy=False, index=True, track_visibility='onchange', default='draft')
    product_id = fields.Many2one('product.product', string='Product', required=True, index=True, track_visibility='always', states={'definitive': [('readonly', True)]}, domain=_get_dimension_leng_domain)
    units = fields.Float(string='Units', default=1, required=True, states={'definitive': [('readonly', True)]})
    length = fields.Float(string='Length', required=True, states={'definitive': [('readonly', True)]})
    width = fields.Float(string='Width', required=True, states={'definitive': [('readonly', True)]})
    uom_id = fields.Many2one('product.uom', string = 'Dimensional UoM', domain=_get_dimension_uom_domain, default=_set_default_uom, help='UoM for length, width and left over', required=True, states={'definitive': [('readonly', True)]})
    left_over = fields.Float(string='Left Over', states={'definitive': [('readonly', True)]})
    order_id = fields.Many2one('sale.order', string='Sale/Quotation', readonly=True)
    product_ids = fields.Many2many('product.product', string="Products", states={'definitive': [('readonly', True)]}, domain=_get_product_with_dimension)
    lineal_meters = fields.Float (string = 'Total lineal meters', readonly=True, compute=onchange_calculate_meters)
    square_metres = fields.Float (string = 'Total m2/u', readonly=True, compute=onchange_calculate_meters)

    @api.multi
    def _prepare_order_lines(self, order):
        lines_vals = []
        lines_vals.append({'order_id': order,
                           'product_id': self.product_id.id,
                           'name': _('%s: %s%s x %s%s, %s units') % (self.product_id.display_name, 
                                                                     self.length, 
                                                                     self.uom_id.name, 
                                                                     self.width, 
                                                                     self.uom_id.name, 
                                                                     self.units),
                           'product_uom_qty': self.lineal_meters,
                           'product_uom': self.env.ref('product.product_uom_meter').id})
        for line in self.product_ids:
            lines_vals.append({'order_id': order,
                               'product_id': line.id,
                               'name': _('%s: %s%s x %s%s, %s units') % (line.display_name, 
                                                                         self.length, 
                                                                         self.uom_id.name, 
                                                                         self.width, 
                                                                         self.uom_id.name, 
                                                                         self.units),
                               'product_uom_qty': self.square_metres,
                               'product_uom': self.env.ref('product_dimension_and_edge.product_uom_m2').id})

        return lines_vals
    
    @api.multi
    def add_to_order(self, order):
        try:
            if order.origin:
                order.origin = order.origin + ' | ' + self.name
            else:
                order.origin = self.name
            lines = self._prepare_order_lines(order.id)
            for line in lines:
                order.order_line.create(line)
            self.order_id = order
        except:
            raise exceptions.ValidationError(_("ERROR: To add lines in sale order"))
    
    @api.multi
    def action_view_order(self):
        return {
                'name'      : _('Sale order'),
                'type'      : 'ir.actions.act_window',
                'res_model' : 'sale.order',
                'res_id'    : self.order_id.id,
                'view_id'   : self.env.ref('sale.view_order_form').id,
                'view_type' : 'form',
                'view_mode' : 'form',
            }
        
    @api.multi
    def action_order_create(self):
        try:
            order = self.order_id.create({'partner_id': self.partner_id.id})
            self.add_to_order(order)
            self.state = 'definitive'
        except:
            raise exceptions.ValidationError(_("ERROR: To create sale order"))
        return True
    
    @api.multi
    def action_order_add(self):
        return {
                'name': _('Add to order'),
                'type': 'ir.actions.act_window',
                'res_model': 'wizard.add.order',
                'view_mode': 'form',
                'target': 'new',
                'context': {'partner_id': self.partner_id.id}
                }
