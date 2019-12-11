#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

import json
from odoo import models, api, _
from odoo.tools import date_utils


class AccountInvoice(models.Model):
    _inherit = "account.invoice"

    @api.model
    def _get_payment_from_pos(self, line):
        res= {
                'name': line.statement_id.name,
                'journal_name': line.statement_id.journal_id.name,
                'amount': line.amount,
                'currency': self.currency_id.symbol,
                'digits': [69, self.currency_id.decimal_places],
                'position': self.currency_id.position,
                'date': line.date,
                'ref': line.ref,
                'pos_payment_id': line.id,
            }
        return res

    @api.one
    @api.depends('payment_move_line_ids.amount_residual')
    def _get_payment_info_JSON(self):
        super(AccountInvoice, self)._get_payment_info_JSON()
        statement = list(map(lambda x: x.id, self.env['account.bank.statement'].search([('state','=','open')])))
        if statement:
            content = []
            statement_line = self.env['account.bank.statement.line'].search([('statement_id','in',statement),('invoice_id','=',self.id)])
            if statement_line:
                for line in statement_line:
                    content.append(self._get_payment_from_pos(line))
                info = {'title': _('Less Payment'), 'outstanding': False, 'content': []}
                if json.loads(self.payments_widget):
                    for cont in json.loads(self.payments_widget)['content']:
                        content.append(cont)
                info['content'] = content
                self.payments_widget = json.dumps(info, default=date_utils.json_default)