#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2019 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>)
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#

{
    'name': 'Account Move Chatter',
    'version': '12.0.1.0.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Invoicing Management',
    'summary': 'Chatter on account move form view',
    'description': """
    
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends': ['mail',
                'account'],
    'data': ['views/account_move_view.xml'],
    'images': [],
    'installable': True,
    'auto_install': False,
    'application': False,
}
