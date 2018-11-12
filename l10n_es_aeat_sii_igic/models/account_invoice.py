# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import api, models, fields, exceptions, _
import json

class AccountInvoice(models.Model):
    _inherit = 'account.invoice'

    def _iva_to_igic(self, dict):
        if self.company_id.state_id.code in ['TF', 'GC']:
            dict = json.loads(json.dumps(dict).replace("DetalleIVA","DetalleIGIC"))
            dict = json.loads(json.dumps(dict).replace("DesgloseIVA", "DesgloseIGIC"))
            dict = json.loads(json.dumps(dict).replace("ImporteTransmisionInmueblesSujetoAIVA", "ImporteTransmisionInmueblesSujetoAIGIC"))
            dict = json.loads(json.dumps(dict).replace("PeriodoImpositivo", "PeriodoLiquidacion"))
        return dict

    @api.multi
    def _get_sii_out_taxes(self):
        res = super(AccountInvoice, self)._get_sii_out_taxes()
        res = self._iva_to_igic(res)
        return res

    @api.multi
    def _get_sii_in_taxes(self):
        res = super(AccountInvoice, self)._get_sii_in_taxes()
        res = self._iva_to_igic(res)
        return res

    @api.multi
    def _get_invoices(self):
        res = super(AccountInvoice, self)._get_invoices()
        res = self._iva_to_igic(res)
        return res

    @api.multi
    def _get_sii_map(self):
        self.ensure_one()
        if self.company_id.state_id.code in ['TF','GC']:
            state_id = self.env.ref('base.state_es_tf').id
            sii_map_obj = self.env['aeat.sii.map']
            sii_map_line_obj = self.env['aeat.sii.map.lines']
            sii_map = sii_map_obj.search(
                [('state', '=', state_id),
                 '|',
                 ('date_from', '<=', fields.Date.today()),
                 ('date_from', '=', False),
                 '|',
                 ('date_to', '>=', fields.Date.today()),
                 ('date_to', '=', False)], limit=1)
            if not sii_map:
                raise exceptions.Warning(_(
                    'SII Map not found. Check your configuration'))
            return sii_map
        else:
            return super(AccountInvoice, self)._get_sii_map()
