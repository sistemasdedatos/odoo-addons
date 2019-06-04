# -*- encoding: utf-8 -*-
##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2019 Rodrigo Colombo Vlaeminch (http://sdatos.com).
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
##############################################################################

{
    'name': 'Real Estate Google API Address',
    'version': '10.0.1.0.0',
    'author': 'Sistemas de Datos - Rodrigo Colombo',
    'category': 'Specific Industry Applications',
    'website': 'https://github.com/sistemasdedatos/odoo-addons',
    'license': 'AGPL-3',
    'depends': ['real_estate_internet_common'],
    'external_dependencies': {'python': ['googlemaps']},
    'data': ['views/res_config_views.xml'],
    'installable': True,
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: