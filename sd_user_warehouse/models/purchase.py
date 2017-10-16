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
from openerp.tools.translate import _
from openerp import fields, models, api
    
class purchase_order (models.Model):
    _inherit = "purchase.order"
    
    @api.multi
    def onchange_partner_id (self, partner_id):
        res = super (purchase_order, self).onchange_partner_id (partner_id)
        user_id = self.env['res.users'].browse ([self._uid])
        warehouse = user_id.warehouse_id and user_id.warehouse_id.id or False
        if warehouse:
            picking = self.env['stock.picking.type'].search([('code', '=', 'incoming'), ('warehouse_id', '=', warehouse)])[0]
            res.get ('value', {}).update ({'picking_type_id': picking.id})
        return res