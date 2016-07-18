from openerp import api, models
from openerp.osv import fields, osv
import time
from numpy import integer
from numpy.ma.core import ids
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task(osv.osv):
    _name = 'project.task'
    _inherit = 'project.task'
    
    def _get_group (self, cr, uid, ids, name, arg, context=None):
        groups = []
        res = {}
        cr.execute ('SELECT gid ' \
                    'FROM res_groups_users_rel ' \
                    'WHERE uid = %s', (uid,))

        for i in cr.fetchall():
            groups.append(self.pool.get ('res.groups').browse(cr, uid, [i[0]], context)[0].name)
        
        if 'Development Manager' in groups:
            res[ids[0]] = 'Development Manager'
        elif 'Development' in groups:
            res[ids[0]] = 'Development'
        
        return res
    
    _columns = {
                'signature_client': fields.char('Signature client', select=True, copy=False, required=False),
                'groups': fields.function (_get_group, type = 'char'),
                }    
    
    @api.multi
    def action_task_sent(self):
        """ Open a window to compose an email, with the edi invoice template
            message loaded by default
        """
        assert len(self) == 1, 'This option should only be used for a single id at a time.'
        template = self.env.ref('sd_sdatos_module.email_template_edi_sd_task', False)
        compose_form = self.env.ref('mail.email_compose_message_wizard_form', False)
        ctx = dict(
            default_model='project.task',
            default_res_id=self.id,
            default_use_template=bool(template),
            default_template_id=template.id,
            default_composition_mode='comment',
        )
        return {
            'name': _('Compose Email'),
            'type': 'ir.actions.act_window',
            'view_type': 'form',
            'view_mode': 'form',
            'res_model': 'mail.compose.message',
            'views': [(compose_form.id, 'form')],
            'view_id': compose_form.id,
            'target': 'new',
            'context': ctx,
        }