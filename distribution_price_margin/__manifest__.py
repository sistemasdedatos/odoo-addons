# -*- coding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2016 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>)
#    Migrated v10 2018 Rodrigo Colombo Vlaeminch (http://sdatos.com)
#    Migrated v12 2019 Héctor J. Ravelo (http://sdatos.com)
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
##############################################################################

{
    'name': 'Distribution Price Margin',
    'version': '1.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Purchases',
    'summary': 'Introduce margins in cost distribution to set sale price',
    'description': """
    
Sale Price Margin in Cost Distribution
======================================

This module allows to introduce benefit margins in purchases cost distribution
------------------------------------------------------------------------------
You can choose between two methods to calculate sale price\n
1: Sale = Cost + (cost * %margin)\n
2: Sale = Cost / (1 - %margin)\n

Usage
-----
Only users with "Purchase Manager" permission can manage the new options this modules introduces.\n
To change the calculation method head to Orders section in Purchases/Settings/Settings menu.

Reference: https://manueldelgado.com/como-calcular-el-precio-de-venta-coste-margen/

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends': ['sale', 'purchase_landed_cost'],
    'data': ['views/res_config_view.xml',
             'views/purchase_cost_distribution_view.xml'],
    'images': [],
    'installable': True,
    'auto_install': False,
    'application': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
