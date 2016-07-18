import datetime
from lxml import etree
import math
import pytz
import urlparse

import openerp
from openerp import tools, api
from openerp.osv import osv, fields
from openerp.osv.expression import get_unaccent_wrapper
from openerp.tools.translate import _
# from openerp.exceptions import Warning 

class res_partner(osv.Model):
    _inherit = "res.partner"

    def name_search(self, cr, uid, name, args=None, operator='ilike', context=None, limit=100):
        ids = self.search (cr, uid, [('ref', '=', name)]+args, limit=None, context=None)
        if ids != []: 
            return self.name_get(cr, uid, ids, context)
        return super(res_partner,self).name_search(cr, uid, name, args, operator=operator, context=context, limit=limit)
