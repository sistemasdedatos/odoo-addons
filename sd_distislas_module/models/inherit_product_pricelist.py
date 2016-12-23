from openerp.osv import osv
from openerp.addons.product.report.product_pricelist import product_pricelist

class product_pricelist_inherit (product_pricelist):
    def _get_categories(self, products, form):
        cat_ids=[]
        res=[]
        self.pricelist = form['price_list']
        self._set_quantity(form)
        pro_ids=[]
        for product in products:
            pro_ids.append(product.id)
            if product.categ_id.id not in cat_ids:
                cat_ids.append(product.categ_id.id)

        cats = self.pool.get('product.category').name_get(self.cr, self.uid, cat_ids, context=self.localcontext)
        if not cats:
            return res
        for cat in cats:
            product_ids=self.pool.get('product.product').search(self.cr, self.uid, [('id', 'in', pro_ids), ('categ_id', '=', cat[0])], context=self.localcontext)
            products = []
            for product in self.pool.get('product.product').read(self.cr, self.uid, product_ids, ['name', 'code', 'attribute_value_ids'], context=self.localcontext):
                attr = ''
                for a in self.pool.get('product.attribute.value').browse (self.cr, self.uid, product['attribute_value_ids']):
                    attr += a.attribute_id.name + ': ' + a.name + ', '
                val = {
                     'id':product['id'],
                     'name':product['name'],
                     'code':product['code'],
                     'attribute': attr
                }
                i = 1
                for qty in self.quantity:
                    if qty == 0:
                        val['qty'+str(i)] = 0.0
                    else:
                        val['qty'+str(i)]=self._get_price(self.pricelist, product['id'], qty)
                    i += 1
                products.append(val)
            res.append({'name':cat[1],'products': products})
        return res
    
class report_product_pricelist (osv.AbstractModel):
    _name = 'report.product.report_pricelist'
    _inherit = 'report.abstract_report'
    _template = 'product.report_pricelist'
    _wrapped_report_class = product_pricelist_inherit