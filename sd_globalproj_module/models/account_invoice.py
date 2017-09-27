from openerp import fields, models

class AccountInvoice(models.Model):
    _inherit = 'account.invoice'

    print_works = fields.Boolean(default=False)