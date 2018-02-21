# -*- encoding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2004-2014 Arturo Esparragón Goncalves (http://sdatos.com). All Rights Reserved
#    
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see http://www.gnu.org/licenses/.
#
##############################################################################

{
    'name' : 'Sistemas de Datos IGIC Module',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Localisation/Account Charts',
    'sequence': 3,
    'description' : """
SD IGIC MODULE
==============

Add the accounts and taxes for the Canary Legislation of IGIC.

Instalation:

* Install the l10n_es.
* Install this module.

    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['l10n_es'],            
    'data': ['data/account_account_common_igic.xml',
             'data/taxes_common_igic.xml'],   
             #'data/tax_codes_common_igic.xml',             
    'installable': False,        
    'auto_install': False,        
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
