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
    'name' : 'SDatos Download Backup',
    'version' : '2.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Easy download backups for clients',
    'description' : """
Download backup
===============
""",
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : [],
    'data': ['security/sd_backup_data.xml',
             'views/sd_download_config.xml',
             'views/sd_download_view.xml',
             'data/ir_cron.xml',
             'security/ir.model.access.csv'],
    'installable': True,
    'auto_install': False,
    'application': False,
}