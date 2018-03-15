# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import fields, models, api, tools
from odoo.tools.safe_eval import safe_eval as eval
from odoo.tools.translate import _

class ir_ui_menu(models.Model):
    _inherit = 'ir.ui.menu'

    @api.multi
    def _check_hidden_model(self, menus):
        hidden_menus = self.env['hidden.menu'].search([('menus', 'in', list(map(lambda x: x.id, menus))),
                                                       ('company_id', '=', self.env.user.company_id.id),
                                                       ('active', '=', True),'|',
                                                       ('users', 'child_of', self.env.user.id),
                                                       ('groups', 'in', list(map(lambda x: x.id, self.env.user.groups_id)))])
        res = []
        for m in map(lambda x: map(lambda y: y.id, x.menus), hidden_menus):
            for i in m:
                if i not in res:
                    res.append(i)
        return self.browse(res)
    
    @api.multi
    @api.returns('self')
    def _filter_visible_menus(self):
        res = super(ir_ui_menu,self)._filter_visible_menus()
        to_hidde = self._check_hidden_model(res)
        res = res - to_hidde
        return res