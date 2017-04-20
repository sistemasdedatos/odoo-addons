# -*- coding: utf-8 -*-
from openerp import api, models, fields
import time
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task (models.Model):
    _inherit = 'project.task'
    
    signature_client = fields.Char ('Signature client', select = True, copy = False, required = False)
    phisical_part = fields.Char ('Phisical part', copy = False)
    office = fields.Text ('Office', copy = False)
    material_factured = fields.Boolean ('Piezas facturadas')
                
    @api.multi
    def action_task_sent (self):
        """ Open a window to compose an email, with the edi invoice template
            message loaded by default
        """
        assert len(self) == 1, 'This option should only be used for a single id at a time.'
        template = self.env.ref ('sd_sdatos_module.email_template_edi_sd_task', False)
        compose_form = self.env.ref ('mail.email_compose_message_wizard_form', False)
        ctx = dict(
            default_model = 'project.task',
            default_res_id = self.id,
            default_use_template = bool (template),
            default_template_id = template.id,
            default_composition_mode = 'comment',
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
        
    @api.cr_uid_ids_context
    def message_post(self, cr, uid, thread_id, body='', subject=None, type='notification', subtype=None, parent_id=False, attachments=None, context=None, content_subtype='html', **kwargs):
        if subtype != None:
            if subtype == 'project.mt_task_assigned':
                datas = self.pool.get('project.task').read (cr, uid, thread_id, ['description', 'internal_description'])
                if datas['description']:
                    body += "<div> &nbsp; &nbsp; &bull; <b>Descripcion</b>: " + datas['description'] + "</div>"
                if datas['internal_description']:
                    body += "<div> &nbsp; &nbsp; &bull; <b>Notas internas</b>: " + datas['internal_description'] + "</div>"
            if context is None:
                context = {}
            return super(task, self).message_post(cr, uid, thread_id, body=body, subject=subject, type=type, subtype=subtype, parent_id=parent_id, attachments=attachments, context=context, content_subtype=content_subtype, **kwargs)
        return False
