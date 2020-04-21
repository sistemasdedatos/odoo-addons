# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import api, fields, models, _
import odoo.addons.decimal_precision as dp
from odoo.exceptions import UserError


class AccountAssetLine(models.Model):
    _inherit = 'account.asset.line'

    def _setup_move_data(self, depreciation_date):
        res = super(AccountAssetLine, self)._setup_move_data(depreciation_date)
        if self.asset_id.profile_id.account_move_sequence and res.get('name', False):
            res.pop('name')
        return res