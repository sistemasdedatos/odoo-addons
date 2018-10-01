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
    'name' : 'POS Cash Count',
    'version' : '1.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Custom Cash count in point of sale',
    'description' : """
POS Cash Count
==============

Modulo para realizar el arqueo de caja
--------------------------------------

* Se filtra por fecha desde - hasta, terminal y por usuario.

    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['point_of_sale',
                 'l10n_es_pos'],
    'data': ['views/cash_count_view.xml',
             'report/cash_count_report.xml',
             'report/pos_session_report.xml'],
    'installable': True,
    'auto_install': False,        
    'application': False,
}