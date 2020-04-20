# License AGPL-3.0 or later (https://www.gnu.org/licenses/agpl).
{
    "name": "Picking Tier Validation",
    "summary": "Extends the functionality of Stock Picking to "
               "support a tier validation process.",
    "version": "12.0.1.0.0",
    "category": "Warehouse Management",
    "website": "http://www.sdatos.com",
    "author": "Sistemas de Datos",
    "license": "AGPL-3",
    "application": False,
    "installable": True,
    "depends": [
        "stock",
        "base_tier_validation",
    ],
    "data": [
        "views/stock_picking_view.xml",
    ],
}