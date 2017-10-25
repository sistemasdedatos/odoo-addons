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
from openerp.exceptions import Warning

class pos_session (models.Model):
    _inherit = 'pos.session'
    
    @api.multi
    def wkf_action_close (self):
        # Close CashBox
        res = super (pos_session, self).wkf_action_close ()
        account_id = self.env['account.account'].search([('code', 'like', '430000')])
        concilie_wizard = self.env['account.automatic.reconcile'].create ({'account_ids': [(6, 0, [account_id.id])],
                                                                           'power': 2})
        concilie_wizard.reconcile ()                #Se concilian los fiados de la cuenta 430000
        return res
