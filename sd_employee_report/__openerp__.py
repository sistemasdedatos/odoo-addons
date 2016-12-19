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
    'name' : 'SDatos Print Employee spending',
    'version' : '1.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Project',
    'sequence': 3,                
    'summary': 'Print employee spending in task',
    'description' : """
Print Project Work
==================

This module allows print employee spending in tasks with a period.
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'project',
                 'project_timesheet',
                 'project_task_materials'],            
    'data': ['reports/sd_report_print.xml',
             'reports/sd_report.xml',
             'views/sd_wizard_view.xml',
             'views/inherit_project_view.xml'],
#              'security/sd_employee_report_security.xml',
#              'security/ir.model.access.csv'], 
    'images':[], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}