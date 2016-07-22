from O365 import *
from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class sd_office_config (models.Model):
    _name = 'sd.office.config'
    
    name = fields.Char (string = 'Account', required = True)
    passwd = fields.Char (string = "Password", password = True, required = True)
    res_user_id = fields.Many2one ('res.user', string = 'User', default = self._uid, required = True)
    confirmed = fields.Boolean (string = "Confirmed", default = False, readonly = True)
    
    @api.multi
    def test_confirm (self):
        schedule = Schedule ((self.name, self.passwd))
        try:
            result = schedule.getCalendars ()
            print 'Fetched calendars for', self.name, 'was successful:', result
            self.confirmed = True
        except:
            raise Warning (_('Login failed for %s' % self.name))
    
    @api.onchange('name','passwd')
    def user_pass_edit (self):
        self.confirmed = False
    