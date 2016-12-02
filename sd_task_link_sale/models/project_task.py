from openerp import api, models, fields
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task (models.Model):
    _inherit = 'project.task'
    
    sale_order_id = fields.Many2one ("sale.order", string = "Sale Order")
    
    @api.model
    def create (self, values):
        if 'procurement_id' in values.keys () and values['procurement_id']:
            values['sale_order_id'] = self.env['procurement.order'].browse ([values['procurement_id']]).sale_line_id.order_id.id
        return super (task, self).create (values)

