# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import fields, models, api, exceptions, _
from odoo.http import request

class ResUsers(models.Model):
    _inherit = 'res.users'
    
    context_session_timeout = fields.Integer(string = 'Session Timeout', default=0, help="Inactivity time in seconds to expire session")
    context_session_alert_time = fields.Integer(string = 'Alert for Timeout', default=0, help="Time in seconds before timeout to show the expire message (max 15s before)")
    context_not_in_edition = fields.Boolean(string = 'Not end in edition', default=False, 
                                            help="Set on true if the session don't expire in edition mode, "
                                                 "in the other case if you are editing it will be save "
                                                 "(if it is possible) and after it will be close")
       
    @api.model
    def create(self, vals):
        res = super(ResUsers, self).create(vals)
        min_context_session_timeout = 30
        min_context_session_alert_time = res.context_session_timeout - 30
        if res.context_session_timeout < min_context_session_timeout and res.context_session_timeout != 0:
            raise exceptions.ValidationError(_("The minumum value must be 30 or 0 if the timeout don't afect to this user"))
        if res.context_session_alert_time < min_context_session_alert_time:
            raise exceptions.ValidationError(_("The minmum value must be %d if you set %d as session_timeout value" % (min_context_session_alert_time, res.context_session_timeout)))
        return res
     
    @api.multi
    def write(self, vals):
        res = super(ResUsers, self).write(vals)
        min_context_session_timeout = 30
        min_context_session_alert_time = self.context_session_timeout - 15
        if self.context_session_timeout < min_context_session_timeout and self.context_session_timeout != 0:
            raise exceptions.ValidationError(_("The minumum value must be 30 or 0 if the timeout don't afect to this user"))
        if self.context_session_alert_time < min_context_session_alert_time:
            raise exceptions.ValidationError(_("The minmum value must be %d if you set %d as session_timeout value" % (min_context_session_alert_time, self.context_session_timeout)))
        return res
