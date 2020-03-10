#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2019 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>)
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#

{
    'name': 'Payment Order Mail',
    'version': '12.0.1.0.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': '',
    'summary': '',
    'description': """
    
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends': ['account_payment_order'],
    'data': ['data/mail_template_data.xml',
             'views/account_payment_order.xml',
             'views/bank_payment_line.xml'],
    'images': [],
    'installable': True,
    'auto_install': False,
    'application': False,
}
