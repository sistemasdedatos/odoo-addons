from openerp import api
from openerp import tools, SUPERUSER_ID
from openerp.osv import fields, osv


class calendar_event(osv.Model):
    _inherit = 'calendar.event'
    
    _columns = {
            'company': fields.selection([('G21 CONSULTING', 'G21 CONSULTING'), ('ACAPYME', 'ACAPYME'), ('ATACAYTE', 'ATACAYTE'), ('GENERACION 21', 'GENERACION 21')], required = True),
                    }
    
    _defaults = {
                'company': 'G21 CONSULTING'
                }