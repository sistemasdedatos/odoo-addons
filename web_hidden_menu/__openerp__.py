# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Web Hidden Menu',
    'version' : '1.3',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Web',
    'summary': 'Hidden menus',
    'description' : """
Hidden menu
===========

This module allow hide menus to all users or groups, or to a specific user or group, without change the access rules.
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ["base"],
    'data': ['views/hidden_menu_view.xml',
             'security/ir.model.access.csv'],
    'installable': True,
    'auto_install': False,
    'application': False,
}
