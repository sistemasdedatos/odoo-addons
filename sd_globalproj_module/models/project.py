# -*- coding: utf-8 -*-
# License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0.html

##Modificacion para que establezaca el diario dependiendo de las companias y la tarifa que corresponda al producto##

from openerp import models, fields, api, exceptions, _
from openerp.tools.float_utils import float_round

class ProjectTaskMaterials(models.Model):
    _inherit = "project.task.materials"
    
    def _prepare_analytic_line(self):
        product = self.product_id
        company_id = self.env['res.company']._company_default_get(
            'account.analytic.line')
        journal = self.env['account.analytic.journal'].search([('company_id','=',company_id),('code','=','SALMAT')])
        analytic_account = getattr(self.task_id, 'analytic_account_id', False)\
            or self.task_id.project_id.analytic_account_id
        res = {
            'name': self.task_id.name + ': ' + product.name,
            'ref': self.task_id.name,
            'product_id': product.id,
            'journal_id': journal.id,
            'unit_amount': self.quantity,
            'account_id': analytic_account.id,
            'user_id': self._uid,
        }
        analytic_line_obj = self.pool.get('account.analytic.line')
        amount_dic = analytic_line_obj.on_change_unit_amount(
            self._cr, self._uid, self._ids, product.id, self.uos_qty(),
            company_id, False, journal.id, self._context)
        res.update(amount_dic['value'])
        res['product_uom_id'] = self.product_uom.id
        to_invoice = getattr(self.task_id.project_id.analytic_account_id,
                             'to_invoice', None)
        if to_invoice is not None:
            res['to_invoice'] = to_invoice.id
        return res
    
    def _prepare_stock_move(self):
        product = self.product_id
        company_id = self.env['res.company']._company_default_get('account.analytic.line')
        res = {
            'product_id': product.id,
            'name': product.partner_ref,
            'state': 'confirmed',
            'product_uom': self.product_uom.id or product.uom_id.id,
            'product_uos': self.product_uom.id,
            'product_uom_qty': self.quantity,
            'product_uos_qty': self.quantity,
            'origin': self.task_id.name,
            'location_id': self.env['stock.location'].search(
                [('company_id','=',company_id),('usage','=','internal')])[0].id,
            'location_dest_id': self.env.ref(
                'stock.stock_location_customers').id,
        }
        return res
    
    def _prepare_analytic_line(self):
        product = self.product_id
        company_id = self.env['res.company']._company_default_get(
            'account.analytic.line')
        journal = self.env.ref(
            'project_task_materials_stock.analytic_journal_sale_materials')
        analytic_account = getattr(self.task_id, 'analytic_account_id', False)\
            or self.task_id.project_id.analytic_account_id
        res = {
            'name': self.task_id.name + ': ' + product.name,
            'ref': self.task_id.name,
            'product_id': product.id,
            'journal_id': journal.id,
            'unit_amount': self.quantity,
            'account_id': analytic_account.id,
            'user_id': self._uid,
        }
        analytic_line_obj = self.pool.get('account.analytic.line')
        amount_dic = analytic_line_obj.on_change_unit_amount(
            self._cr, self._uid, self._ids, product.id, self.uos_qty(),
            company_id, False, journal.id, self._context)
        amount_dic['value']['amount'] = self.env['product.pricelist'].price_get_multi ([(product, self.quantity, self.task_id.partner_id.id)])[product.id][1] * (-1) * self.quantity
        res.update(amount_dic['value'])
        res['product_uom_id'] = self.product_uom.id
        to_invoice = getattr(self.task_id.project_id.analytic_account_id,
                             'to_invoice', None)
        if to_invoice is not None:
            res['to_invoice'] = to_invoice.id
        return res
