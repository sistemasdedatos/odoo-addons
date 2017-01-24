from openerp.osv import osv, fields, expression
from openerp.tools.translate import _

class product_template(osv.osv):
    _inherit = "product.template"
    _columns = {
        'seller_code': fields.related('seller_ids','product_code', type='char', string='Code Supplier', readonly=True),
    }

class product_product(osv.osv):
    _inherit = "product.product"
    
    _columns = {
        'produt_seller_code': fields.related('product_tmpl_id', 'seller_code', type='char', string='Code Supplier', readonly=True),
    }

    def name_search(self, cr, uid, name='', args=None, operator='ilike', context=None, limit=100):
        ids = self.search (cr, uid, [('produt_seller_code', '=', name)], limit=None, context=None)
        if ids != []: 
            return self.name_get(cr, uid, ids, context)
        return super(product_product, self).name_search(cr, uid, name, args, operator, context, limit)
    