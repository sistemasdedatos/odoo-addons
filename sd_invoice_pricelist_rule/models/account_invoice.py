from openerp import models, fields, api, _
from openerp.osv import fields as old_fields
import openerp.addons.decimal_precision as dp
from lxml import etree

class AccountInvoiceLine (models.Model):
    _inherit = 'account.invoice.line'
    
    @api.multi
    def _calc_price_subtotal (self):
        self.ensure_one ()
        price = (self.price_unit * (1 - (self.discount or 0.0) / 100.0) * (1 - (self.discount2 or 0.0) / 100.0) * (1 - (self.discount3 or 0.0) / 100.0))
        return price
    
    discount2 = fields.Float (string='Disc. 2 (%)', digits = dp.get_precision ('Discount'), default = 0.0, readonly = False)
    discount3 = fields.Float (string='Disc. 3 (%)', digits = dp.get_precision ('Discount'), default = 0.0, readonly = False)
    
    @api.one
    @api.depends ('price_unit', 'discount', 'discount2', 'discount3', 'invoice_line_tax_id', 'quantity',
        'product_id', 'invoice_id.partner_id', 'invoice_id.currency_id')
    def _compute_price (self):
        price = self._calc_price_subtotal ()
        taxes = self.invoice_line_tax_id.compute_all (price, self.quantity, product = self.product_id, partner = self.invoice_id.partner_id)
        self.price_subtotal = taxes['total']
        if self.invoice_id:
            self.price_subtotal = self.invoice_id.currency_id.round (self.price_subtotal)
            
    @api.model
    def move_line_get (self, invoice_id):
        res = super (AccountInvoiceLine, self).move_line_get (invoice_id)
        print res
        return res


class account_invoice_tax (models.Model):
    _inherit = "account.invoice.tax"
    
    @api.v8
    def compute (self, invoice):
        tax_grouped = {}
        disc = {}
        for line in invoice.invoice_line:
            disc[line.id] = line.discount or 0.0
            line.discount = (1 - (1 - (line.discount or 0.0) / 100.0) * (1 - (line.discount2 or 0.0) / 100.0) * (1 - (line.discount3 or 0.0) / 100.0)) * 100
        tax_grouped = super (account_invoice_tax, self).compute (invoice)        
        for line in invoice.invoice_line:
            line.discount = disc[line.id]
        
        return tax_grouped

class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'
     
    @api.model
    def _prepare_order_line_invoice_line (self, line, account_id=False):
        res = super (SaleOrderLine, self)._prepare_order_line_invoice_line (line, account_id)
        res['discount2'] = line.discount2
        res['discount3'] = line.discount3
        return res

class PurchaseOrder(models.Model):
    _inherit = "purchase.order"

    @api.model
    def _prepare_inv_line (self, account_id, order_line):
        result = super (PurchaseOrder, self)._prepare_inv_line (account_id, order_line)
        result['discount2'] = order_line.discount2 or 0.0
        return result
    