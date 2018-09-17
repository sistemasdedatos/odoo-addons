# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, api   
    
    
class document_report_barcode (models.AbstractModel):
    _name = 'report.print_document_barcode.document_barcode_report'
   
    @api.multi
    def render_html(self, docids, data=None):
        self.model = 'wizard.barcode'
        docs = self.env[self.model].browse(data.get('id'))
        docargs = {
             'doc_ids': docids,
             'doc_model': self.model,
             'docs': docs,
             'data': data,
        }
        return self.env['report'].render('print_document_barcode.document_barcode_report', docargs)