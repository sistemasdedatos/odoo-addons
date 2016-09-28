from openerp import api, models, fields, tools
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import datetime, time

class work_for_employee (models.TransientModel):
    _name = 'work.for.employee'
    
    partner_id = fields.Many2one ('res.users', 'Employee', select = True, required = True)
    date_type = fields.Selection (string = 'Start of work', selection = [('day', 'Daily'),
                                                                         ('week', 'Weekly'),
                                                                         ('month', 'Monthly')], default = 'day', required = True, copy=False)
    day_ = fields.Date (string = "Day", default = time.strftime ('%Y-%m-%d'), invisible = True)
    tasks_ids = fields.One2many ('project.task', string = 'Tasks', compute = 'get_task', readonly = True)
    
    @api.one
    @api.depends ('partner_id','date_type')
    def get_task (self):
        if self.date_type == 'day':
            period_init = self.day_
            period_end = self.day_
        elif self.date_type == 'week':
            def this_week ():
                to_rst = datetime.date.today ().isocalendar ()[2] - 1
                to_sum = 7 - datetime.date.today ().isocalendar ()[2]
                first_day = datetime.date.today () - datetime.timedelta (days = to_rst)
                last_day = datetime.date.today () + datetime.timedelta (days = to_sum)
                return first_day.strftime ('%Y-%m-%d 00:00:00'), last_day.strftime ('%Y-%m-%d 23:59:59')
            period_init, period_end = this_week ()
        elif self.date_type == 'month':
            def last_day_of_month (any_day):        #Devuelve el ultimo dia del mes, contempla febrero y los bisiestos
                next_month = any_day.replace (day=28) + datetime.timedelta (days = 4)  # this will never fail
                return next_month - datetime.timedelta (days = next_month.day)
            period_init = time.strftime ('%Y-%m-01 00:00:00')
            period_end = last_day_of_month (datetime.date (int (time.strftime ('%Y')), int (time.strftime ('%m')), 1)).strftime ('%Y-%m-%d 23:59:59')
            
        tasks = self.env['project.task'].search ([('user_id', '=', self.partner_id.id), ('date_start', '>=', period_init), ('date_start', '<=', period_end)])
        self.tasks_ids = tasks
    
    @api.multi
    def print_ (self):
        if self.tasks_ids:
            return self.pool['report'].get_action (self._cr, self._uid, self._ids, 'sd_mpestano_module.sd_work_for_employee_report', data = None)
        else:
            raise Warning(_("%s can not tasks on this period" % self.partner_id.name))
    
class report_for_employee (models.AbstractModel):
    _name = 'report.sd_mpestano_module.sd_work_for_employee_report'
 
    @api.multi
    def render_html(self, data=None):
         
        report_obj = self.env['report']
         
        report = report_obj._get_report_from_name('sd_mpestano_module.sd_work_for_employee_report')
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
        }
        res = report_obj.render('sd_mpestano_module.sd_work_for_employee_report', docargs)
        return res
     
report_for_employee ()