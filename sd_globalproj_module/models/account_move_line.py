from openerp import models, fields, api

class account_move_line(models.Model):
    _inherit = "account.move.line"
    
    product_default_code = fields.Char(compute = 'set_default_code', readonly = True, string = 'Sub Account')
    
    def set_default_code(self):
        for i in self:
            if i.account_id.type in ['receivable','payable']:
                i.product_default_code = i.partner_id.ref
            else:
                i.product_default_code = i.product_id.default_code
    