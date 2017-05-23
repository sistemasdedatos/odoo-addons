from openerp import models, fields, api
from openerp.exceptions import AccessError
from openerp.tools.translate import _
from openerp import SUPERUSER_ID

class ir_attachment(models.Model):
    _inherit = 'ir.attachment'
    
    @api.multi
    def write (self, vals):
        if (self.parent_id == self.env.ref('sd_download_backup.dir_week_backup')) and self._uid != SUPERUSER_ID:
            raise AccessError(_('Only administrators can execute this action.'))
        return super(ir_attachment, self).write(vals)
    
    @api.multi
    def unlink (self):
        res = False
        for i in self:
            if (i.parent_id == i.env.ref('sd_download_backup.dir_week_backup')) and self._uid != SUPERUSER_ID:
                raise AccessError(_('Only administrators can execute this action.'))
            res = super(ir_attachment, i).unlink()
        return res