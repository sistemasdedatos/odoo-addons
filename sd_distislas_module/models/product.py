from openerp.osv import osv, fields

class product_template(osv.osv):
    _inherit = "product.template"
    _defaults = {'list_price': 0}
      
class product_product(osv.osv):
    _inherit = "product.product"
    _defaults = {'lst_price': 0}
    
class product_attribute_value(osv.osv):
    _inherit = "product.attribute.value"
    _order = 'attribute_id'