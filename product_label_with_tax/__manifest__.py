# -*- encoding: utf-8 -*-
#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Product label with tax',
    'version' : '1.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Label with tax',
    'description' : """
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['account',
                 'product'],
    'data': ['views/product_view.xml',
             'report/product_product_template.xml'
             ],
    'installable': False,
    'auto_install': False,
    'application': False,
}
