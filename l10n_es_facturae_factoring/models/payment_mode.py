# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl.html).

from odoo import models, fields, api


class AccountPaymentMode(models.Model):
    _inherit = "account.payment.mode"

    is_endorser = fields.Boolean("Endorser", default=False)

    @api.onchange('is_endorser')
    def endroser_onchange(self):
        if self.endroser_onchange:
            self.bank_account_link = 'fixed'
            self.show_bank_account_from_journal = True

    @api.multi
    def write(self, vals):
        if vals.get('is_endorser', False):
            if not vals.get('bank_account_link', False) == 'fixed':
                vals['bank_account_link'] = 'fixed'
            if not vals.get('show_bank_account_from_journal', False):
                vals['show_bank_account_from_journal'] = True
        return super(AccountPaymentMode, self).write(vals)

    @api.model
    def create(self, vals):
        if vals.get('is_endorser', False):
            if not vals.get('bank_account_link', False) == 'fixed':
                vals['bank_account_link'] = 'fixed'
            if not vals.get('show_bank_account_from_journal', False):
                vals['show_bank_account_from_journal'] = True
        return super(AccountPaymentMode, self).create(vals)