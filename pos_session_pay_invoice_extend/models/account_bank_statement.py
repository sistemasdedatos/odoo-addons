#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import models


class AccountBankStatementLine(models.Model):
    _inherit = "account.bank.statement.line"

    def print_report(self):
        return self.env.ref('pos_session_pay_invoice_extend.action_report_payment').report_action(self)