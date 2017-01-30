from openerp.osv import osv, fields

class res_partner(osv.Model):
    _inherit = "res.partner"
    
    def name_search (self, cr, uid, name, args = None, operator = 'ilike', context = None, limit = 100):
        res = super (res_partner, self).name_search (cr, uid, name, args, operator = operator, context = context, limit = limit)
        ids = self.search (cr, uid, [('comercial', 'ilike', name)] + args, limit = None, context = None)
        if ids != []: 
            for i in self.name_get (cr, uid, ids, context):
                if i in res:
                    break
                res.append (i)
        return res
    