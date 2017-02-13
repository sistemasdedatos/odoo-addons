from openerp import models, api, fields
from datetime import date

class crm_case_section (models.Model):
    _inherit = 'crm.case.section'
    
    sd_invoiced_forecast = fields.Integer (string = 'Anual Invoice Forecast', compute = "compute_sd_forecast")
    
    @api.one
    def compute_sd_forecast (self):
        res = 0.0
        date_begin = str (date.today ().replace (month = 1, day = 1)) + ' 00:00:00'
        date_end = str (date.today ().replace (month = 12, day = 31)) + ' 23:59:59'
        leads = self.env['crm.lead'].search ([('section_id', '=', self.id), ('message_last_post', '>=', date_begin), 
                                              ('message_last_post', '<=', date_end)])
        for lead in leads:
            res += lead.planned_revenue * lead.probability / 100
        self.sd_invoiced_forecast = res