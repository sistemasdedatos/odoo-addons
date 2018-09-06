# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import models, fields, api, _, exceptions
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT, float_compare


class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    def _get_warehouse_quantities(self):
        warehouse_quantity_text = ''
        quant_ids = self.env['stock.quant'].sudo().search([('product_id','=',self.product_id.id),('reservation_id','=',None),('location_id.usage','=','internal')])
        t_warehouses = {}
        for quant in quant_ids:
            if quant.location_id:
                if quant.location_id not in t_warehouses:
                    t_warehouses.update({quant.location_id:0})
                t_warehouses[quant.location_id] += quant.qty
        tt_warehouses = {}
        for location in t_warehouses:
            warehouse = False
            location1 = location
            while (not warehouse and location1):
                warehouse_id = self.env['stock.warehouse'].sudo().search([('lot_stock_id','=',location1.id)])
                warehouse = len(warehouse_id) > 0
                location1 = location1.location_id
            if warehouse_id:
                if warehouse_id.name not in tt_warehouses:
                    tt_warehouses.update({warehouse_id:0})
                tt_warehouses[warehouse_id] += t_warehouses[location]
        return tt_warehouses

    @api.onchange('product_uom_qty', 'product_uom', 'route_id')
    def _onchange_product_id_check_availability(self):
        if not self.product_id or not self.product_uom_qty or not self.product_uom:
            self.product_packaging = False
            return {}
        if self.env.ref('sale_warehouse_qty.group_stock_by_warehouse').id in self.env.user.groups_id.ids:
            warehouse_id = self.order_id.warehouse_id
            warehouse_qty = self._get_warehouse_quantities()
            if warehouse_id and self.product_id.type == 'product':
                precision = self.env['decimal.precision'].precision_get('Product Unit of Measure')
                product_qty = self.product_uom._compute_quantity(self.product_uom_qty, self.product_id.uom_id)
                if float_compare(warehouse_qty.get(warehouse_id, 0), product_qty, precision_digits=precision) == -1:
                    warning_mess = {
                            'title': _('Not enough inventory!'),
                            'message' : _('You plan to sell %s %s but you have %s %s available in this warehouse!\n'
                                          'The stock on hand is %s %s for all the company.\n') % \
                            (self.product_uom_qty, self.product_uom.name, warehouse_qty.get(warehouse_id, 0), self.product_id.uom_id.name, self.product_id.virtual_available, self.product_id.uom_id.name)
                            }
                    for w in warehouse_qty:
                        warning_mess['message'] += _('In %s there are %s %s.\n') % (w.name, warehouse_qty.get(w, 0), self.product_id.uom_id.name)
                    return {'warning': warning_mess}
        
        return super(SaleOrderLine, self)._onchange_product_id_check_availability()
    