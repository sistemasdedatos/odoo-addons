# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from openerp import fields, models, api, tools
from openerp.tools.safe_eval import safe_eval as eval
from openerp.tools.translate import _

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
        with self._menu_cache_lock:
            res = super(ir_ui_menu,self)._filter_visible_menus()
            if (self.env.user.id != 1 or #No se aplica para el usuario administrador, caso contrario, error /usr/lib/python2.7/threading.py(212)release() - self._note("%s.release(): non-final release", self)
                self.env.ref('base.group_erp_manager').id in self.env.user.groups_id or #No se aplica para usuarios del portal
                self.env.ref('share.group_shared').id in self.env.user.groups_id): #No se aplica para grupos de comparticion
                to_hidde = self._check_hidden_model(res)
                res = res - to_hidde
            return res