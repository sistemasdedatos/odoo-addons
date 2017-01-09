from openerp import models, fields

class account_invoice (models.Model):
    _name = "account.invoice"
    _inherit = "account.invoice"
    
    sale_order_ids = fields.Many2many ('sale.order', 'sale_order_invoice_rel', 'invoice_id', 'order_id', 'Sales', 
                                       readonly = True, copy = False, 
                                       help = "This is the list of invoices that have been generated for this sales order. The same sales order may have been invoiced in several times (by line for example).")
