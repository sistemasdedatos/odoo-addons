import itertools
from lxml import etree

from openerp import models, fields, api, _
from openerp.exceptions import except_orm, Warning, RedirectWarning
from openerp.tools import float_compare
import openerp.addons.decimal_precision as dp

class account_invoice(models.Model):
    _inherit = "account.invoice"
    
    ref_client = fields.Char(related='partner_id.ref', store=False, readonly=True, copy=False)
    fiscal_name_client = fields.Char(related='partner_id.comercial', store=False, readonly=True, copy=False)
    vat_client = fields.Char(related='partner_id.vat', store=False, readonly=True, copy=False)