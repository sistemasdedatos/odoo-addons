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
from openerp.exceptions import Warning
from openerp.tools.translate import _

class crm_helpdesk (models.Model):
    _inherit = 'crm.helpdesk'
    
    _mail_post_access = 'read'
    _track = {
        'user_id': {
            'sd_helpdesk.mt_helpdesk_assigned': lambda self, cr, uid, obj, ctx=None: obj.user_id and obj.user_id.id,
        },
        'state': {
            'sd_helpdesk.mt_helpdesk_done': lambda self, cr, uid, obj, ctx=None: obj.state == '3done',
            'sd_helpdesk.mt_helpdesk_state': lambda self, cr, uid, obj, ctx=None: obj.state not in ['0draft', '3done'],
        }    
    }
    state = fields.Selection([('0draft', 'New'),
                              ('1open', 'In Progress'),
                              ('2pending', 'Pending'),
                              ('3done', 'Closed'),
                              ('4cancel', 'Cancelled')])
    user_id = fields.Many2one (track_visibility = 'onchange')
    priority = fields.Selection (default = "0")
    color = fields.Integer ('Color Index', default = 0)
    res_description = fields.Text ('Resolution')
    
    _defaults = {'state': lambda *a: '0draft',}
    
    def write(self, cr, uid, ids, values, context=None):
        """ Override to add case management: open/close dates """
        if values.get('state'):
            if values.get('state') in ['0draft', '1open'] and not values.get('date_open'):
                values['date_open'] = fields.datetime.now()
            elif values.get('state') == '3done' and not values.get('date_closed'):
                values['date_closed'] = fields.datetime.now()
        return super(crm_helpdesk, self).write(cr, uid, ids, values, context=context)
    
    @api.cr_uid_ids_context
    def message_post(self, cr, uid, thread_id, body='', subject=None, type='notification', subtype=None, parent_id=False, attachments=None, context=None, content_subtype='html', **kwargs):
        if subtype != None:
            if subtype == 'sd_helpdesk.mt_helpdesk_assigned':
                datas = self.pool.get('crm.helpdesk').read (cr, uid, thread_id, ['partner_id', 'name', 'user_id', 'priority', 'description', 'res_description'])
                body = "<span>" + self.pool.get('res.users').read (cr, uid, uid, ['name'])['name'] + " le ha asignado un Helpdesk</span>"
                if datas['partner_id']:
                     body += "<div> &nbsp; &nbsp; &bull; <b>Cliente</b>: " + datas['partner_id'][1] + "</div>"
                body += "<div> &nbsp; &nbsp; &bull; <b>Tecnico asignado</b>: " + datas['user_id'][1] + "</div>"
                body += "<div> &nbsp; &nbsp; &bull; <b>Prioridad</b>: " + datas['priority'] + "</div>"
                if datas['description']:
                    body += "<div> &nbsp; &nbsp; &bull; <b>Notas</b>: " + datas['description'] + "</div>"
            elif subtype == 'sd_helpdesk.mt_helpdesk_done' and self.pool.get('crm.helpdesk').read (cr, uid, thread_id, ['res_description'])['res_description']:
                body += "<div> &nbsp; &nbsp; &bull; <b>Resolucion</b>: " + self.pool.get('crm.helpdesk').read (cr, uid, thread_id, ['res_description'])['res_description'] + "</div>"
            if context is None:
                context = {}
            return super(crm_helpdesk, self).message_post(cr, uid, thread_id, body=body, subject=subject, type=type, subtype=subtype, parent_id=parent_id, attachments=attachments, context=context, content_subtype=content_subtype, **kwargs)
        return False