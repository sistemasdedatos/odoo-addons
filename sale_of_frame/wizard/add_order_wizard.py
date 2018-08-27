# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions


class WizardAddOrder(models.TransientModel):
    _name = 'wizard.add.order'
    _description = 'Wizard to set sale frame in sale order'
    
    order_id = fields.Many2one('sale.order', string='Sale/Quotation')

    def action_set_order_line(self):
        model = self._context.get('active_model')
        active_id = self._context.get('active_id')
        sale_frame_id = self.env[model].browse(active_id)
        sale_frame_id.add_to_order(self.order_id)
        sale_frame_id.state = 'definitive'
        return True
