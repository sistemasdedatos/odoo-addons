from openerp.osv import osv, fields
from openerp import api

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
    
    @api.multi    
    def write (self, vals):
        if vals.get('child_ids'):
            for i in vals['child_ids']:
                if i[2] and i[2].get('customer'):
                     i[2]['customer'] = False
                if i[2] and i[2].get('supplier'):
                     i[2]['supplier'] = False
        return super (res_partner, self).write (vals)

    @api.model
    def create(self, vals):
        if vals.get('child_ids'):
            for i in vals['child_ids']:
                if i[2] and i[2].get('customer'):
                     i[2]['customer'] = False
                if i[2] and i[2].get('supplier'):
                     i[2]['supplier'] = False
        return super (res_partner, self).create(vals)