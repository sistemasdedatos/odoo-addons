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
    'name' : 'Sistemas de Datos FacturaE IGIC Module',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Localisation/Account Charts',
    'sequence': 3,
    'description' : """
SD FACTURAE IGIC MODULE
=======================

Add the taxes for the Canary Legislation of IGIC for FactureE module.

    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['l10n_es_facturae'],            
    'data': ['report/report_facturae.xml'],                
    'installable': True,        
    'auto_install': False,        
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: