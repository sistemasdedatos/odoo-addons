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
    'name' : 'SDatos Alan Canarias',
    'version' : '3.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'summary': 'Custom reports for clients',
    'description' : """
Alan Canarias 2010 SL Module
============================

Module that modifies the program interface and the reports to Alan Canarias 2010 SL
-----------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['account',
                 'sale',
                 'purchase_landed_cost',
                 'account_invoice_supplierinfo_update',
                 'stock',
                 'sd_sale_margin',
                 'sd_user_warehouse'],
    'data': ['security/security.xml',
             'views/account_invoice_view.xml',
             'views/product_view.xml',
             'views/sale_order_view.xml',
             'views/purchase_view.xml',
             'reports/header_report.xml',
             'reports/footer_report.xml',
             'reports/invoice_report.xml',
             'reports/saleorder_report.xml',
             'reports/voucher_report.xml',
             'reports/invoice_summary.xml',
             'reports/picking_report_with_pvp.xml'],
    'qweb': [],
    'installable': True,
    'auto_install': False,        
    'application': False,
}