from openerp import api, models, fields
from openerp.exceptions import Warning
from openerp.tools.translate import _
import time
                
class sd_wizard_project_report (models.TransientModel):
    _name = "sd.wizard.project.report"
    
    date_from = fields.Date ('Start of period', required = True, default = lambda *a: time.strftime('%Y-01-01'))
    date_to = fields.Date ('End of period', required = True, default = lambda *a: time.strftime('%Y-%m-%d'))
    project_id = fields.Many2one ('project.project', string = "Project", default = lambda self: self._context['active_id'], readonly = True)
    partner_id = fields.Many2one ('res.partner', string = "Partner", related = "project_id.partner_id", readonly = True)
    stage_ids = fields.Many2many ('project.task.type', 'sd_wizard_project_report_project_task_type_relation', string = "Stages")
    wizard_task_ids = fields.One2many ('sd.wizard.task', 'wizard_project_id', string = "Tasks")
    total_time = fields.Char (string = "Total time", readonly = True)
    
    @api.multi
    def print_project_report (self, data):
        if self.prepare_data ():
            return self.env['report'].get_action (self, 'sd_report_project.project_report')
        else:
            raise Warning (_("There are not tasks in that period time or in that stages"))
    
    @api.multi
    def prepare_data (self):
        task_ids = self.env['project.task'].search ([('project_id', '=', self.project_id.id), ('date_deadline', '>=', self.date_from),
                                                     ('date_deadline', '<=', self.date_to), ('stage_id', 'in', self.stage_ids.mapped ('id'))])
        t_t = 0.0
        format_time = lambda a: "%02d:%02d" % divmod (a, 60)
        for task in task_ids:
            total_m = self.calc_total_mins (task)
            self.wizard_task_ids.create ({'wizard_project_id': self.id,
                                          'task_id': task.id,
                                          'total_time': format_time (total_m)})# self.format_time (total_m) #convertir a hh:mm
            t_t += total_m
        self.total_time = format_time (t_t) #self.format_time (t_t)
        return task_ids or False
    
    def calc_total_mins (self, task):
        total = 0.0
        for work in task.work_ids:
            total += work.hours * 60
        return total

#    NO BORRAR FUNCION COMENTADA SIRVE PARA POSTERIOR EXPLICACION
#     def format_time (self, min):
#         h, m = divmod (min, 60)
#         return "%02d:%02d" % (h, m) 
    
class sd_wizard_task (models.TransientModel):
    _name = "sd.wizard.task"
    
    wizard_project_id = fields.Many2one ('sd.wizard.project.report', string = "Wizard Project Report", readonly = True)
    task_id = fields.Many2one ('project.task', readonly = True)
    total_time = fields.Char (string = "Total time task", readonly = True)
    
    @api.model
    def create (self, vals):
        if self.env['sd.wizard.task'].search ([('wizard_project_id', '=', vals['wizard_project_id']), ('task_id', '=', vals['task_id'])]):
            return False
        else:
            return super (sd_wizard_task, self).create (vals)

class sd_project_report (models.AbstractModel):
    _name = 'report.sd_report_project.project_report'
  
    @api.multi
    def render_html (self, data = None):
        
        report_obj = self.env['report']
        report = report_obj._get_report_from_name ('sd_report_project.project_report')
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
             }
        res = report_obj.render ('sd_report_project.project_report', docargs)
        return res
     