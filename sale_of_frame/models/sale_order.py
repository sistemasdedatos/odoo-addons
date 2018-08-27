# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions


class SaleOrder(models.Model):
    _inherit = "sale.order"

    def _frames_count(self):
        self.frames_count = self.env['sale.frame'].search_count([('order_id','=',self.id)])
        
    frames_count = fields.Integer(string="# of Frames", compute='_frames_count')