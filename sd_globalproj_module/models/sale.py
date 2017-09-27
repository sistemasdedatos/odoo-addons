from openerp import fields, models

class SaleOrder(models.Model):
    _inherit = 'sale.order'

    print_works = fields.Boolean(default = False)