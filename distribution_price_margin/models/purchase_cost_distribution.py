from odoo import models, fields, exceptions, api, _
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta

class PurchaseCostDistribution(models.Model):
    _name = "purchase.cost.distribution"
    _inherit = ["purchase.cost.distribution", "mail.thread"]

    state = fields.Selection(track_visibility='onchange')
    cost_lines = fields.One2many(readonly=True, states={'draft': [('readonly', False)], 'calculated': [('readonly', False)]})
    benefit_margin = fields.Float(string='Margin %', readonly=True, states={'draft': [('readonly', False)], 'calculated': [('readonly', False)]}, default=-1, help="If the margin is less than 0, it won't be applied")
    expense_percent = fields.Float(string='Expenses %', compute = '_compute_expenses_percent')

    @api.multi
    @api.depends('amount_total', 'total_expense')
    def _compute_expenses_percent(self):
        for record in self:
            try:
                record.expense_percent = record.total_expense * 100 / record.total_purchase
            except:
                record.expense_percent = 0

    @api.multi
    def action_calculate(self):
        super(PurchaseCostDistribution, self).action_calculate()
        for distribution in self:
            for line in distribution.cost_lines:
                line.compute_last_cost()
                if line.benefit_margin >= 0:
                    if self.env.ref('distribution_price_margin.group_margin_calculation_type') in self.env['res.users'].browse([self._uid]).groups_id:
                        line.benefit_price = line.standard_price_new / (1 - (line.benefit_margin / 100))
                    else:
                        line.benefit_price = line.standard_price_new + (line.standard_price_new * (line.benefit_margin / 100))
                else:
                    line.benefit_price = 0
        return True
    
    @api.multi
    def set_margin(self):
        for distribution in self:
            for line in distribution.cost_lines:
                line.benefit_margin = distribution.benefit_margin
    
    @api.one
    def action_done(self):
        for line in self.cost_lines:
            if line.benefit_price > 0:
                line.product_id.lst_price = line.benefit_price
        super(PurchaseCostDistribution, self).action_done()

    
class PurchaseCostDistributionLine(models.Model):
    _inherit = "purchase.cost.distribution.line"
    
    state = fields.Selection(readonly=True, related="distribution.state")
    benefit_margin = fields.Float(string='Margin %', readonly=False, default=-1)
    benefit_price = fields.Float(string='Sale Price', help=("If the value is 0 or negative, the sale price won't be changed"))
    old_sale_price = fields.Float(related="product_id.lst_price", readonly=True)
    last_cost_distribution = fields.Float(string="Last Cost", readonly=True, help=_("Cost price of the last product entry"))

    def compute_last_cost(self):
        years_before = self.company_id.last_distribution_years
        date_to_find = datetime(2000, 1, 1, 0, 0).date() if years_before <= 0 else (datetime.today() + relativedelta(years=-(years_before))).date()
        for record in self:
            last_id = record.search([('id','!=',record.id),                           #Line is not the same
                                     ('distribution','!=',record.distribution.id),    #Distribution is not the same
                                     ('distribution.state','=','done'),               #Distribution is done
                                     ('product_id','=',record.product_id.id),         #Product is the same
                                     ('distribution.date','>=',date_to_find)], #Search in two years ago
                                    limit=1, order="id desc")                         #Order by id desc (last id)
            if last_id:
                record.last_cost_distribution = last_id.standard_price_new

    @api.model
    def create(self, vals):
        res = super(PurchaseCostDistributionLine, self).create(vals)
        res.compute_last_cost()
        return res

    @api.onchange('benefit_price')
    def onchange_benefit_price(self):
        if self.benefit_price >= 0:
            try:
                if self.env.ref('distribution_price_margin.group_margin_calculation_type') in self.env['res.users'].browse([self._uid]).groups_id:
                    self.benefit_margin = (1 - (self.standard_price_new / self.benefit_price)) * 100
                else:
                    self.benefit_margin = ((self.benefit_price - self.standard_price_new) / self.standard_price_new) * 100
            except:
                self.benefit_margin = -1
        else:
            self.benefit_margin = -1
    
    @api.onchange('benefit_margin')
    def onchange_benefit_margin(self):
        if self.benefit_margin >= 0:
            try:
                if self.env.ref('distribution_price_margin.group_margin_calculation_type') in self.env['res.users'].browse([self._uid]).groups_id:
                    self.benefit_price = self.standard_price_new / (1 - (self.benefit_margin / 100))
                else:
                    self.benefit_price = self.standard_price_new + (self.standard_price_new * (self.benefit_margin / 100))
            except:
                self.benefit_price = 0
        else:
            self.benefit_price = 0

