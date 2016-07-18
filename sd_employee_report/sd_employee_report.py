from openerp.osv import fields, orm
from openerp import api, models
import time

class task(orm.Model):
    _inherit = 'project.task'
    _columns = {
                'office': fields.text('Office'),
                }

class sd_employee_report(orm.Model):
    _name = 'sd.employee_report'
    
    def print_(self, cr, uid, ids, context=None):
        return self.pool['report'].get_action(cr, uid, ids, 'sd_employee_report.sd_project_task_employee_report', data=None, context=context)
    
    def _get_default_task(self, cr, uid, ids, name, args,context=None):
        args = []
        res = {}
        args.append(self.browse(cr, uid, ids[0]).date_start)
        args.append(self.browse(cr, uid, ids[0]).date_end)
        args.append(self.browse(cr, uid, ids[0]).partner_id)
        j = self.pool['project.task'].search(cr, uid, [('user_id', '=', args[2].id), ('date_deadline', '>=', args[0]), ('date_deadline', '<=', args[1])])
        p = {}
        for i in j:
            p[i]= self.pool.get('project.task').browse(cr, uid, i).date_deadline
        task_ids = sorted(p, key=p.get)
        res[ids[0]] = self.pool.get('project.task').browse(cr, uid, task_ids)
        return res
    
    _columns = {
                'partner_id': fields.many2one('res.users', 'Employee', select=True, track_visibility='onchange', required=True),
                'date_start': fields.date ('Start of work', required=True),
                'date_end': fields.date ('End of work', required=True),
                'tasks_id': fields.function(_get_default_task, string='Tasks', type='one2many', readonly=True, select=True, relation="project.task"),
    }
    
    _defaults = {
        'date_start': lambda *a: time.strftime('%Y-%m-01'),
        'date_end': lambda *a: time.strftime('%Y-%m-%d'),
        'partner_id': lambda obj, cr, uid, ctx=None: uid,
    }
    
sd_employee_report ()

class sd_custom_report_employee(models.AbstractModel):
    _name = 'report.sd_employee_report.sd_project_task_employee_report'
 
    @api.multi
    def render_html(self, data=None):
         
        report_obj = self.env['report']
         
        report = report_obj._get_report_from_name('sd_employee_report.sd_project_task_employee_report')
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
        }
        res = report_obj.render('sd_employee_report.sd_project_task_employee_report', docargs)
        return res
     
sd_custom_report_employee()