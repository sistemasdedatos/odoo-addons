# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'GDPR Terms',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Base',
    'summary': 'GDPR Terms in footer',
    'description' : """
GDPR Terms
==========

Edit external footer view to show the gdpr terms, this terms should be written in res_company form.
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'report'],
    'data': ['views/res_view.xml',
             'report/layout_templates.xml'],
    'installable': False,
    'auto_install': False,
    'application': False,
}
