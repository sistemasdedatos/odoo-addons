from openerp.osv import fields, osv, expression

class account_move(osv.osv):
    _name = 'account.move'
    _inherit = 'account.move'
    #def _get_fac_number(self, cr, uid, ids, name, args, context, where =''):
        #if not ids: return {}
        #cr.execute( 'SELECT move_id, number '\
                    #'FROM account_invoice '\
                    #'WHERE move_id IN %s ', (tuple(ids),))
        #result = dict(cr.fetchall())
        #for id in ids:
            #result.setdefault(id, "")
        #return result
        
    _columns = {
        #'Invoice': fields.function(_get_fac_number, string='Invoice', type='text', store=True),
        'Relation': fields.one2many('account.invoice', 'move_id', 'Invoice'),
        'Invoice': fields.related('Relation', 'number', type='char', string='Invoice'),
    }

account_move()