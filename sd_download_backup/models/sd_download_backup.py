# -*- coding: utf-8 -*-
from openerp import models, fields, api
from openerp.tools.translate import _
from openerp.exceptions import Warning
import ftplib
from subprocess import check_output
from datetime import datetime

class sd_config_dwn_backup (models.Model):    
    _name = 'sd.config_dwn_backup'
    
    user = fields.Char (string = 'User', required = True)
    passwd = fields.Char (string = 'Password', required = True)
    name = fields.Char (string = 'Server', required = True)
    local_dir = fields.Char (string = "Dir backup", required = True)
    state = fields.Selection (string = "State", selection = [('0', 'Draft'),
                                                             ('1', 'Configured')], default='0', readonly = True, copy=False)
    download_ids = fields.One2many ('sd.download_backup', 'config_id', string = 'Downloads per day', readonly = True)
        
    @api.multi
    def check_back_dir (self):
        try:
            for i in self.download_ids:
                i.unlink ()
        except:
            raise Warning (_("ERROR\nUnlink download lines"))        
        try:
            res = []
            ls = check_output (["ls", "-hgG", "--time-style=+%d/%m/%Y %H:%M:%S", "%s%s" % (self.local_dir, self.user)]).splitlines (True)
            ls.pop(0)
            for i in ls:
                tmp = i.split ()
                sz = check_output (["du", "-bsh", "%s%s/%s" % (self.local_dir, self.user, tmp[5].decode ('utf-8'))]).split ()[0]
                res.append ({'date': tmp[3]+' '+tmp[4],
                             'sz': sz,
                             'day': tmp[5]})
            return res
        except:
            raise Warning (_("ERROR\nRead backup files"))
    
    @api.multi
    def initialize_action (self):
        try:
            ftp = ftplib.FTP (self.name, self.user, self.passwd)
            ftp.quit ()        
        except:
            raise Warning (_("ERROR\nConnection FTP failed, Server not correct configured"))
        try:
            for i in self.check_back_dir ():
                self.download_ids.create ({'url': "ftp://%s:%s@%s/%s/%s_%s.zip" % (self.user, self.passwd, self.name, i['day'].decode ('utf-8'), self.user,i['day'].decode ('utf-8')),
                                           'date': datetime.strptime (i['date'], '%d/%m/%Y %H:%M:%S'),
                                           'day': i['day'].decode ('utf-8'),
                                           'size': i['sz'],
                                           'config_id': self.id})
            self.state = '1'
        except:
            raise Warning (_("ERROR\nNo create ftp lines"))
    
    @api.model
    def action_scheduler (self):
        """Run all scheduled backups."""
        if self.state == 'Configured':
            return self.search([]).initialize_action()
        else:
            return False
    
    @api.multi
    def write (self, vals):
        if self._context and 'state' not in vals.keys():
            self.state = '0'
        return super (sd_config_dwn_backup, self).write (vals)
          

class sd_download_backup (models.Model):
    _name = 'sd.download_backup'
    _order='date desc'
    
    url = fields.Char (string = 'FTP URL', readonly = True)
    date = fields.Datetime (string = 'Date', readonly = True)
    day = fields.Char (string = 'Day', readonly = True)
    size = fields.Char (string = 'Size', readonly = True)
    config_id = fields.Many2one ('sd.config_dwn_backup', string = 'Configuration', ondelete = 'cascade', readonly = True)
    
    @api.multi
    def down_back (self):
        return {'name': 'Down backup',
                'res_model': 'ir.actions.act_url',
                'type': 'ir.actions.act_url',
                'target': 'new',
                'url': self.url}
    