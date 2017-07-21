from openerp import fields, models, api

class account_entries_report(models.Model):
    _inherit = "account.entries.report"
    
    product_default_code = fields.Char(related = 'product_id.default_code')