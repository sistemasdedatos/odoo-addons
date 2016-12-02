from openerp import fields, models, api

class sale_order(models.Model):    
    _inherit = 'sale.order'
    
    task_count = fields.Integer (compute = "_task_count", string='# Tasks', store = False)
    
    def _task_count (self):
        for record in self:
            record.task_count = self.env['project.task'].search_count ([('sale_order_id', '=', self.id)])
