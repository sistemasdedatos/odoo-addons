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
    'name': 'SDatos Telegram Extension',
    'summary': 'Add commands to telegram module',
    'category': 'Telegram',
    'version': '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'description' : """
Telegram extension
==================
Module that add commands for telegram api
-----------------------------------------
Inherited module from Telegram module, developed by IT-Projects LLC
    """,
    'website': 'http://www.sdatos.com',
    'depends': ['telegram',
                'telegram_mail'],
    'data': ['data/commands.xml',],
    'installable': True,
    'auto_install': False,
}
