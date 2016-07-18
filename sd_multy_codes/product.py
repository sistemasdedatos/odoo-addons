from openerp.osv import fields, osv, expression
from openerp import api
from openerp.exceptions import Warning
from openerp.tools.translate import _

class product_template(osv.Model):
    _name = 'product.template'
    _inherit = 'product.template'
    
    _columns = {
                'multicode':fields.one2many('sd.multy_codes', 'product_tmpl_id', type='one2many', string="Multicode", store=True, help="Article Number used for product identification."),
                }

product_template()


class product_product(osv.Model):
    _name = 'product.product'
    _inherit = 'product.product'
    
    
    _sql_constraints = [            #no deja guardar dos ean iguales
                ('uniq_number', 'unique(ean13)', ""),
    ]

#     def name_search(self, cr, user, name='', args=None, operator='ilike', context=None, limit=100):
#         result = super(product_product, self).name_search(cr, user, name, args, operator, context, limit)
#         if result == []:
#             ids = self.pool['sd.multy_codes'].get_product_id (cr, user, name, args)
#             result = self.name_get(cr, user, ids, context=context)
#         return result

    def name_search(self, cr, user, name='', args=None, operator='ilike', context=None, limit=100):
        ids = self.pool['sd.multy_codes'].get_product_id (cr, user, name, args)
        if ids != []:
            return self.name_get(cr, user, ids, context=context)
        return super(product_product, self).name_search(cr, user, name, args, operator, context, limit)
        
    @api.one
    @api.constrains('ean13')
    def search_ean13 (self):            #no deja guardar si queremos poner un ean que ya es un multicodigo de algun producto
        cr = self._cr
        user = self._uid
        if (self.ean13):
           ean = self.pool.get('sd.multy_codes').search(cr, user, [('name','=',self.ean13)], limit=None, context=None)
           if ean != []:
               raise Warning(_("The EAN code %s already exist\nPlease, enter a different code" % str(self.ean13)))
    
product_product()