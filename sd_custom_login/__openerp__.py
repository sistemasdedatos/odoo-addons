# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2014 Sistemas de Datos (<http://www.sdatos.com>).
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
	# General Data
    'name' : 'Custom Login Page',
    'version' : '3.1',
    'author' : 'Sistemas de Datos',
	'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'description' : """
		This module cutomize the login page:
			- The logo and some css properties.
			- Hide the database management link.
			- Disable database management utilization.
    """,
    'website': 'http://www.sdatos.com',
	# End General Data
    'depends' : ['web'],
	'css': ['static/src/css/login.css'],
    'data' : ['static/src/xml/webclient_template.xml'],
    'installable': True,		
    'auto_install': True,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
