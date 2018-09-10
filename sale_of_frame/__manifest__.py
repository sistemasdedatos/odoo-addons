# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Sale of frame',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Sale',
    'summary': 'Sale of frame',
    'description' : """
Sale of frame
=============
Management for sale of frames
.
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['product',
                 'sale',
                 'stock',
                 'product_dimension_and_edge'],
    'data': ['security/sale_frame_security.xml',
             'security/ir.model.access.csv',
             'views/product_view.xml',
             'views/sale_frame_view.xml',
             'views/sale_order_view.xml',
             'wizard/add_order_wizard_view.xml',
             'data/ir_sequence_data.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}