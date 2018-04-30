# -*- coding: utf-8 -*-
# Copyright 2004-2010 OpenERP SA
# Copyright 2017 RGB Consulting S.L. (https://www.rgbconsulting.com)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import fields, models, api


class PosOrder(models.Model):
    _inherit = 'pos.order'
    
    @api.model
    def create_from_ui(self, orders):
        res = super(PosOrder, self).create_from_ui(orders)
        for order in orders:
            order_partner = order['data']['partner_id']
            order_points = order['data']['loyalty_points']
            if order_partner and order_points != 0:
                loyalty_program = self.session_id.browse(order['data']['pos_session_id']).config_id.loyalty_id
                points = self.env['loyalty.point'].create({'pos_id': self.search([('pos_reference', '=', order['data']['name'])]).id,
                                                           'partner_id': order_partner,
                                                           'loyalty_program_id': loyalty_program.id,
                                                           'points': order_points,
                                                           'available_points': order_points,
                                                           'date_add': order['data']['creation_date']})
                if loyalty_program.refund_point_rule == 'prev_points' and order_points < 0:
                    loyalty_program.discount_prev_points(points)
        return res
    
    