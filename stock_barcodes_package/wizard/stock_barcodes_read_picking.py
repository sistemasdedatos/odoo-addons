#    Copyright 2019 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import _, api, fields, models
from odoo.addons import decimal_precision as dp


class WizStockBarcodesReadPicking(models.TransientModel):
    _inherit = 'wiz.stock.barcodes.read.picking'

    stock_package_id = fields.Many2one(
        comodel_name='stock.quant.package',
    )

    picking_type_id = fields.Many2one(
        comodel_name='stock.picking.type',
        string='Picking Type',
        readonly=True,
    )

    def process_barcode(self, barcode):
        if self.env.user.has_group('stock.group_tracking_lot'):
            stock_package_domain = [('name', '=', barcode)]
            stock_package = self.env['stock.quant.package'].search(stock_package_domain)
            if stock_package:
                self.action_package_scaned_post(stock_package)
                self.action_done()
                return
        super(WizStockBarcodesReadPicking, self).process_barcode(barcode)

    def _search_candidate_pickings(self, moves_todo=False):
        res = super(WizStockBarcodesReadPicking, self)._search_candidate_pickings(moves_todo)
        if not self.picking_id and self.stock_package_id:
            package_level = self._get_stock_package_level()
            candidate_pickings = package_level.mapped('picking_id')
            candidate_pickings_count = len(candidate_pickings)
            if candidate_pickings_count > 1:
                self._set_candidate_pickings(candidate_pickings)
                return False
            if candidate_pickings_count == 1:
                self.picking_id = candidate_pickings
                self._set_candidate_pickings(candidate_pickings)
        return res

    def action_package_scaned_post(self, package):
        self.stock_package_id = package

    def _prepare_scan_log_values(self, log_detail=False):
        res = super(WizStockBarcodesReadPicking, self)._prepare_scan_log_values(log_detail)
        res['stock_package_id'] = self.stock_package_id
        return res

    def _get_stock_package_level(self):
        package_level = self.env['stock.package_level'].search([('package_id','=',self.stock_package_id.id),('picking_id.picking_type_id.code', '=', self.picking_type_code),('picking_id.state', 'in', ['draft','confirmed','assigned'])])
        return package_level

    def _prepare_stock_moves_domain(self):
        domain = super(WizStockBarcodesReadPicking, self)._prepare_stock_moves_domain()
        if self.picking_type_id:
            domain.append(['picking_type_id', '=', self.picking_type_id.id])
        return domain

    def _process_stock_move_line(self):
        res = super(WizStockBarcodesReadPicking, self)._process_stock_move_line()
        if not res and self.stock_package_id and self.picking_id:
            move_lines_dic = {}
            package_level = self.env['stock.package_level'].search([('package_id', '=', self.stock_package_id.id),('picking_id', '=', self.picking_id.id)])
            if package_level:
                move_line = self.env['stock.move.line'].search([('package_level_id', '=', package_level.id)])
                for line in move_line:
                    line.write({'qty_done': line.product_uom_qty})
                    move_lines_dic[line.id] = line.product_uom_qty
                self._set_messagge_info('info', _('Read'))
                return move_lines_dic
        #TODO: write log
        return res

    def check_done_conditions(self):
        if self.stock_package_id:
            return True
        return super(WizStockBarcodesReadPicking, self).check_done_conditions()

class WizCandidatePicking(models.TransientModel):
    _inherit = 'wiz.candidate.picking'

    def put_in_pack(self):
        picking = self.env['stock.picking'].browse(
            self.env.context.get('picking_id', False)
        )
        return picking._put_in_pack()

