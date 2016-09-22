from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _

class sd_sale_template (models.Model):
    _name = "sd.sale.template"
    
    name = fields.Char ("Name", required = True)
    description = fields.Char ("Description")
    template = fields.Html ("Template")

class sale_order(models.Model):
    _inherit = "sale.order"  
    sale_template_id = fields.Many2one ('sd.sale.template', string = "Template", ondelete = "restrict", help = "Template to print sale order")