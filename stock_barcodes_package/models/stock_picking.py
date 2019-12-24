# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).
from odoo import models


class StockPicking(models.Model):
    _inherit = 'stock.picking'

    def action_barcode_scan(self):
        res = super(StockPicking, self).action_barcode_scan()
        res['context']['default_picking_type_id'] = self.picking_type_id.id
        return res