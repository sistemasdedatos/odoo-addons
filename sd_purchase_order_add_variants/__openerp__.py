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
    'name': 'Purchase Order Add Variants',
    'summary': 'Add variants from template into purchase order',
    'version': '0.1',
    'author': 'Sistemas de Datos',
    'category': 'Purchases',
    'maintainer': 'Sistemas de Datos',
    'license': 'AGPL-3',
    'description' : """
Purchase Order Add Variants
===========================

Add variants in purchase orders
----------------------------------------------------------------------------------------------
This module is a modification from module sale_order_add_variants developed by FactorLibre,Odoo Community Association (OCA)
This module adds a wizard to select a template product showing all of this variants and allowing to change each variant quantity. 
Adding this variants to sale order with the quantities selected
    """,
    'website': 'http://www.sdatos.com',
    'depends': [
        'purchase'
    ],
    'demo': [],
    'data': [
        'security/purchase_order_add_variants_security.xml',
        'wizard/purchase_add_variants_view.xml',
        'view/purchase_view.xml',
        'view/res_config_view.xml'
    ],
    'installable': True,
}
