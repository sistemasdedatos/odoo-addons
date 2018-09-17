# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions


class ModelBarcodeConfig(models.Model):
    _name = 'model.barcode.config'
    _description = 'Config model to print name in barcode'
    
    name = fields.Char(compute='_name_from_model')
    model_id = fields.Many2one(string='Model to print', comodel_name='ir.model', required=True, ondelete='cascade')
    action_server_id = fields.Many2one(string='Action to print barcode', comodel_name='ir.actions.server', readonly=True, ondelete='cascade')
    
    @api.depends('model_id')
    def _name_from_model(self):
        for s in self:
            s.name = _('Print barcode in %s') % (s.model_id.name if s.model_id else '...')
                     
    @api.model
    def create(self, vals):
        res = super(ModelBarcodeConfig, self).create(vals)
        try:
            action = self.env['ir.actions.server'].search([('name', '=', 'Barcode %s print' % res.model_id.name), ('model_id', '=', res.model_id.id)])
            if not action:
                code = """#Call Report
wz_barcode = env['wizard.barcode'].create({})
action = wz_barcode.print_report()
"""
                new_action = {'name': _('Barcode %s print') % res.model_id.name,
                              'model_id': res.model_id.id,
                              'state': 'code',
                              'code': code}
                action = self.env['ir.actions.server'].create(new_action)
            res.action_server_id = action
            res.action_server_id.create_action()
        except Exception:
            raise Warning (_('Error on create action'))
        return res        
    