from openerp import models, fields, api
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import time
import datetime
import openerp.addons.decimal_precision as dp

class sd_cash_count (models.TransientModel):
    _name = "sd.cash.count"
    
    @api.multi
    def set_user_id (self):
        return self._uid
    
    @api.multi
    def set_date_init (self):
        return time.strftime('%Y-%m-01')
    
    @api.multi
    def set_pos_config_id (self):
        return self.env['res.users'].browse ([self._uid]).pos_config.id
    
    @api.multi
    def set_date_end (self):
        def last_day_of_month (any_day):
            next_month = any_day.replace (day=28) + datetime.timedelta (days=4)  # this will never fail
            return next_month - datetime.timedelta (days = next_month.day)
        return last_day_of_month (datetime.date (int (time.strftime ('%Y')), int (time.strftime ('%m')), 1))
    
    date_init = fields.Date (string = "Date since", default = set_date_init, required = True)
    date_end = fields.Date (string = "Date to", default = set_date_end, required = True)
    user_id = fields.Many2one ('res.users', string = "Salesman", default = set_user_id)
    pos_config_id = fields.Many2one ('pos.config', string = "Terminal", default = set_pos_config_id, required = True)
    sd_cash_count_lines_ids = fields.One2many ('sd.cash.count.lines', 'sd_cash_count_id', string = 'Cash count lines')
    
    @api.depends ('date_init', 'date_end', 'user_id', 'pos_config_id')
    @api.multi
    def write_sd_cash_count_lines (self):
        session_ids = self.env['pos.session'].search ([('stop_at', '>=', self.date_init), ('stop_at', '<=', self.date_end), ('user_id', '=', self.user_id.id), ('config_id', '=', self.pos_config_id.id)])
        for session in session_ids:
            line = self.sd_cash_count_lines_ids.create ({'sd_cash_count_id': self.id,
                                                         'name': session.name,
                                                         'date_start': session.start_at,
                                                         'date_close': session.stop_at,
                                                         'open_amount': session.cash_register_balance_start,
                                                         'teorical_amount': session.cash_register_balance_end,
                                                         'real_amount': session.cash_register_balance_end_real})
            card_sales = 0.0
            take_out = 0.0
            entry = 0.0
            cash_sales = 0.0
            for statment in session.statement_ids:
                if statment.journal_id.default_debit_account_id.code[0:3] == '572':             #Si es pago por tarjeta
                    card_sales = card_sales + statment.balance_end_real
                elif statment.journal_id.default_debit_account_id.code[0:3] == '570':           #Si es pago en efectivo
                    for l in statment.line_ids:
                        if l.account_id.code[0:3] == '678':                                     #Retirada de efectivo
                            take_out = take_out + abs (l.amount)
                        elif l.account_id.code[0:3] == '778':
                            entry = entry + l.amount                                            #Ingreso de efectivo
                        elif l.account_id.code[0:3] == '430':                                   #Efectivo
                            cash_sales = cash_sales + l.amount
                            
            line.write ({'card_sales': card_sales,
                         'cash_sales': cash_sales,
                         'total_cash_sales': cash_sales + line.open_amount,
                         'total_sales': card_sales + cash_sales,
                         'entry': entry,
                         'take_out': take_out})
            
    @api.multi
    def print_report (self):
        self.write_sd_cash_count_lines ()
        return self.pool['report'].get_action (self._cr, self._uid, self._ids, 'sd_pos_cash_count.sd_cash_count_report', data=None, context=self._context)    

 
class sd_cash_count_lines (models.TransientModel):
    _name = "sd.cash.count.lines"
     
    name = fields.Char (string = "Session")                                                                     #nombre sesion
    date_start = fields.Datetime (string = "Opened")                                                            #fecha apertura
    date_close = fields.Datetime (string = "Closed")                                                            #fecha cierre
    open_amount = fields.Float (string = "Open amount", digits=dp.get_precision('Account'))                     #Saldo de apertura
    cash_sales = fields.Float (string = "Cash sales", digits=dp.get_precision('Account'))                       #Ventas en efectivo
    total_cash_sales = fields.Float (string = "Cash sales + open", digits=dp.get_precision('Account'))          #Ventas en efectivo + apertura
    card_sales = fields.Float (string = "Card sales", digits=dp.get_precision('Account'))                       #Ventas con tarjeta
    total_sales = fields.Float (string = "Total sales", digits=dp.get_precision('Account'))                     #Ventas en efectivo + tarjeta
    entry = fields.Float (string = "Entry", digits=dp.get_precision('Account'))                                 #Ingresos
    take_out = fields.Float (string = "Take Out", digits=dp.get_precision('Account'))                           #Retirada
    teorical_amount = fields.Float (string = "Teorical Amount", digits=dp.get_precision('Account'))             #Saldo teorico de cierre
    real_amount = fields.Float (string = "Real Amount", digits=dp.get_precision('Account'))                     #Saldo real al cierre
    sd_cash_count_id = fields.Many2one ('sd.cash.count', string = 'Cash count', ondelete='cascade', readonly = True)
    
    
class sd_pos_report_cash_count (models.AbstractModel):
    _name = 'report.sd_pos_cash_count.sd_cash_count_report'
    
    @api.multi
    def render_html(self, data=None):
         
        report_obj = self.env['report']
         
        report = report_obj._get_report_from_name('sd_pos_cash_count.sd_cash_count_report')
        docargs = {
             'doc_ids': self._ids,
             'doc_model': report.model,
             'docs': self,
        }
        res = report_obj.render('sd_pos_cash_count.sd_cash_count_report', docargs)
        return res
     
sd_pos_report_cash_count ()