from openerp import fields, models, api
from openerp.exceptions import Warning

class AccountInvoice(models.Model):
    _inherit = 'account.invoice'

    print_works = fields.Boolean (default = False)
    
    @api.multi
    def action_move_create(self):
        super (AccountInvoice, self).action_move_create()
        self.move_id.state = 'draft'
        for m_lines in self.move_id.line_id:
            if m_lines.debit == 0 and m_lines.credit == 0 and m_lines.tax_amount == 0:
                m_lines.with_context(from_parent_object = True).unlink()        #El contexto es para el caso de tener instalado el modulo account_constraints
        self.move_id.state = 'posted'