import itertools
from lxml import etree

from openerp import models, fields, api, _
from openerp.exceptions import except_orm, Warning, RedirectWarning
from openerp.tools import float_compare
import openerp.addons.decimal_precision as dp

class account_invoice(models.Model):
    _name = "account.invoice"
    _inherit = "account.invoice"
    
    sale_order_ids = fields.Many2many('sale.order', 'sale_order_invoice_rel', 'invoice_id', 'order_id', 'Sales', readonly=True, copy=False, help="This is the list of invoices that have been generated for this sales order. The same sales order may have been invoiced in several times (by line for example).")
