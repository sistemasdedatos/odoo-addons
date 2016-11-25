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
    'name' : 'SDatos Pricelist Rules - Invoice extension',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'summary': 'Custom reports for clients',
    'description' : """
Pricelist Rules - Invoice extension
===================================
Copy from sale_pricelist_rule
This module allows to apply *product_pricelist_rules* extended features to
account invoice lines and gets the best pricelist rule automatically.


    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ["product",
                 "account",
                 "sale",
                 "purchase",
                 "purchase_discount",
                 "product_pricelist_rules",
                 "sale_pricelist_rules",
                 "purchase_pricelist_rules"],
    'data': ['views/inherit_account_invoice_view.xml',
             'reports/inherit_invoice.xml',
             'reports/inherit_saleorder.xml',
             'reports/inherit_purchaseorder.xml'],
    'images':[],                
    'installable': True,
    'auto_install': False,        
    'application': False,
}