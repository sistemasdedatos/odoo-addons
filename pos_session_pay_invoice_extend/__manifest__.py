# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'POS Pay invoice extend',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Point Of Sale',
    'summary': 'Pay and receive POS session invoices from each invoice',
    'license': 'AGPL-3',
    'description' : """
POS Pay invoice extend
======================

This module extends the payment and collection of invoices in pos session, now we can pay the invoice from the invoice form itself.

This module depends on https://github.com/OCA/pos/tree/10.0/pos_session_pay_invoice
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['account',
                 'point_of_sale',
                 'pos_session_pay_invoice',
                 'account_cash_invoice'],
    'data': ['wizard/cash_invoice_in.xml',
             'wizard/cash_invoice_out.xml',
             'views/account_invoice_view.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}