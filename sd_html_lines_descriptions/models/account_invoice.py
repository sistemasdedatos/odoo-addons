# -*- coding: utf-8 -*-
from openerp import api, models, fields

class account_invoice_line (models.Model):
    _inherit = 'account.invoice.line'
    
    name = fields.Html (string='Description', required=True)