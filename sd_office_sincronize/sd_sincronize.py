from O365 import *
from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class sd_office_config (models.Model):
    _name = 'sd.office.config'
    
    name = fields.Char (string = 'Account', required = True)
    passwd = fields.Char (string = "Password", required = True)
    confirmed = fields.Boolean (string = "Confirmed", compute = 'set_confirmed', store = True)
    same_user = fields.Boolean (compute = 'uid_like_createuid')
    
    @api.depends ('name','passwd')
    def set_confirmed (self):
        self.confirmed = False
             
    @api.multi
    def test_confirm (self):
        schedule = Schedule ((self.name, self.passwd))
        try:
            result = schedule.getCalendars ()
            self.confirmed = True
        except:
            raise Warning (_('Login failed for %s' % self.name))
    
    @api.multi
    @api.depends('create_uid')
    def uid_like_createuid (self):
        if self._uid == self.create_uid.id or len (self.create_uid) == 0:
            self.same_user = True
            return
        self.same_user = False
        
sd_office_config ()