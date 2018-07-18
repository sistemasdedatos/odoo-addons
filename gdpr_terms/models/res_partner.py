# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import fields, models, api, _
from odoo.exceptions import UserError


class Partner(models.Model):
    _inherit = 'res.partner'

    gdpr_terms = fields.Html(string = 'GDPR Terms', translate = True)
        
    @api.multi
    def write(self, vals):
        if vals.get('gdpr_terms'):
            current_margin = self.env.ref('report.paperformat_euro')          
            if len(vals.get('gdpr_terms')) <= 12 and current_margin.margin_bottom != 23:
                current_margin.sudo().write({'margin_bottom': 23})
            elif len(vals.get('gdpr_terms')) < 500 and current_margin.margin_bottom != 30:
                current_margin.sudo().write({'margin_bottom': 30})
            elif len(vals.get('gdpr_terms')) < 700 and current_margin.margin_bottom != 40:
                current_margin.sudo().write({'margin_bottom': 40})
            elif len(vals.get('gdpr_terms')) > 700 and current_margin.margin_bottom != 50:
                current_margin.sudo().write({'margin_bottom': 50})
        return super(Partner, self).write(vals) 

class Company(models.Model):
    _inherit = 'res.company'
    
    gdpr_terms = fields.Html(related = 'partner_id.gdpr_terms', string = 'GDPR Terms', default = 'GDPR Terms')
    