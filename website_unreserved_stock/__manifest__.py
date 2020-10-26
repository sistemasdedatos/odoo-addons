##############################################################################
#
#   Sistemas de datos, Open Source Management Solutions (<http://sdatos.com>)
#   License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
#
##############################################################################

{
    'name': 'Website Unreserved Stock',
    'version': '1.0.0',
    'author': 'Sistemas de Datos, S.L.',
    'maintainer': 'Jesús Peña Delgado',
    'company': 'Sistemas de Datos, S.L.',
    'category': 'Website',
    'summary': 'Module to show unsreserved quantities in website',
    'description': """
            - This module change in the website the default stock quantity.
            Instead, the quantity appearing in the website after installing this module is the unreserved quantity
        """,
    'website': 'http://www.sdatos.com',

    # End General Data
    'depends': ["stock_available_unreserved", 
                "website_sale_stock"],
    'data': [],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
