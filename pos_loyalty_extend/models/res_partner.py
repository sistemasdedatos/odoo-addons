# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import fields, models, api


class ResPartner(models.Model):
    _inherit = 'res.partner'

    loyalty_points = fields.Float(compute = '_compute_points')
    points_ids = fields.One2many('loyalty.point', 'partner_id', readonly = True)
    
    @api.multi
    def _compute_points(self):
        for record in self:
            points_ids = self.env['loyalty.point'].search([('active', '=', True), ('partner_id', '=', record.id)])
            points = 0
            for point in points_ids:
                points = points + point.available_points
            record.loyalty_points = points
