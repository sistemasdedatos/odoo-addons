# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions


class WizardBarcode(models.TransientModel):
    _name = 'wizard.barcode'
    
    name = fields.One2many('wizard.barcode.names', 'wizard_barcode_id', 'Names')
    model = fields.Char(default=lambda self: self.env.context.get('active_model', False))
    
    @api.multi
    def set_data(self):
        document_ids = self.env[self.model].browse(self.env.context.get('active_ids', False))
        for doc in document_ids:
            if doc.display_name.strip() == self.env['ir.model'].search([('model','=',self.model)]).name:
                raise exceptions.UserError(_('One or more documents do not have name'))
            self.name.create({'name': doc.display_name,
                              'wizard_barcode_id': self.id})
    
    @api.multi
    def print_report(self):
        self.set_data()
        data = {}
        data.update(self.read(['name'])[0])
        return self.env['report'].get_action(self, 'print_document_barcode.document_barcode_report', data)


class WizardBarcodeNames(models.TransientModel):
    _name = 'wizard.barcode.names'
    
    name = fields.Char()
    wizard_barcode_id = fields.Many2one(comodel_name='wizard.barcode')