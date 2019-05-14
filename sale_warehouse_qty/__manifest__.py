# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Sale Warehouse Quantity',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Sale',
    'summary': 'Available product quantity by warehouse y sale order line',
    'description' : """
Sale Warehouse Quantity
=======================
This module allow to set if we wont see product quantity by warehouse or by total in sale oreders.

""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['sale',
                 'sale_stock'],
    'data': ['security/sale_stock_security.xml',
             'views/sale_setting_config_views.xml'],
    'installable': False,
    'auto_install': False,
    'application': False,
}
