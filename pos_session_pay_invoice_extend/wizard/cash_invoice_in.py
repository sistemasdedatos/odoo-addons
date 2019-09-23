#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import api, models, _, fields
from odoo.exceptions import UserError


class CashInvoiceIn(models.TransientModel):
    _inherit = 'cash.invoice.in'

    def _default_invoice(self):
        return self._default_value(self.default_invoice)

    def _default_session(self):
        return self._default_value(self.default_session)

    def _session_domain(self):
        return [('state', '=', 'opened'), 
                ('user_id', '=', self.env.uid)]

    invoice_id = fields.Many2one('account.invoice', string='Invoice', required=True, default=_default_invoice)
    pos_session_id = fields.Many2one('pos.session', string='Pos Session', default=_default_session, domain=_session_domain)
    active_model = fields.Char(default=lambda self: self.env.context.get('active_model', False))

    def default_invoice(self, active_model, active_ids):
        if active_model == 'account.invoice':
            return self.env[active_model].browse(active_ids).id

    def default_session(self, active_model, active_ids):
        if active_model == 'account.invoice':
            session = self.env['pos.session'].search([('state', '=', 'opened'), 
                                                      ('user_id', '=', self.env.uid)]).id
            if not session:
                raise UserError(_('There is not pos session opened for yourself'))
            return session
        return False

    def default_journals(self, active_model, active_ids):
        if active_model == 'account.invoice':
            session = self.env['pos.session'].browse(self._default_session())
            return self.env['account.journal'].browse([r.journal_id.id for r in session.statement_ids])
        return super(CashInvoiceIn, self).default_journals(active_model, active_ids)

    @api.multi
    def run(self):
        if self.env.context.get('active_model', False) == 'account.invoice':
            bank_statements = [
                session.statement_ids.filtered(
                    lambda r: r.journal_id.id == self.journal_id.id
                )
                for session in self.env['pos.session'].browse(self._default_session())
            ]
            if not bank_statements:
                raise UserError(_('Bank Statement was not found'))
            return self._run(bank_statements)
        return super(CashInvoiceIn, self).run()
