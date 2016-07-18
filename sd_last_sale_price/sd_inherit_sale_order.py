# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2016 Sistemas de Datos (<http://www.sdatos.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from datetime import datetime, timedelta
import time
from openerp import SUPERUSER_ID
from openerp.osv import fields, osv
from openerp.tools.translate import _
from openerp.tools import DEFAULT_SERVER_DATE_FORMAT, DEFAULT_SERVER_DATETIME_FORMAT
import openerp.addons.decimal_precision as dp
from openerp import workflow

class sale_order(osv.osv):
    _name = "sale.order"
    _inherit = "sale.order"
      
    _columns = {
                'last_price': fields.one2many('sd.last.sale.price', 'order_id', string='Last price', readonly = True),
                }
    
    def button_dummy (self, cr, uid, ids, context = None):                      #En el boton actualizar
        orders_ids = self.read (cr, uid, ids, ['order_line'])[0]['order_line']          #Obtenemos las ids de las líneas de la venta
        products_ids = []
        cliente = self.read (cr, uid, ids, ['partner_id'])[0]['partner_id'][0]             #Id del cliente
        
        if len (orders_ids) > 0:                # si hay alguna línea
            for i in self.pool.get ('sale.order.line').read (cr, uid, orders_ids, ['product_id', 'order_partner_id']):
                if i['product_id']:
                    products_ids.append (i['product_id'][0])     #Guardamos ids de los productos
            sales_ids = []
            for i in products_ids:
                lines = self.pool.get ('sale.order.line').search(cr, uid, ['&','&','&',                         #Buscamos las lineas que cumplan 
                                                                           '!',('id','in', orders_ids),          #el mismo producto y cliente
                                                                           ('order_partner_id','=', cliente),    #sin ser la misma venta
                                                                           ('product_id','=', i),                #y que no este en borrador
                                                                           '!',('state','=','draft')])
                if len (lines) > 0:           
                    sales_ids.append (lines[-1])         #nos quedamos con el ultimo encontrado (normalmente fecha mas nueva)
            
            last_price_id = self.pool.get ('sd.last.sale.price')
            
            def check (crea_id):
                sd_last_price_id = self.pool.get ('sd.last.sale.price').search(cr, uid, ['&', ('order_id', '=', ids[0]),('name', '=', crea_id)])
                if len (sd_last_price_id) > 0:
                    return False
                return True
            for i in self.pool.get('sale.order.line').read (cr, uid, sales_ids, ['price_unit', 'id', 'product_id', 'discount']):    
                if check (i['id']):                 #si el producto se le vendio al cliente antes (hay alguna linea)
                    order = self.pool.get ('sale.order.line').read (cr, uid, i['id'], ['order_id'])['order_id'][0]
                    date = self.pool.get ('sale.order').read (cr, uid, order, ['date_order'])['date_order']
                    last_price_id.create (cr, uid,{'sale_line_id': self.pool.get ('sale.order.line').search (cr, uid, ['&', 
                                                                                                                       ('product_id','=', i['product_id'][0]), 
                                                                                                                       ('id', 'in', orders_ids)])[0],
                                                   'order_id': ids[0],
                                                   'name': i['id'],
                                                   'price': i['price_unit'],
                                                   'date': date,
                                                   'order_last_id': order,
                                                   'discount': i['discount']})
            
        sd_no_last_price_id = self.pool.get('sd.last.sale.price').search(cr, uid, ['!',('sale_line_id', 'in', orders_ids)])
        if len (sd_no_last_price_id) > 0:
            self.pool.get('sd.last.sale.price').unlink (cr, uid, sd_no_last_price_id, context=context)
                
        return super (sale_order, self).button_dummy (cr, uid, ids, context)
        
        
    def action_button_confirm(self, cr, uid, ids, context=None):
        sd_no_last_price = self.pool.get('sd.last.sale.price').search(cr, uid, [('order_id', '=', ids[0])])
        if len (sd_no_last_price) > 0:
            self.pool.get('sd.last.sale.price').unlink (cr, uid, sd_no_last_price, context=context)
        return super (sale_order, self).action_button_confirm (cr, uid, ids, context=context)
             
class last_sale_price (osv.osv):
    _name = 'sd.last.sale.price'
      
    _columns = {
                'sale_line_id': fields.many2one ('sale.order.line', string = "Order line actual", invisible = True),
                'order_id': fields.many2one ('sale.order', 'Order Reference', ondelete='cascade', readonly=True),
                'price': fields.float (string = 'Last Sale Price', digits_compute= dp.get_precision('Product Price')),
                'name': fields.many2one ('sale.order.line', string = 'Product'),
                'order_last_id': fields.many2one ('sale.order', 'Last order', ondelete='cascade', readonly=True),
                'date': fields.datetime (string = 'Date'),
                'discount': fields.float ('Discount (%)', digits_compute= dp.get_precision('Discount'))
                }
 
     
     
     