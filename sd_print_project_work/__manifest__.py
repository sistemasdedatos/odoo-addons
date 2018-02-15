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
    'name' : 'SDatos Print Project Work',
    'version' : '2.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Project',
    'sequence': 3,                
    'summary': 'Print work done in project',
    'description' : """
Print Project Work
==================

This module allows print work done or task in project (Contract).
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['project',
                 'project_timesheet',
                 'project_task_materials',
                 'sd_digital_sign'],            
    'data': ['views/sd_project_report.xml',
             'views/sd_print.xml',     
             'views/sd_project_view.xml',
            'security/sd_print_project_work_security.xml',
            'security/ir.model.access.csv'], 
    'images':['static/src/img/trabajo.png'], 
    'installable': False,        
    'auto_install': False,        
    'application': False,
}