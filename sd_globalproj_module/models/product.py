from openerp import models, fields, api, exceptions, _
 
class product_product(models.Model):
    _inherit = "product.product"
              
    default_code = fields.Char (company_dependent = True)
    count_account_move = fields.Integer (compute = 'count_moves', string = 'Count Move')
    count_account_move_lines = fields.Integer (compute = 'count_moves', string = 'Count Move Lines')
    
    @api.multi 
    def name_get(self): 
        result = []
        def _name_get(d):
            name = d.get('name','')
            code = self._context.get('display_default_code', True) and d.get('default_code',False) or False
            if code:
                name = '[%s] %s' % (code,name)
            return (d['id'], name)
        for i in super(product_product, self).name_get():
            my_dict = {
                          'id': i[0],
                          'name': i[1],
                          'default_code': self.browse([i[0]]).default_code,
                      }
            result.append(_name_get(my_dict))
        return result
    
    @api.multi
    def count_moves (self):
        try:
            for s in self:
                self.count_account_move = len(s.env['account.move'].search ([('line_id.product_id','=',s.id)]))
                self.count_account_move_lines = len(s.env['account.move.line'].search ([('product_id','=',s.id)]))
        except:
            pass
    
    @api.multi
    def action_view_account_move (self):
        result = False
        for s in self:
            result = s.env['ir.model.data'].xmlid_to_res_id ('account.action_move_journal_line', raise_if_not_found=True)
            result = s.env['ir.actions.act_window'].browse ([result]).read()[0]
            result['domain'] = "[('line_id.product_id','=',%d)]" % s.id 
            result['context'] = None
        return result
    
    @api.multi
    def action_view_account_move_line (self):
        result = False
        for s in self:
            result = s.env['ir.model.data'].xmlid_to_res_id ('account.action_account_moves_all_tree', raise_if_not_found=True)
            result = s.env['ir.actions.act_window'].browse ([result]).read()[0]
            result['context'] = None
            result['context'] = {'search_default_product_id': [s.id], 'default_product_id': s.id, 'group_by': ['partner_id','move_id']}
        return result
    
class product_template(models.Model):
    _inherit = "product.template"
    
    company_id = fields.Many2one (default = False)
    type = fields.Selection (default = 'service')