from openerp.osv import osv

class res_partner (osv.Model):
    _inherit = "res.partner"

    def name_search (self, cr, uid, name, args = None, operator = 'ilike', context = None, limit = 100):
        ids = self.search (cr, uid, [('ref', '=', name)] + args, limit = None, context = None)
        if ids != []: 
            return self.name_get (cr, uid, ids, context)
        return super (res_partner, self).name_search (cr, uid, name, args, operator=operator, context=context, limit=limit)
