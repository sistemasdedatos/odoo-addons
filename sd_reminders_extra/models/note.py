# -*- encoding: utf-8 -*-
#    Copyright 2016 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from openerp import models, fields, api
import datetime


class note_note(models.Model):
    _name = 'note.note'
    _inherit = ['note.note', 'reminder']
    _reminder_date_field = 'date_reminder'
    _reminder_description_field = 'name'
    
    reminder_alarm_ids = fields.Many2many (string='Reminders')
    date_reminder = fields.Datetime ("Reminder Date")

    @api.model
    def _create_reminder_event(self):
        event = super(note_note, self)._create_reminder_event()
        event.write({'class': 'private'})
        return event
