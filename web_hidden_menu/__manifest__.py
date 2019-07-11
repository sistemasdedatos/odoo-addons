#i#############################################################################
#
#   Sistemas de datos, Open Source Management Solutions (<http://sdatos.com>)
#   Copyright (C) 2018 - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#   Migrated V12 2019 Sistemas de Datos - Héctor J. Ravelo <hravelo@sdatos.es>
#   License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
###############################################################################

{
    'name': 'Web Hidden Menu',
    'version': '12.0.1.0.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Web',
    'summary': 'Module to hide menus',
    'description': """
        Hidden menu

        This module allows hiding menus to all users or groups, or to a specific user or group, without changing the access rules.
        """,
    'website': 'http://www.sdatos.com',

    # End General Data
    'depends': ["base"],
    'data': ['views/hidden_menu_view.xml',
             'security/ir.model.access.csv'],
    'installable': True,
    'auto_install': False,
    'application': False,
}
