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
import models
from openerp import SUPERUSER_ID
 
def load_sale_order (cr, registry):  
    sale_order_line = registry['sale.order.line']
    lines_ids = sale_order_line.search (cr, SUPERUSER_ID, [(1, '=', 1)])
    for line in sale_order_line.browse (cr, SUPERUSER_ID, lines_ids):
        line.with_context (carga_inicial = True).write ({'html_name': line.name})
