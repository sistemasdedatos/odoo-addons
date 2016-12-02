from openerp import api, models, fields
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task (models.Model):
    _inherit = 'project.task'
    
    html_description = fields.Html ("Description")