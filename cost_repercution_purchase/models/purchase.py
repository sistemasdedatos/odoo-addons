# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, exceptions


class PurchaseOrderLine(models.Model):
    _inherit = "purchase.order.line"
    
    @api.model
    def _get_stock_move_price_unit (self):
        repercute_tax = self.env.ref ('cost_repercution_purchase.group_repercute_tax') in self.env['res.users'].browse ([self._uid]).groups_id
        repercute_discount = self.env.ref ('cost_repercution_purchase.group_repercute_discount') in self.env['res.users'].browse ([self._uid]).groups_id
        
        res = super(PurchaseOrderLine, self)._get_stock_move_price_unit()
        if not repercute_discount and self.discount:
            def _get_discounted_price_unit():
                return self.price_unit
            res = _get_discounted_price_unit()
        if repercute_tax and self.taxes_id:
            res = res + self.price_tax
        return res
