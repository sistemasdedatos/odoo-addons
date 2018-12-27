# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Product ADR Report',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Product',
    'summary': 'ADR (Dangerous Substances)',
    'description' : """
Adr report in picking
=====================
This module allow to set adr type in product to print a report in stock picking

""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['product',
                 'stock'],
    'data': ['security/adr_security.xml',
             'security/ir.model.access.csv',
             'views/adr_view.xml',
             'views/product_template_view.xml',
             'views/stock_picking_views.xml',
             'report/report_picking_adr.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}