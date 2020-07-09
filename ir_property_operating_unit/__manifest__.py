#    Copyright 2020 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    "name" : "Company Properties with Operating unit",
    "version" : "12.0.1.0.0",
    "author" : "Sistemas de Datos",
    "maintainer": "Sistemas de Datos",
    "category" : "Generic",
    "summary": "An operating unit (OU) is an organizational entity part of a "
               "company",
    "license": "AGPL-3",
     "website": "http://www.sdatos.com",
    # End General Data
    "depends" : ["operating_unit",
                 "account_operating_unit"],
    "data": ["security/property_security.xml",
             "views/ir_property_views.xml"],
    "installable": True,
    "auto_install": False,
    "application": False,
}
