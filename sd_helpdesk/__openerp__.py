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
    'name' : 'SDatos Helpdesk',
    'version' : '1.3',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Customer Relationship Management',
#     'sequence': 3,                
    'summary': 'Helpdesk extension',
    'description' : """
Helpdesk Extension
==================

This module is an extension of crm_helpdesk. With this module you can see the tickets in kanban view, to send mail automaticaly to user assigned and to do search in many2one fields automaticaly filtered by customer.

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends':['crm_helpdesk'],            
    'data':['data/mail_message_subtype.xml',
            'views/sd_helpdesk_view.xml'],
    'installable': True,        
    'auto_install': False,        
    'application': False,
}
