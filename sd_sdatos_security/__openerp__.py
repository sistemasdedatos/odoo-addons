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
    'name' : 'SDatos Sistemas de Datos Security',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Security',
#     'sequence': 3,                
    'summary': 'Sdatos security',
    'description' : """
Sdatos Securiry Module 
======================

This module add security restriction to Sistemas de Datos SL Users
------------------------------------------------------------------
* Development restricts
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['project',
                 'base',
                 'web',
                 'sd_digital_sign',
                 'sd_print_project_work',
                 'sd_employee_report',
                 'sd_sdatos_module'],            
    'data': ['sd_groups.xml',
             'security/ir.model.access.csv',
             'views/inherit_task.xml'],
#              'security/ir.model.access.csv'],
    'images':[], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}