#   Copyright (C) 2020 Rodrigo Colombo - Sistemas de Datos (<http://www.sdatos.com>)
#   License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    "name" : "Factura-e Factoring",
    "version" : "12.0.1.0.0",
    "author" : "Sistemas de Datos",
    "maintainer": "Sistemas de Datos",
    "category" : "Accounting & Finance",
    "license": "AGPL-3",
     "website": "http://www.sdatos.com",
    # End General Data
    "depends" : ["l10n_es_facturae"],
    "data": ["views/payment_mode_view.xml",
             "views/report_facturae.xml"],
    "installable": True,
    "auto_install": False,
    "application": False,
}