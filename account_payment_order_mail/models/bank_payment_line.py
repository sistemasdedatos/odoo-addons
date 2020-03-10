#    Copyright (C) 2020 Sistemas de Datos (<http://www.sdatos.com>) - Rodrigo Colombo
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import models, fields, api


class BankPaymentLine(models.Model):
    _inherit = 'bank.payment.line'

    def payment_line_send(self):
        self.ensure_one()
        template_id = self.env.ref('account_payment_order_mail.email_template_bank_payment_line')

        ctx = {
            'default_model': 'bank.payment.line',
            'default_res_id': self.ids[0],
            'default_use_template': bool(template_id.id),
            'default_template_id': template_id.id,
            'default_composition_mode': 'comment',
            'force_email': True,
        }
        return {
            'type': 'ir.actions.act_window',
            'view_mode': 'form',
            'res_model': 'mail.compose.message',
            'views': [(False, 'form')],
            'view_id': False,
            'target': 'new',
            'context': ctx,
        }
