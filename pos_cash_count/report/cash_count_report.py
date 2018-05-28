# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, api, _
from odoo.exceptions import UserError

    
class pos_report_cash_count (models.AbstractModel):
    _name = 'report.pos_cash_count.cash_count_report'
   
    @api.multi
    def render_html(self, docids, data=None):
        self.model = self.env.context.get('active_model')
        docs = self.env[self.model].browse(self.env.context.get('active_id'))
        docargs = {
             'doc_ids': docids,
             'doc_model': self.model,
             'docs': docs,
             'data': data,
        }
        return self.env['report'].render('pos_cash_count.cash_count_report', docargs)
