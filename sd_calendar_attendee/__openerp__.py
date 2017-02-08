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
    'name' : 'SDatos Calendar Attendee',
    'version' : '0.2',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Hidden/Dependency',
#     'sequence': 3,                
    'summary': 'Calendar attendee custom for emails',
    'description' : """
Calendar Attendee
=================

Module that allows to decide if to send mail to the guests of the meetings. 
It also adds the meeting account in parent companies if we have met with one of their contacts.

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends':['base',
               'calendar'],            
    'data':['views/inherit_res_partner.xml',
            'views/inherit_calendar.xml'],
    'installable': True,        
    'auto_install': False,        
    'application': False,
}
