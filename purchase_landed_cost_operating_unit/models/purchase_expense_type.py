# License AGPL-3 - See http://www.gnu.org/licenses/agpl-3

from odoo import fields, models


class PurchaseExpenseType(models.Model):
    _inherit = "purchase.expense.type"

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        default=lambda self: self.env['res.users'].operating_unit_default_get(
                                            self._uid),
                                        domain="[('user_ids', '=', uid)]")