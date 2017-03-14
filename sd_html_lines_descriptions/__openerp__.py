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
    'name' : 'SDatos HTML Descriptions',
    'version' : '1.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
#     'sequence': 3,                
    'summary': 'Line Descriptions Extension',
    'description' : """
Line Descriptions Extension
===========================

This module adds rich text to invoice and budget lines. This way you can send more personalized documents.
Convenient to install with web_ckeditor4 module. It can find in https://github.com/OCA/web/tree/8.0/web_ckeditor4.

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends':['web',
               'sale'],
    'data':['static/src/xml/assets.xml',
            'views/sale_view.xml',
            'report/saleorder_report.xml'],
    "price": 150.00,
    "currency": "EUR",
    "post_init_hook": "load_sale_order",
    'installable': True,        
    'auto_install': False,        
    'application': False,
}
