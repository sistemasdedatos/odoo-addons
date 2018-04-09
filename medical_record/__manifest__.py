# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    'name' : 'Medical record',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Medical record',
    'description' : """
Medical Record
==============

This module adds a model to store medical data for the partner or patient.
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'mail',
                 'report'],
    'data': ['security/medical_security.xml',
             'security/ir.model.access.csv',
             'views/medical_record_view.xml',
             'views/res_partner_view.xml',
             'report/report_partner_medical_record.xml',
             'report/report_medical_record.xml'],
    'installable': True,
    'auto_install': False,
    'application': False,
}