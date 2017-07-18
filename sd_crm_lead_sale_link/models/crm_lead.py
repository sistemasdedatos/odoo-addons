# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2017 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from openerp import models, fields, api

class CrmLead(models.Model):
    _inherit = 'crm.lead'

    def count_sales_order(self):
        if not self.partner_id:
            return False
        self.sales_order_count = self.env['sale.order'].search_count([
            ('partner_id', '=', self.partner_id.id),
            ('state', 'in', ['progress', 'manual', 'shipping_exept', 'invoice_except', 'done']),
            ('origin', '=', 'Oportunidad: %s' % self.id),
        ])
        self.quotations_count = self.env['sale.order'].search_count([
            ('partner_id', '=', self.partner_id.id),
            ('state', 'in', ['draft', 'sent', 'waiting_date']),
            ('origin', '=', 'Oportunidad: %s' % self.id),
        ])
        
    @api.multi
    def get_sale_order_view(self, order_states, view_title):
        res = super (CrmLead, self).get_sale_order_view(order_states, view_title)
        partner_ids = [lead.partner_id.id for lead in self]
        orders = self.env['sale.order'].search([
            ('partner_id', 'in', partner_ids),
            ('state', 'in', order_states),
            ('origin', '=', 'Oportunidad: %s' % self.id),
        ])
        if len(orders) == 1:
            res['res_id'] = orders[0].id
            res['view_mode'] = 'form'
            res['domain'] = []
        else:
#             res['res_id'] = ''
            res['domain'] = [
                ('state', 'in', order_states),
                ('partner_id', 'in', partner_ids),
                ('origin', '=', 'Oportunidad: %s' % self.id),
            ]
            res['view_mode'] = 'tree,form'
        return res
