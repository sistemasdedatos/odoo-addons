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
    'name' : 'SDatos APLI Label Since Distribution Cost',
    'version' : '1.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Purchases',
    'summary': 'Print product labels since distribution cost to APLI',
    'description' : """
APLI Labels Since Distribution Cost
===================================

This module allows print product labels since purchase distribution cost in APLI format
---------------------------------------------------------------------------------------
It is necessary have the APPLI program installed to interpret the result file

""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['product',
                 'purchase_landed_cost',
                 'custom_download_file'],
    'data': ['wizard/wizard_print_labels_view.xml'],
    'images':[],                
    'installable': True,
    'auto_install': False,        
    'application': False,
}