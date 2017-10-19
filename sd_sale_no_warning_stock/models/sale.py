# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2017 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
from openerp import SUPERUSER_ID
from openerp import models, api

class sale_order_line (models.Model):
    _inherit = 'sale.order.line'
    
    @api.multi
    def product_id_change_with_wh (self, pricelist, product, qty = 0,
                                   uom = False, qty_uos = 0, uos = False, 
                                   name = '', partner_id = False, lang = False, 
                                   update_tax = True, date_order = False, 
                                   packaging = False, fiscal_position = False, 
                                   flag = False, warehouse_id = False):
        res = super(sale_order_line, self).product_id_change_with_wh (pricelist, product, qty, uom, qty_uos, uos, name, partner_id, lang, 
                                                                   update_tax, date_order, packaging, fiscal_position, flag, warehouse_id)
        if 'warning' in res.keys():
            res.pop('warning')  
        return res