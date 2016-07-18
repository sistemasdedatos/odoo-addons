# -*- encoding: utf-8 -*-
# #############################################################################
#
#    Web Easy Switch Company module for OpenERP
#    Copyright (C) 2014 GRAP (http://www.grap.coop)
#    @author Sylvain LE GAL (https://twitter.com/legalsylvain)
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

from openerp.osv.orm import Model


class res_users(Model):
    _inherit = 'res.users'

    # Custom Function Section
    def change_current_company(self, cr, uid, company_id, context=None):
        hr_id = self.pool['hr.employee'].search(cr, 1, [('user_id', '=', uid)], context=context)
        journal_id = self.pool['account.analytic.journal'].search(cr, 1, [('company_id', '=', company_id),('name', '=', 'Timesheet Journal')], context=context)
        print hr_id
        print journal_id
        if len (hr_id) and len (journal_id):
            self.pool['hr.employee'].write (cr, 1, hr_id, {'company_id': company_id,
                                                           'journal_id': journal_id[0]})
        return self.write(cr, uid, uid, {'company_id': company_id})
