#    Copyright 2020 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
{
    "name": "Order point generator route",
    "summary": "Allows to force a route in orderpoint templates",
    "version": "12.0.1.0.0",
    "author": "Sistemas de Datos",
    "maintainer": "Sistemas de Datos",
    "license": "AGPL-3",
    "category": "Warehouse",
    "depends": [
        "stock_orderpoint_generator",
        "stock_orderpoint_route",
    ],
    "data": [
        "views/orderpoint_template_views.xml"
    ],
    "installable": True,
    "auto_install": True,
}