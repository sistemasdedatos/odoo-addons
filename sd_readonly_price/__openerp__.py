# -*- encoding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2004-2014 Rodrigo Colombo Vlaeminch (http://sdatos.com). All Rights Reserved
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
    'name' : 'No modify price',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Restrict',
    'sequence': 50,
    'description' : """
SD READONLY PRICE
=================
* Add group: No modify price
* Modify view: price read only in order_line
    """,
    'website': 'http://www.sdatos.com',
    'depends' : ['account',
                 'sale',
                 'stock_account',
                 'product_price_history',
                 'sd_sale_margin'],            
    'data': ['data/sd_group_readonly_price.xml',
             'view/modify_view.xml'],                
    'installable': True,        
    'auto_install': False,        
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: