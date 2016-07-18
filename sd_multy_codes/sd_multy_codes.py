from openerp.osv import osv, fields
from openerp import api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class sd_multy_codes(osv.Model):
    _name = 'sd.multy_codes'
   
    _columns = {
                'name': fields.char('Multicode', size=128),
                'product_tmpl_id':fields.many2one('product.template', 'Code that can be searched', ondelete='cascade', readonly=True),
                'type':fields.related('product_tmpl_id', 'type', type='one2many'),
    }
    
    _sql_constraints = [
                ('uniq_number', 'unique(name)', ""),
    ]

    def get_product_id (self, cr, user, name, args):
        pr_id = -1
        result = []
        try:
            aux = self.search(cr, user, [('name','=',name)], limit=None, context=None)
            for i in self.read(cr, user, aux, ['product_tmpl_id']):
                pr_id = i['product_tmpl_id'][0]
            if pr_id != -1:
                result = self.pool['product.product'].search(cr, user, [('product_tmpl_id','=',pr_id)]+ args, limit=None, context=None)
        except:
            raise Warning(_("ERROR\nOn sd_multy_codes module"))
        return result
    
    @api.one
    @api.constrains('name')
    def search_ean13 (self):        #no deja guardar si queremos poner un multicodigo que ya es un ean de algun producto
        cr = self._cr
        user = self._uid
        if (self.name):
           ean = self.pool.get('product.product').search(cr, user, [('ean13','=',self.name)], limit=None, context=None)
           if ean != []:
               raise Warning(_("The EAN code %s already exist\nPlease, enter a different code" % str(self.name)))
        
    @api.onchange('name')
    def cambio (self):
        cr = self._cr
        user = self._uid
        if (self.name):
            names = super(sd_multy_codes, self).search([('name','=',self.name)]).read(['name'])
            ean = self.pool.get('product.product').search(cr, user, [('ean13','=',self.name)], limit=None, context=None)
            if ean != []:
                raise Warning(_("The ean code %s already exist\nPlease, enter a different code" % str(self.name)))
            if names != []:
                raise Warning(_("The multicode %s already exist\nPlease, enter a different code" % str(self.name)))


sd_multy_codes()