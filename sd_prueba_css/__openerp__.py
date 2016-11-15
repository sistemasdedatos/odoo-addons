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
    'name' : 'SDatos PRUEBA',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Interface',
#     'sequence': 3,                
    'summary': 'Prueba para sobrescribir css',
    'description' : """
PRUEBA   
======

Prueba de sobrescribir el css para que no imprima el chat en los formularios ni los filtros en la vista tree
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['web'],           
    'data': ['sd_template_css.xml'],
    'images':[], 
    'installable': True,        
    'auto_install': False,        
    'application': False,
}