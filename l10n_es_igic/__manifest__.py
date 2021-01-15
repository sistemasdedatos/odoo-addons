# -*- encoding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2014 Arturo Esparragón Goncalves (http://sdatos.com). All Rights Reserved
#    Copyright (C) 2016-2018 Rodrigo Colombo Vlaeminch (http://sdatos.com). All Rights Reserved
#    Copyright (C) 2021 Héctor J. Ravelo (http://sdatos.com)- All Rights Reserved
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
##############################################################################

{
    'name': 'Planes de cuentas españoles (según PGCE 2008) ampliado para IGIC',
    'version': '2.0',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Localisation/Account Charts',
    'sequence': 3,
    'website': 'http://www.sdatos.com',
    'depends': ['l10n_es'],
    'data': ['data/account_account_common_igic.xml',
             'data/account_tax_group_data.xml',
             'data/taxes_common_igic.xml',   
             'data/fiscal_position_common_igic.xml'],
    'installable': True,        
    'auto_install': False,        
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
