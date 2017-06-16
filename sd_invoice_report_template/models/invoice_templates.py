from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class sd_invoice_template (models.Model):
    _name = "sd.invoice.template"
    
    name = fields.Char ("Name", required = True)
    description = fields.Char ("Description")
    template = fields.Html ("Template")
    company_id = fields.Many2one ('res.company', string='Company', default = lambda self: self.env['res.company']._company_default_get('account.invoice'))
    
class account_invoice (models.Model):
    _inherit = "account.invoice"
    invoice_template_id = fields.Many2one ('sd.invoice.template', string = "Template", ondelete = "restrict", help = "Template to print invoice")