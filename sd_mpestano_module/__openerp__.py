# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
{
    'name' : 'SDatos Maximopestano',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'summary': 'Custom reports for clients',
    'description' : """
Maximo Pestano Module
=====================

Module that modifies the program interface and the reports to Maximo Pestano Sanidad Ambiental
----------------------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
* EDIT Report print contract
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'report',
                 'sale',
                 'project',
                 'sale_installment_contract',
                 'service_desk',
                 'account_analytic_analysis',
                 'project_task_materials_stock',
                 'sd_sale_report_template',
                 'sd_contract_template',
                 'sd_print_project_work'],
    'data': ['reports/inherit_header.xml',
             'reports/inherit_footer.xml',
             'reports/saleorder_report.xml',
             'reports/inherit_invoice_report.xml',
             'reports/inherit_print_contract.xml',
             'reports/inherit_task_report.xml',
             'reports/contract_for_employee_report.xml',
             'views/inherit_sale_view.xml',
             'views/inherit_res_partner.xml',
             'views/inherit_project_view.xml',
             'views/inherit_analytic_contract.xml',
             'static/src/xml/insert_style.xml',
             'wizard/work_for_employee_view.xml',
             'wizard/work_for_employee_report.xml'],
    'images':['static/src/img/ISO_14001_ICDQ.jpg',
              'static/src/img/ISO_9001_ICDQ.jpg',
              'static/src/img/portada.png'],                
    'installable': True,
    'auto_install': False,        
    'application': False,
}