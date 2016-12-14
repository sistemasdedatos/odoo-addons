from openerp import api, models
from openerp.osv import fields, osv
import time
from numpy import integer
from numpy.ma.core import ids
from openerp.exceptions import Warning
from openerp.tools.translate import _

class task(osv.osv):
    _name = 'project.task'
    _inherit = 'project.task'
        
    def copy_data(self, cr, uid, id, default=None, context=None):
        if default is None:
            default = {}
        if not default.get('name'):
            current = self.browse(cr, uid, id, context=context)
            default['name'] = _("%s (copy)") % current.name
        if not default.get('date_deadline'):
            default['date_deadline'] = time.strftime('%Y-%m-%d')
            
        return super(task, self).copy_data(cr, uid, id, default, context)
    
    _columns = {
                'date_deadline': fields.date('Deadline', select=True, copy=False, required=True),
                }

class project(osv.osv):
    _name = "project.project"
    _inherit = "project.project"
    _columns = {
                'date_from': fields.date('Start of period'),
                'date_to': fields.date('End of period'),
            }
    
    def set_period(self, cr, uid, ids, period):
        super(project, self).write(cr, uid, ids, { 'date_from': period[0], 'date_to': period[1],})
                
class sd_custom_report_filter(osv.osv):
    _name = "sd.custom_report_filter"

    def imprimir(self, cr, uid, ids, context=None):
        period = []
        
        if self.browse(cr, uid, ids).date_from:
            period.append(self.browse(cr, uid, ids).date_from)
       
        if self.browse(cr,uid,ids).date_to:
            period.append(self.browse(cr,uid,ids).date_to)
      
        if period[0] > period[1]:
            raise Warning(_("Error period"))
        
        if period != []:
            self.pool['project.project'].set_period(cr, uid, context['active_id'], period)

        return self.pool['report'].get_action(cr, uid, [], 'sd_print_project_work.sd_project_report', data=None, context=context)

    _columns = {
                'date_from': fields.date('Start of period', required=True, store=False),
                'date_to': fields.date('End of period', required=True, store=False),
                }
    _defaults = {
        'date_from': lambda *a: time.strftime('%Y-01-01'),
        'date_to': lambda *a: time.strftime('%Y-%m-%d')
    }
    
sd_custom_report_filter()
  
class sd_custom_report(models.AbstractModel):
    _name = 'report.sd_print_project_work.sd_project_report'
 
    @api.multi
    def render_html(self, data=None):
         
        report_obj = self.env['report']
        report = report_obj._get_report_from_name('sd_print_project_work.sd_project_report')
        print report.model
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
        }
        res = report_obj.render('sd_print_project_work.sd_project_report', docargs)
        return res
     
sd_custom_report()

