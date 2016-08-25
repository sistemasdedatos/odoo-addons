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
    'name' : 'SDatos Office Sincronize',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Sincronize Office calendar',
    'description' : """
Office Sincronize
=================

Module that sync Office 365 calendar with Odoo calendar
-------------------------------------------------------

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['base',
                 'mail',
                 'calendar'],
    'external_dependencies': {'python': ['O365','html2text']},
    'data': ['security/ir.model.access.csv',
             'views/sd_config_view.xml',
             'views/sd_sync_view.xml',
             'sd_office_data.xml'],
    'installable': True,
    'auto_install': False,        
    'application': False,
}