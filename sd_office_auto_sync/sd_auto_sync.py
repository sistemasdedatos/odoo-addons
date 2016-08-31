from O365 import *
from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import html2text
from matplotlib.cbook import Null
import datetime
import time


class calendar_event(models.Model):
    _inherit = "calendar.event"
    
    last_start = fields.Datetime('Last start', default = datetime.datetime.now (), readonly = True)
    last_stop = fields.Datetime('Last stop', default = datetime.datetime.now (), readonly = True)
    
    @api.multi
    def write (self, val):
        if 'start_datetime' in val.keys ():
            self.last_start = self.start
        if 'stop_datetime' in val.keys ():
            self.last_stop = self.stop
        start = self.last_start if self.last_start <= self.start else self.start
        stop = self.last_stop if self.last_stop >= self.stop else self.stop
        start = datetime.datetime.strptime (start, '%Y-%m-%d %H:%M:%S') - datetime.timedelta (days = 1)
        stop = datetime.datetime.strptime (stop, '%Y-%m-%d %H:%M:%S') + datetime.timedelta (days = 1)
        office_sync = self.env['sd.office.sync'].create ({'sd_office_config_id': False,
                                                          'date_init': start,
                                                          'date_end':  stop})
         
        office_sync.sync_events (context = {'DirSync': 'ToOffice'}, odoo_events = self )
        return super (calendar_event, self).write (val)
     
    @api.multi
    def unlink (self):
        for i in self:
            office_sync = self.env['sd.office.sync'].create ({'sd_office_config_id': False,
                                                              'date_init': i.start,
                                                              'date_end':  i.stop})
            delete_office = office_sync.delete_office (i, self.attendee_ids)
        return super (calendar_event, self).unlink ()
    
class calendar_attendee(models.Model):
    
    _inherit = 'calendar.attendee'
    
    @api.multi
    def do_accept(self):
        start = datetime.datetime.strptime (self.event_id.start, '%Y-%m-%d %H:%M:%S') - datetime.timedelta (days = 1)
        stop = datetime.datetime.strptime (self.event_id.stop, '%Y-%m-%d %H:%M:%S') + datetime.timedelta (days = 1)
        office_sync = self.env['sd.office.sync'].create ({'sd_office_config_id': False,
                                                          'date_init': start,
                                                          'date_end':  stop})
        office_sync.sync_events (context = {'DirSync': 'ToOffice'}, odoo_events = self.event_id)
        return super (calendar_attendee, self).do_accept ()
