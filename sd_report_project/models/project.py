from openerp import api, models, fields
import time
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task (models.Model):
    _inherit = 'project.task'
        
    date_deadline = fields.Date (required = True, default = lambda *a: time.strftime ('%Y-%m-%d'))
        
#     @api.multi   
#     def copy_data(self, default = {}):
#         for this in self:
#             if not default.get('name'):
#                 default['name'] = _("%s (copy)") % this.name
#             if not default.get ('date_deadline'):
#                 default['date_deadline'] = time.strftime ('%Y-%m-%d')
#             
#             return super (task, this).copy_data (default)
    
    
                