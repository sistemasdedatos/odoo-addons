# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import api, fields, models, _


class SaleConfiguration(models.TransientModel):
    _inherit = 'sale.config.settings'
    
    group_stock_search = fields.Selection([(0, 'All company stock'),
                                           (1, 'Stock by warehouse')], "Stock warehouse",
                                           help=_('The stock alert in sale order lines depends on the sale order warehouse'),
                                           implied_group='sale_warehouse_qty.group_stock_by_warehouse')