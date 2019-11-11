##############################################################################
#
#    Sistemas de Datos, Open Source Management Solution
#    Copyright (C) 2019 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>).
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
##############################################################################

{
    'name' : 'Pricelist Print from distribution',
    'version' : '12.0.1.0.0',
    'author' : 'Sistemas de Datos',
    'maintainer': 'Sistemas de Datos',
    'category' : 'Purchases',
    'summary': 'Show pricelist for each product',
    'description' : """
Print pricelists in Distribution Cost
=====================================

This module add a button to print prices for ecah pricelist
-----------------------------------------------------------
    """,
    'website': 'http://www.sdatos.com',
    # End General Data
    'depends' : ['sale',
                 'purchase_landed_cost',
                 'distribution_price_margin',
                 'product_pricelist_direct_print'],
    'data': ['views/purchase_cost_distribution_view.xml'],
    'images':[],                
    'installable': True,
    'auto_install': False,        
    'application': False,
}

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
