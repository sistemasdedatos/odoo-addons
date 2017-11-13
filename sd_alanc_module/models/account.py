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

class account_move(models.Model):
    _inherit = "account.move"
    _order = 'name desc'
    
class account_invoice (models.Model):
    _name = "account.invoice"
    _inherit = "account.invoice"
    
    sale_order_ids = fields.Many2many ('sale.order', 'sale_order_invoice_rel', 'invoice_id', 'order_id', 'Sales', 
                                       readonly = True, copy = False, 
                                       help = "This is the list of invoices that have been generated for this sales order. The same sales order may have been invoiced in several times (by line for example).")
    
    @api.multi
    def check_supplierinfo(self):
        res = super (account_invoice, self).check_supplierinfo ()
        return res if res else self.signal_workflow('invoice_open')
    
    @api.multi
    def invoice_pay_customer (self):
        res = super (account_invoice, self).invoice_pay_customer ()
        res['context']['default_reference'] = self.number
        res['context']['default_name'] = self.name
        return res
    