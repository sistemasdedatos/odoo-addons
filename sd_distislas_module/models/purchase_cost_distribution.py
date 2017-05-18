from openerp import models, fields, exceptions, api, _
import openerp.addons.decimal_precision as dp

class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"
    
    @api.one
    def action_done(self):
        super (PurchaseCostDistribution, self).action_done ()
        for line in self.cost_lines:
            if line.benefit_margin >= 0:
                line.product_id.generate_ean13 ()
