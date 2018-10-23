from openerp import models, fields, exceptions, api, _
import openerp.addons.decimal_precision as dp


class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"

    def get_pricelist(self):
        print "jojo"
        return True