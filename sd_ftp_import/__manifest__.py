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
    'name' : 'SDatos FTP Import',
    'version' : '0.1',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Tools',
    'summary': 'Import product, invoice, sale_order from Expand FTP',
    'description' : """
FTP Import
==========

This module allows import purchases from Expand.
It is think for import since Santana 

Funcionamiento
--------------
Para que el error de importe total entre la factura de santana y la importacion sea minima,
debemos configurar los decimales en Configuracion/Tecnico/Estructura de la base de datos/Precision decimal
a minimo 3 digitos
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['share',
                 'base',
                 'product',
                 'purchase',
                 'stock',
                 'purchase_discount'],
    'external_dependencies': {'python': ['ftplib', 'subprocess']},           
    'data': ['wizard/ftp_configure_view.xml',
             'wizard/ftp_import_view.xml',
             'security/sd_ftp_security.xml',
             'security/ir.model.access.csv'],                
    'installable': False,        
    'auto_install': False,        
    'application': False,
}