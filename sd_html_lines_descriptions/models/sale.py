# -*- coding: utf-8 -*-
from openerp import api, models, fields
from openerp.tools import html2plaintext

class sale_order_line (models.Model):
    _inherit = 'sale.order.line'
    
    html_name = fields.Html ('Description', required = True, readonly = True, 
                             states = {'draft': [('readonly', False)], 'send': [('readonly', False)]}, default = "")
    
    @api.onchange ('name')
    def change_name (self):
        self.html_name = self.name
    
    @api.model
    def create (self, values):
        if 'html_name' in values.keys ():
            values['name'] = html2plaintext (values['html_name'])
        return super (sale_order_line, self).create (values)
            
    @api.multi
    def write (self, values):
        for s in self:
            if 'html_name' in values.keys ():
                values['name'] = html2plaintext (values['html_name']) 
            return super (sale_order_line, s).write (values)

        