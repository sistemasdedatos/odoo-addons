# -*- coding: utf-8 -*-
from openerp import api, models, fields

class sale_order_line (models.Model):
    _inherit = 'sale.order.line'
    
    name = fields.Html ('Description', required = True, readonly = True, states = {'draft': [('readonly', False)]})