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
    'name' : 'SDatos Report Project',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Project',
    'sequence': 3,                
    'summary': 'Print work done in project',
    'description' : """
Report Project
==============

This module allows print work done or task in project (Contract). This module is not compatible with sd_print_project_work.
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['project',
                 'project_timesheet',
                 'project_task_materials',
                 'sd_digital_sign'],            
    'data': ['reports/sd_reports.xml',
             'reports/sd_project_report.xml',
             'views/sd_wizard_view.xml',
             'views/project_view.xml',
             'security/ir.model.access.csv'], 
    'images':['static/src/img/trabajo.png'], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}
