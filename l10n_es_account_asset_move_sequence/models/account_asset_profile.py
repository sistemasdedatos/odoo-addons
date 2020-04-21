# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import _, api, fields, models


class AccountAssetProfile(models.Model):
    _inherit = 'account.asset.profile'

    account_move_sequence = fields.Boolean("Use account move sequence", help="Set to true if you want to keep the corresponding journal entry sequence", default=lambda self: self._compute_account_move_sequence())

    def _compute_account_move_sequence(self):
        company = self.env['res.company']._company_default_get('account.asset')
        if company.country_id.code == 'ES':
            return True
        return False