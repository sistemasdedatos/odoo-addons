from openerp import fields, api, models
from openerp.exceptions import Warning 

class res_partner(models.Model):
    _inherit = 'res.partner'
    
    ref = fields.Char(company_dependent = True)
    company_id = fields.Many2one(default=False)
    nif_company_group = fields.Char('NIF Group Company', required = False)

    @api.multi    
    def write (self, vals):
        if vals.get('child_ids'):
            for i in vals['child_ids']:
                if i[2] and i[2].get('customer'):
                     i[2]['customer'] = False
                if i[2] and i[2].get('supplier'):
                     i[2]['supplier'] = False
        return super (res_partner, self).write (vals)

    @api.model
    def create(self, vals):
        if vals.get('child_ids'):
            for i in vals['child_ids']:
                if i[2] and i[2].get('customer'):
                     i[2]['customer'] = False
                if i[2] and i[2].get('supplier'):
                     i[2]['supplier'] = False
        return super (res_partner, self).create(vals)
