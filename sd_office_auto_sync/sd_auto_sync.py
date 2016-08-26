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
    
    @api.multi
    def write (self, val):
        last_start = self.start
        last_stop = self.stop
        super (calendar_event, self).write (val)
        office_config = self.env['sd.office.config'].search ([('create_uid', '=', self._uid)])
        if len (office_config) > 0 and office_config.confirmed:
            start = last_start if last_start <= self.start else self.start
            stop = last_stop if last_stop >= self.stop else self.stop
            start = datetime.datetime.strptime (start, '%Y-%m-%d %H:%M:%S') - datetime.timedelta (days = 1)
            stop = datetime.datetime.strptime (stop, '%Y-%m-%d %H:%M:%S') + datetime.timedelta (days = 1)
            office_sync = self.env['sd.office.sync'].create ({'sd_office_config_id': office_config.id,
                                                              'date_init': start,
                                                              'date_end':  stop})
            office_sync.sync_events (context = {'DirSync': 'ToOffice'}, odoo_events = self)
        return True
    
    @api.multi
    def unlink (self):
        office_config = self.env['sd.office.config'].search ([('create_uid', '=', self._uid)])
        for i in self:
            if i.office_id and len (office_config) > 0 and office_config.confirmed:
                office_sync = self.env['sd.office.sync'].create ({'sd_office_config_id': office_config.id,
                                                                  'date_init': i.start,
                                                                  'date_end':  i.stop})
                office_sync.delete_office (i)
        return super (calendar_event, self).unlink ()
    
    @api.multi    
    def copy (self, default):
        default['office_id'] = False
        return super(calendar_event, self).copy (default)
    