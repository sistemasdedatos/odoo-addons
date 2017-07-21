from openerp import models, fields, api, exceptions, _
 
class product_product(models.Model):
    _inherit = "product.product"
              
    default_code = fields.Char (company_dependent = True)
    
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
    
class product_template(models.Model):
    _inherit = "product.template"
    
    company_id = fields.Many2one (default = False)
    type = fields.Selection (default = 'service')