from openerp import api, models, fields
from openerp.exceptions import Warning
from openerp.tools.translate import _
import time
                
class sd_wizard_project_report (models.TransientModel):
    _inherit = "sd.wizard.project.report"
    
    total_incidencias = fields.Integer (string = "Incidencias totales", readonly = True)
    total_TA = fields.Integer (string = "Tipo A", readonly = True)
    total_TB = fields.Integer (string = "Tipo B", readonly = True)
    total_TC = fields.Integer (string = "Tipo C", readonly = True)
    total_desplaza = fields.Char (string = "Total Tiempo de desplazamiento", readonly = True)
    
    @api.multi
    def prepare_data (self):
        res = super (sd_wizard_project_report, self).prepare_data ()
        if res:
            self.total_TA = self.total_TB = self.total_TC = self.total_incidencias = self.total_desplaza = t_desplaza = 0
            ta_id = self.env['project.category'].search ([('name', '=', 'TA')]).id
            tb_id = self.env['project.category'].search ([('name', '=', 'TB')]).id
            tc_id = self.env['project.category'].search ([('name', '=', 'TC')]).id
            desplaza_id = self.env['product.product'].search ([('name', '=', 'Desplazamiento')]).id
            t = lambda task, t_id: t_id in task.categ_ids.mapped ('id')
            format_time = lambda a: "%02d:%02d" % divmod (a, 60)
            for task in res:
                self.total_TA += t (task, ta_id)
                self.total_TB += t (task, tb_id)
                self.total_TC += t (task, tc_id)
                for product in task.material_ids:
                    if product.product_id.id == desplaza_id:
                        t_desplaza += product.quantity
            self.total_incidencias = self.total_TA + (self.total_TB * 2) + (self.total_TC * 3)
            self.total_desplaza = format_time (t_desplaza * 60)
            
        return res