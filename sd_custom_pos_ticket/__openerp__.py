{
    'name': 'SDatos Custom POS Ticket',
    'version': '0.1',
    'category': 'Point Of Sale',
    'sequence': 6,
    'summary': 'Custom pos ticket',
    'description': """
Custom pos ticket
=================


    """,
    'author': 'Sistemas de Datos S.L',
    'depends': ['report',
                'point_of_sale',
                'l10n_es_pos'],
    'data': ['inherit_pos.xml',
             'invoice_report.xml'],
    'installable': True,
    'application': False,
    'qweb': [],
    'website': 'https://www.odoo.com/page/point-of-sale',
    'auto_install': False,
}
