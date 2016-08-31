from openerp import models, fields, api
import datetime

class note_note(models.Model):
    _name = 'note.note'
    _inherit = ['note.note', 'reminder']
    _reminder_date_field = 'date_reminder'
    _reminder_description_field = 'name'
    
    reminder_alarm_ids = fields.Many2many (string='Reminders')
    date_reminder = fields.Datetime ("Reminder Date")

