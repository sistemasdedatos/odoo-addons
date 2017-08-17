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
    'name' : 'SDatos Ferreteria Deogracias',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'summary': 'Custom reports for clients',
    'description' : """
Ferreteria Deogracias Module
============================

Module that modifies the program interface and the reports to Ferreteria Deogracias
-----------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['account',
                 'sale',
                 'point_of_sale'],
    'data': ['views/res_partner.xml',
             'reports/header_report.xml',
             'reports/footer_report.xml',
             'reports/saleorder_report.xml',
             'reports/invoice_report.xml'],
    'qweb': ['static/src/xml/pos.xml'],
    'installable': True,
    'auto_install': False,        
    'application': False,
}