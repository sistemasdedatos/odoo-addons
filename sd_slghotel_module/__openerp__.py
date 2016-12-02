# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2015 Sistemas de Datos (<http://www.sdatos.com>).
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
    'name' : 'SDatos SELIMGRAHOTEL',
    'version' : '0.3',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'sequence': 3,                
    'summary': 'Module to modify interface to Selimgrahotel SL',
    'description' : """
SELIMGRAHOTEL MODULE
====================

Module that modifies the program interface and the reports to Selimgrahotel SL
------------------------------------------------------------------------------
* EDIT Invoice tree view
* EDIT Report task (part work)
* EDIT Task form view
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['report',
                 'account',
                 'sale',
                 'stock',
                 'account_analytic_analysis',
                 'l10n_es_partner',
                 'project',
                 'sd_print_project_work',
                 'project_task_materials',
                 'sd_contract_template'],            
    'data': ['views/inherit_account_view.xml',
             'views/inherit_task_view.xml',
             'reports/inherit_header.xml',
             'reports/inherit_invoice.xml',
             'reports/inherit_saleorder.xml',
             'reports/inherit_footer.xml',
             'reports/inherit_stock_picking.xml',
             'reports/inherit_print_contract.xml',
             'reports/inherit_task_report.xml'], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}