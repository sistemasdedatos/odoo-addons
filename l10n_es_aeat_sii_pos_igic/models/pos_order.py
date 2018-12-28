# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import api, models, exceptions, _, fields
import json

class PosOrder(models.Model):
    _inherit = 'pos.order'

    def _iva_to_igic(self, dict):
        if self.company_id.state_id.code in ['TF', 'GC']:
            dict = json.loads(json.dumps(dict).replace("DetalleIVA","DetalleIGIC"))
            dict = json.loads(json.dumps(dict).replace("DesgloseIVA", "DesgloseIGIC"))
            dict = json.loads(json.dumps(dict).replace("ImporteTransmisionInmueblesSujetoAIVA",
                                                       "ImporteTransmisionInmueblesSujetoAIGIC"))
            dict = json.loads(json.dumps(dict).replace("PeriodoImpositivo", "PeriodoLiquidacion"))
        return dict

    def _send_soap(self, wsdl, port_name, operation, param1, param2):
        self.ensure_one()
        param2 = self._iva_to_igic(param2)

        #TODO: Comerciante minorista
        # if self.company_id.state_id.code in ['TF','GC'] \
        #         and self.fiscal_position_id.sii_registration_key_sale\
        #         and self.fiscal_position_id.sii_registration_key_sale.code != param2['FacturaExpedida']['ClaveRegimenEspecialOTrascendencia']:
        #     param2['FacturaExpedida']['ClaveRegimenEspecialOTrascendencia'] = self.fiscal_position_id.sii_registration_key_sale.code

        return super(PosOrder, self)._send_soap(wsdl, port_name, operation, param1, param2)

    @api.multi
    def _get_sii_out_taxes_minorista(self):
        print param

    @api.multi
    def _get_sii_out_taxes(self):
        res = super(PosOrder, self)._get_sii_out_taxes()
        #TODO: Comerciante minorista
        #if not res and self.company_id.state_id.code in ['TF', 'GC'] \
         #       and self.fiscal_position_id. :
          #  res = self._get_sii_out_taxes_minorista()

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
            return super(PosOrder, self)._get_sii_map()
