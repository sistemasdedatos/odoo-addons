from openerp import models, fields

class project_task_materials_internal(models.Model):
    _inherit = "project.task.materials.internal"
        
    product_description = fields.Text ('Description')