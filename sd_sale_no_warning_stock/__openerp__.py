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
{
    'name' : 'SDatos Sale No Warning Stock',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Sales',
    'summary': 'No sale warning stock',
    'description' : """
Sale No Warning Stock
=====================

Module that modifies the product workflow when you do a sale order
------------------------------------------------------------------
The message "Stock not available" is ignored. This module is temporal, the correct method is establish the product as "consumible"

    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['sale',
                 'stock',
                 'sale_stock'],
    'data': [],
    'qweb': [],
    'installable': True,
    'auto_install': False,        
    'application': False,
}