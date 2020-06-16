# License AGPL-3 - See http://www.gnu.org/licenses/agpl-3rating U


from odoo import _, api, fields, models


class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        default=lambda self: self.env['res.users'].operating_unit_default_get(self._uid),
                                        domain="[('user_ids', '=', uid)]")


class PurchaseCostDistributionLine(models.Model):
    _inherit = "purchase.cost.distribution.line"

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        default=lambda self: self.env['res.users'].operating_unit_default_get(
                                            self._uid),
                                        domain="[('user_ids', '=', uid)]")


class PurchaseCostDistributionLineExpense(models.Model):
    _inherit = "purchase.cost.distribution.line.expense"

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        default=lambda self: self.env['res.users'].operating_unit_default_get(
                                            self._uid),
                                        domain="[('user_ids', '=', uid)]")


class PurchaseCostDistributionExpense(models.Model):
    _inherit = "purchase.cost.distribution.expense"

    operating_unit_id = fields.Many2one('operating.unit', 'Operating Unit',
                                        default=lambda self: self.env['res.users'].operating_unit_default_get(
                                            self._uid),
                                        domain="[('user_ids', '=', uid)]")