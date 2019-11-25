#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2019 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>)
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#

{
    'name': 'Landed Cost Report',
    'version': '12.0.1.0.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Purchase Management',
    'summary': 'Print report in purchase landed cost',
    'description': """
    
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends': ['purchase_landed_cost'],
    'data': ['data/report_paperformat_data.xml',
             'reports/landed_cost_report.xml'],
    'images': [],
    'installable': True,
    'auto_install': False,
    'application': False,
}
