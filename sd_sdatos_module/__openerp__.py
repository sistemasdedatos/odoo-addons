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
    'name' : 'SDatos Sistemas de Datos',
    'version' : '3.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
    'sequence': 30,                
    'summary': 'Custom reports for clients',
    'description' : """
Sdatos Module
=============

Module that modifies the program interface and the reports to Sistemas de Datos SL
----------------------------------------------------------------------------------
* EDIT Header
* EDIT Footer
* EDIT Report invoice 
* EDIT Repor sale order
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends':['base',
		       'web',
		       'edi',
               'report',
               'sale',
               'portal_sale',
               'calendar',
		       'sd_digital_sign',
		       'sd_report_project',
 		       'sd_employee_report',
		       'crm'],            
    'data':['views/search_res_partner.xml',
            'views/sd_digital_sign_inherit.xml',
            'views/inherit_project_view.xml',
            'views/inherit_crm_view.xml',
            'views/saleorder_view.xml',
	        'report/header_report.xml',
            'report/footer_report.xml',
            'report/invoice_report.xml',
            'report/saleorder_report.xml',
	        'report/inherit_task.xml',
            'report/inherit_employee_report.xml',
	        'edi/sd_template_email_task.xml',],
    'images':['static/src/img/IBM.png',
              'static/src/img/iso_9001.png'], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}
