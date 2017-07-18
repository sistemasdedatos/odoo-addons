# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2017 Sistemas de Datos (<http://www.sdatos.com>).
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
    'name' : 'SDatos CRM Lead Sale Link',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Others',
    'summary': 'Inherit CRM Lead Sale Link',
    'description' : """
SDatos CRM Lead Sale Link
=========================

This module fix functionality from parent module, now we can see the real SO from each leads using origin field as filter.
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['crm_lead_sale_link'],
    'data': [],
    'installable': True,
    'auto_install': False,        
    'application': False,
}