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

from openerp import fields, models, api
from openerp.osv import fields as old_fields

class crm_helpdesk (models.Model):
    _inherit = 'crm.helpdesk'
    
    _mail_post_access = 'read'
    _track = {
        'user_id': {
            'sd_helpdesk.mt_helpdesk_assigned': lambda self, cr, uid, obj, ctx=None: obj.user_id and obj.user_id.id,
        }
    }
    user_id = fields.Many2one (track_visibility = 'onchange')
    priority = fields.Selection (default = "0")
    color = fields.Integer('Color Index', default = 0)

    @api.multi
    def message_get_subscription_data (self):
        print self
        return super(crm_helpdesk, self).message_get_subscription_data ()
        