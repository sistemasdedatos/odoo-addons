# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from openerp import models, fields, api
from datetime import datetime
from openerp.tools.translate import _
import openerp.addons.decimal_precision as dp
from openerp.osv import osv

class mrp_repair (models.Model):
    _inherit = 'mrp.repair'
    
    invoice_method = fields.Selection (default = "after_repair")
     
class mrp_repair_line (osv.osv):
    _inherit = 'mrp.repair.line'
    
    def onchange_operation_type(self, cr, uid, ids, type, guarantee_limit, company_id=False, context=None):
        res = super (mrp_repair_line, self).onchange_operation_type(cr, uid, ids, type, guarantee_limit, company_id=False, context=None)
        if type == 'add' and 'to_invoice' in res['value'] and not res['value']['to_invoice'] and not guarantee_limit:
           res['value']['to_invoice'] = True
        return res
    