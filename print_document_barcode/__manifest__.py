# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Print Document barcode',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Print document name in barcode',
    'description' : """
Print document barcode
======================

This module allows you to configure which document name you like to print in barcode format, for easy searching.
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['report'],
    'data': ['security/ir.model.access.csv',
             'report/paper_format.xml',
             'report/document_barcode.xml',
             'views/view_name_barcode_config.xml',
             ],
    'installable': True,
    'auto_install': False,
    'application': False,
}