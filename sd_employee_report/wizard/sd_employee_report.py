from openerp.osv import orm, fields as old_fields
from openerp import api, models, fields
import time
from openerp.exceptions import Warning
from openerp.tools.translate import _
import openerp.addons.decimal_precision as dp

class sd_employee_report (models.TransientModel):
    _name = 'sd.employee_report'
    _columns = {
                'user_id': old_fields.many2one('res.users', 'Employee', select=True, track_visibility='onchange', required=True)
                }
    _defaults = {
        'user_id': lambda obj, cr, uid, ctx=None: uid
    }
    date_start = fields.Date ('Start of work', required = True, default = lambda *a: time.strftime ('%Y-%m-01'))
    date_end = fields.Date ('End of work', required = True, default = lambda *a: time.strftime ('%Y-%m-%d'))
    wizard_employee_task_ids = fields.One2many ('sd.wizard.employee.task', 'wizard_employee_id', string = "Materials")
    total_amount = fields.Float (string = "Total amount materials", readonly = True, digits_compute = dp.get_precision ('Account'))
    
    @api.multi
    def print_ (self):
        if self.prepare_data ():
            return self.env['report'].get_action (self, 'sd_employee_report.sd_project_task_employee_report')
        else:
            raise Warning (_("There are not expenses in that period time or for this user"))
    
    @api.multi
    def prepare_data (self):
        total_amount = 0.0
        if self.wizard_employee_task_ids:
            self.wizard_employee_task_ids.unlink ()
        m_ids = self.env['project.task.materials.internal'].search ([('create_uid', '=', self.user_id.id)])
        t_ids = m_ids.mapped ('task_id')       
        task_ids = self.env['project.task'].search ([('id', 'in', t_ids.mapped ('id')), ('date_deadline', '>=', self.date_start), 
                                                     ('date_deadline', '<=', self.date_end)], order = 'date_deadline asc')
        for task in task_ids:
            if True in map (lambda x: x in m_ids.mapped ('id'), task.internal_material_ids.mapped ('id')):
                wizard_task = self.wizard_employee_task_ids.create ({'wizard_employee_id': self.id,
                                                                     'task_id': task.id})
                for material in task.internal_material_ids:
                    if material.id in m_ids.mapped ('id') and wizard_task:
                        wizard_material = wizard_task.wizard_material_ids.create ({'wizard_employee_task_id': wizard_task.id,
                                                                                   'material_internal_id': material.id,
                                                                                   'spending': material.product_id.product_tmpl_id.list_price * material.quantity})
                        total_amount += wizard_material.spending
        if total_amount: self.total_amount = total_amount
        return len (task_ids) or False
      
class sd_wizard_employee_task (models.TransientModel):
    _name = "sd.wizard.employee.task"
    
    wizard_employee_id = fields.Many2one ('sd.employee_report', string = "Wizard Employee Report", readonly = True)
    task_id = fields.Many2one ('project.task', readonly = True)
    wizard_material_ids = fields.One2many ('sd.wizard.materials', 'wizard_employee_task_id', readonly = True)
        
class sd_wizard_materials (models.TransientModel):
    _name = "sd.wizard.materials"
    
    wizard_employee_task_id = fields.Many2one ('sd.wizard.employee.task', string = "Wizard Employee Report", readonly = True)
    material_internal_id = fields.Many2one ('project.task.materials.internal', readonly = True)
    spending = fields.Float (string = "Spending", readonly = True, digits_compute = dp.get_precision ('Account'))
   
class sd_custom_report_employee (models.AbstractModel):
    _name = 'report.sd_employee_report.sd_project_task_employee_report'
 
    @api.multi
    def render_html(self, data=None):
         
        report_obj = self.env['report']
        report = report_obj._get_report_from_name ('sd_employee_report.sd_project_task_employee_report')
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
        }
        res = report_obj.render ('sd_employee_report.sd_project_task_employee_report', docargs)
        return res
