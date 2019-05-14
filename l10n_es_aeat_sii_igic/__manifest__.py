# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

{
    'name': 'Suministro Inmediato de Información para IGIC',
    'version': '0.1',
    'author': 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category': 'Localisation/Account Charts',
    'website': 'http://www.sdatos.com',
    'license': "AGPL-3",
    'depends': ['l10n_es_igic',
                'l10n_es_aeat_sii'],
    'data': ['data/account_mapping_registration_keys_data.xml',
             'data/account_fiscal_position_data.xml',
             'data/aeat_sii_map_data.xml'],
    'installable': False,
    'auto_install': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
