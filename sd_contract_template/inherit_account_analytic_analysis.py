from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class account_analytic_account(models.Model):
    _inherit = "account.analytic.account"
    
    contract_template_description = fields.Char ("Template description")
    contract_template = fields.Html ("Template")