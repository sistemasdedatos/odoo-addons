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
    'name' : 'SDatos HERGORE',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
#     'sequence': 3,                
    'summary': 'Custom reports for clients',
    'description' : """
Hergore Module
==============

Module that modifies the program interface and the reports to Herrajes Hergore S.L.
-----------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['web',
                 'report',
                 'product',
                 'account',
                 'stock_account',
                 'product_price_history',
                 'purchase',
                 'stock_card'],           
    'data': ['inherit_res_partner.xml',
             'inherit_product_view.xml',
             'inherit_view_stock_card.xml',
             'report/inherit_footer.xml',
             'report/inherit_header.xml',
             'report/inherit_invoice.xml',
             'report/inherit_saleorder.xml',
             'report/invoice_summary.xml',
             'report/inherit_report_generalledger.xml',
             'report/inherit_purchasequotation.xml'],
    'images':['static/src/img/COPY.PNG'], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}