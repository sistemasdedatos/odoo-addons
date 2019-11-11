

from odoo import fields, models, _


class company(models.Model):
    _inherit = 'res.company'

    last_distribution_years = fields.Integer(
        "Distribution Years", default=0, required=True,
        help=_("Years before to compute last distriburion price"))