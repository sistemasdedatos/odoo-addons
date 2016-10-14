# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
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


class res_users(models.Model):
    _inherit = "res.users"
    warehouse_id = fields.Many2one('stock.warehouse', 'Warehouse')
    
res_users ()

class sale_order(models.Model):
    _inherit = "sale.order"

    @api.multi 
    def onchange_partner_id(self, part):
        if not part:
            return {'value': {'partner_invoice_id': False, 'partner_shipping_id': False, 'payment_term': False, 'fiscal_position': False}}
         
        val = super(sale_order, self).onchange_partner_id (part)
        part = self.env['res.users'].browse ([self._uid])
        warehouse = part.warehouse_id and part.warehouse_id.id or 1     #1 es el almacen principal
        val.get ('value', {}).update ({'warehouse_id': warehouse})
        return val
 
sale_order ()

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
