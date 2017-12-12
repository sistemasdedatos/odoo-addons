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
    'name' : 'SDatos Distribuciones Islas',
    'version' : '0.6.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'summary': 'Custom reports for clients',
    'description' : """
Distribuciones Islas 2016 S.L. Module
=====================================

Module that modifies the program interface and the reports to Distribuciones Islas SL
-------------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['account',
                 'sale',
                 'product',
                 'purchase_landed_cost',
                 'product_variants_types',
                 'voucher_print',
                 'sale_commission',
                 'sd_ean13_generator',
                 'sd_user_warehouse',
                 'sd_distribution_price_margin',
                 'sd_invoice_pricelist_rule',
                 'sd_cost_repercution_purchase',
                 'sale_order_add_variants',
                 'purchase_pricelist_rules',
                 'sd_purchase_order_add_variants'],
    'data': ['reports/footer_report.xml',
             'reports/header_report.xml',
             'reports/invoice_report.xml',
             'reports/saleorder_report.xml',
             'reports/product_report.xml',
             'reports/report_pricelist.xml',
             'reports/voucher_report.xml',
             'views/inherit_product_view.xml',
             'views/inherit_purchase_add_variants_view.xml',
             'views/search_res_partner.xml',
             'views/inherit_commission_invoice_view.xml',
             'views/res_partner_inherit.xml'],
    'images':[],                
    'installable': True,
    'auto_install': False,        
    'application': False,
}