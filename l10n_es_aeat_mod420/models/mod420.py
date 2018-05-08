# -*- coding: utf-8 -*-
# Copyright 2018 Sistemas de datos - Rodrigo Colombo Vlaeminch
# Se utiliza como base el codigo del módulo l10n_es_aeat_mod303
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import models, fields, api, _

class L10nEsAeatMod420Report(models.Model):
    _inherit = "l10n.es.aeat.report.tax.mapping"
    _name = "l10n.es.aeat.mod420.report"
    _description = "AEAT 420 Report"
    _aeat_number = '420'
    
    def _default_counterpart_420(self):
        return self.env['account.account'].search([
            ('code', 'like', '4757%'),
        ])[:1]
    
    company_partner_id = fields.Many2one(
        comodel_name='res.partner', string="Partner",
        relation='company_id.partner_id', store=True)
    rectificacion_repercutida = fields.Float(
        string="[14] Rectifications to compensate", default=0,
        states={'done': [('readonly', True)]},
        help="Rectifications of tax rates passed on")
    total_devengado = fields.Float(
        string="[15] VAT payable", readonly=True, compute_sudo=True,
        compute='_compute_total_devengado', store=True)
    casilla_18 = fields.Float(
        string="[18] Agriculture and Livestock", default=0,
        states={'done': [('readonly', True)]},
        help="Compensations of the special regime of agriculture and livestock")
    casilla_19 = fields.Float(
        string="[19] Before the beginning", default=0,
        states={'done': [('readonly', True)]},
        help="Regularization of investments or fees paid before the start of the activity")
    casilla_20 = fields.Float(
        string="[20] Travellers", default=0,
        states={'done': [('readonly', True)]},
        help="Fees returned as travelers")
    rectificacion_soportada = fields.Float(
        string="[21] Rectification supported", default=0,
        states={'done': [('readonly', True)]},
        help="Rectifications of deducted supported installments")
    total_deducir = fields.Float(
        string="[22] VAT receivable", readonly=True, compute_sudo=True,
        compute='_compute_total_deducir', store=True) 
    diferencia = fields.Float(
        string="[23] Difference", readonly=True,
        compute='_compute_diferencia', store=True,
        help="Difference between payable and receivable")
    cuota_compensar = fields.Float(
        string="[24] Fees to compensate", default=0,
        states={'done': [('readonly', True)]},
        help="Fee to compensate for prior periods, in which his statement "
             "was to return and compensation back option was chosen")
    a_deducir = fields.Float(
        string="[25] To deduct", default=0,
        states={'done': [('readonly', True)]},
        help="Exclusively in complementary cases")
    resultado_liquidacion = fields.Float(
        string="[26] Settlement result", readonly=True,
        compute='_compute_resultado_liquidacion', store=True)
    result_type = fields.Selection(
        selection=[
            ('I', 'To enter'),
            ('D', 'To return'),
            ('C', 'To compensate'),
            ('N', 'No activity/Zero result'),
        ], string="Result type", compute='_compute_result_type')
    bank_account_id = fields.Many2one(
        comodel_name="res.partner.bank", string="Bank account",
        states={'done': [('readonly', True)]})
    counterpart_account_id = fields.Many2one(
        comodel_name='account.account', string="Counterpart account",
        default=_default_counterpart_420)
    allow_posting = fields.Boolean(string="Allow posting", default=True)
    
    
    @api.multi
    @api.depends('tax_line_ids', 'tax_line_ids.amount')
    def _compute_total_devengado(self):
        casillas_devengado = (7, 8, 9, 10, 11, 12, 13)
        for report in self:
            tax_lines = report.tax_line_ids.filtered(
                lambda x: x.field_number in casillas_devengado)
            report.total_devengado = sum(tax_lines.mapped('amount')) + report.rectificacion_repercutida

    @api.multi
    @api.depends('tax_line_ids', 'tax_line_ids.amount')
    def _compute_total_deducir(self):
        casillas_deducir = (16, 17)
        for report in self:
            tax_lines = report.tax_line_ids.filtered(
                lambda x: x.field_number in casillas_deducir)
            report.total_deducir = sum(tax_lines.mapped('amount')) + report.casilla_18 + report.casilla_19 + report.casilla_20 + report.rectificacion_soportada
            
    @api.multi
    @api.depends('total_devengado', 'total_deducir')
    def _compute_diferencia(self):
        for report in self:
            report.diferencia = (report.total_devengado - report.total_deducir)
                      
    @api.multi
    @api.depends('total_devengado')
    def _compute_resultado_liquidacion(self):
        for report in self:
            report.resultado_liquidacion = (
                report.total_devengado - report.total_deducir - report.cuota_compensar)
    
    @api.multi
    def _compute_allow_posting(self):
        for report in self:
            report.allow_posting = True
                            
    @api.multi
    @api.depends('resultado_liquidacion', 'period_type')        
    def _compute_result_type(self):
        for report in self:
            if report.resultado_liquidacion == 0:
                report.result_type = 'N'
            elif report.resultado_liquidacion > 0:
                report.result_type = 'I'
            else:
                if (report.period_type in ('4T', '12')):
                    report.result_type = 'D'
                else:
                    report.result_type = 'C'
             
#     @api.onchange('year', 'period_type')
#     def onchange_period_type(self):
#         super(L10nEsAeatMod303Report, self).onchange_period_type()
#         if self.period_type not in ('4T', '12'):
#             self.regularizacion_anual = 0
#  
#     @api.onchange('type')
#     def onchange_type(self):
#         if self.type != 'C':
#             self.previous_result = 0
            
    @api.multi
    def button_confirm(self):
        """Check records"""
        msg = ""
        for mod420 in self:
            if mod420.result_type == 'I' and not mod420.bank_account_id:
                msg = _('Select an account for making the charge')
            if mod420.result_type == 'D' and not mod420.bank_account_id:
                msg = _('Select an account for receiving the money')
        if msg:
            # Don't raise error, because data is not used
            # raise exceptions.Warning(msg)
            pass
        return super(L10nEsAeatMod420Report, self).button_confirm()
    