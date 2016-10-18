from openerp import models, fields, exceptions, api, _
import openerp.addons.decimal_precision as dp


class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"
    
    cost_lines = fields.One2many(readonly=True, states={'draft': [('readonly', False)]})
    benefit_margin = fields.Float (string = 'Margin %', readonly=True,
                                   states = {'draft': [('readonly', False)], 'calculated': [('readonly', False)]}, default = -1)
    
    @api.multi
    def action_calculate(self):
        super (PurchaseCostDistribution, self).action_calculate ()
        for distribution in self:
            for line in distribution.cost_lines:
                if distribution.benefit_margin == -1:
                    return True
                if line.benefit_margin == -1:
                    line.benefit_margin = distribution.benefit_margin
                if line.benefit_margin >= 0:
                    line.benefit_price = line.standard_price_new + (line.standard_price_new * (line.benefit_margin / 100))
        return True
    
    @api.one
    def action_done(self):
        for line in self.cost_lines:
            line.product_id.lst_price = line.benefit_price
        super (PurchaseCostDistribution, self).action_done ()
    
class PurchaseCostDistributionLine(models.Model):
    _inherit = "purchase.cost.distribution.line"
    
    state = fields.Selection (readonly = True, related = "distribution.state")
    benefit_margin = fields.Float (string = 'Margin %', readonly = False, default = -1)
    benefit_price = fields.Float (string = 'Sale Price', readonly = True)