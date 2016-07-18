# -*- encoding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2016 Rodrigo Colombo Vlaeminch (http://sdatos.com). All Rights Reserved
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
    'name' : 'Sistemas de Datos mod340 Module',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Localisation/Account Charts',
    'sequence': 3,
    'description' : """
SD mod340 MODULE
================
* Modification the module l10n_es_aeat_mod340 to able to account for import
* Modificacion del modulo l10n_es_aeat_mod340 para poder contabilizar las impotaciones

    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['l10n_es_aeat_mod340',
                 'sd_l10n_es_igic'],
    'data': ['data/tax_codes_common_igic.xml'],                
    'installable': True,        
    'auto_install': False,        
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: