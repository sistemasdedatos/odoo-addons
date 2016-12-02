# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
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
    tasks = registry['project.task']
    modules = registry['ir.module.module']
    if modules.search (cr, SUPERUSER_ID, [('name', '=', 'sale_service'), ('state', '=', 'installed')]):
        tasks_ids = tasks.search (cr, SUPERUSER_ID, [('sale_line_id', '!=', False)])
        for task in tasks.browse (cr, SUPERUSER_ID, tasks_ids):
            tasks.write (cr, SUPERUSER_ID, task.id, {'sale_order_id': task.sale_line_id.order_id.id})
