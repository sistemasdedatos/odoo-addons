# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Biometric signature',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Biometric signature',
    'description' : """
Biometric signature
===================

Module to link Odoo with the biometric signature application developed by Sistemas de Datos.
For more information contact with Sistemas de Datos (http://www.sdatos.es).
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'web',
                 'document'],
    'data': ['security/ir.model.access.csv',
             'views/biometric_conf_view.xml',
             'views/biometric_signature_view.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}