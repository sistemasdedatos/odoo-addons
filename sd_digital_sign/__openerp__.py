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
    "name" : "SDatos Digital Signature",
    "version" : "1.0",
    "author" : "Sistemas de datos S.L.",
    "category": '',
    'complexity': "easy",
    'depends': ['hr_timesheet', 'web', 'project'],
    "description": """
SDatos Digital Signature
========================

This module provides the functionality to store digital signature image for a record.
    """,
    'data': [
        'views/sd_digital_sign_view.xml',
        'views/sign_view.xml'
    ],
    'website': 'http://www.sdatos.com',
    'qweb': ['static/src/xml/digital_sign.xml'],
    'installable': False,
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
