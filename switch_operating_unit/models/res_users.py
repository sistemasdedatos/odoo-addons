# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html).
from odoo import api, fields, models


class ResUsers(models.Model):

    _inherit = 'res.users'

    def __init__(self, pool, cr):
        init_res = super(ResUsers, self).__init__(pool, cr)
        type(self).SELF_WRITEABLE_FIELDS = list(
            set(
                self.SELF_WRITEABLE_FIELDS +
                ['default_operating_unit_id','operating_unit_ids']))
        return init_res

    @api.multi
    def operating_unit_default_domain(self):
        user_id = self.browse(self._uid)
        return [('id', 'in', user_id.operating_unit_swith_ids.ids)]

    default_operating_unit_id = fields.Many2one(domain=lambda self: self.operating_unit_default_domain())
    operating_unit_swith_ids = fields.Many2many(
        'operating.unit', 'operating_unit_switch_users_rel', 'user_id', 'poid',
        'Operating Units Allowed', default=lambda self: self._default_operating_units()
    )
    operating_unit_ids = fields.Many2many(string='Operating Units Running')

    @api.multi
    def write(self, values):
        groups = self.groups_id.ids
        if 'default_operating_unit_id' in values and \
                values.get('default_operating_unit_id', False) and \
                self.env.ref('operating_unit.group_multi_operating_unit').id not in groups:  # No se aplica para usuarios que ven varias unidades a la vez
            values['operating_unit_ids'] = [(5,0),(4, values['default_operating_unit_id'])]
        if 'operating_unit_ids' in values:
            self.env['ir.rule'].clear_cache()
        res = super(ResUsers, self).write(values)
        return res
