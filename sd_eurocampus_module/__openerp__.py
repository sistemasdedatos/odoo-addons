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

{
    'name' : 'SDatos Eurocampus',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'sequence': 10,                
    'summary': 'Custom reports for clients',
    'description' : """
Eurocampus Module
=================

Module that modifies the program interface and the reports to Eurocampus
------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['web',
                 'report',
                 'account'],
    'data': ['reports/inherit_header.xml',
             'reports/inherit_footer.xml',
             'reports/inherit_saleorder.xml',
             'reports/inherit_invoice.xml',
             'views/inherit_menu_items.xml'],
    'images':[], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}