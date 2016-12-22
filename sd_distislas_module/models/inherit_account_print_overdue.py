from openerp.osv import osv
from openerp.addons.account.report.account_print_overdue import Overdue

class Overdue_inherit (Overdue):
    def _lines_get (self, partner):
        moveline_obj = self.pool['account.move.line']
        movelines = moveline_obj.search(self.cr, self.uid,
                [('partner_id', '=', partner.id),
                    ('account_id.type', 'in', ['receivable', 'payable']),
                    ('state', '<>', 'draft'), ('reconcile_id', '=', False)], order = 'date asc')
        movelines = moveline_obj.browse(self.cr, self.uid, movelines)
        return movelines

class report_overdue (osv.AbstractModel):
    _name = 'report.account.report_overdue'
    _inherit = 'report.abstract_report'
    _template = 'account.report_overdue'
    _wrapped_report_class = Overdue_inherit