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

class account_journal (models.Model):
    _inherit = "account.journal"
    
    warehouse_id = fields.Many2one('stock.warehouse', 'Warehouse/Office')
    
class account_invoice (models.Model):
    _inherit = "account.invoice"
    
    @api.multi
    def onchange_partner_id (self, type, partner_id, date_invoice = False, payment_term = False, partner_bank_id = False, company_id = False):
        types = {'out_invoice': 'sale',
                 'out_refund': 'sale_refund',
                 'in_invoice': 'purchase',
                 'in_refund': 'purchase_refund'}
        res = super (account_invoice, self).onchange_partner_id (type, partner_id, date_invoice, payment_term, partner_bank_id, company_id)
        user_id = self.env['res.users'].browse ([self._uid])
        warehouse = user_id.warehouse_id and user_id.warehouse_id.id or False
        if warehouse and type:
            journal_id = self.env['account.journal'].search ([('warehouse_id', '=', warehouse), ('type', '=', types[type])])[0]
            res.get ('value', {}).update ({'journal_id': journal_id.id})
        return res