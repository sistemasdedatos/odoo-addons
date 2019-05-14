# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Pos loyalty extend',
    'version' : '1.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Point of Sale',
    'summary': 'Pos loyalty extend',
    'license': 'AGPL-3',
    'description' : """
Pos loyalty extend
==================

This module is an extension of the pos_loyalty module available in OCA/pos. You can add expiration date to the points and add several extra steps
TODO: allow many programs for each customer
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ["point_of_sale",
                 "pos_loyalty"],
    'data': ['security/ir.model.access.csv',
             'views/templates.xml',
             'views/loyalty_point_view.xml',
             'views/loyalty_program_view.xml',
             'views/partner_view.xml'],
    'installable': False,
    'auto_install': False,
    'application': False,
}
