#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0


from odoo import models, fields, api


class hidden_menu(models.Model):
    _name = 'hidden.menu'
    _description = 'Hidden menu'
    
    def _default_company(self):
        return self.env['res.company']._company_default_get('hidden.template')

    name = fields.Char(string='Description', required=True)
    menus = fields.Many2many(
        comodel_name='ir.ui.menu', string='Menus', relation='hidden_menu_menu',
        column1='hidden_menu', column2='menu', required=True)
    users = fields.Many2many(
        comodel_name='res.users', string='Users', relation='hidden_menu_user',
        column1='hidden_menu', column2='hidden_user')
    groups = fields.Many2many(
        comodel_name='res.groups', string='Groups',
        relation='hidden_menu_group', column1='hidden_menu',
        column2='hidden_group')
    active = fields.Boolean(string="Active", default=True)
    company_id = fields.Many2one(
        comodel_name='res.company', string='Company', index=True,
        required=True, default=_default_company)
    
    @api.model
    def create(self, vals):
        self.env['res.users'].has_group.clear_cache(self.env['res.users'])
        return super(hidden_menu, self).create(vals)
    
    @api.multi
    def write (self, vals):
        self.env['res.users'].has_group.clear_cache(self.env['res.users'])
        return super(hidden_menu, self).write(vals)
