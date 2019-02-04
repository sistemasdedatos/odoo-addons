# -*- coding: utf-8 -*-
# Copyright (c) 2019 Rodrigo Colombo - Sistemas de Datos S.L.
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo import api, models


class AccountInvoice(models.Model):
    _inherit = 'account.invoice'

    @api.multi
    def is_dua_sii_invoice(self):
        """
        :return:
        """
        self.ensure_one()
        if self.fiscal_position_id.name == u'Importación con DUA':
            if self.tax_line_ids.filtered(
                    lambda x: x.tax_id.description in
                    ['P_IGIC_IBC0', 'P_IGIC_IBC3', 'P_IGIC_IBC7',
                     'P_IGIC_IBC95','P_IGIC_IBC135','P_IGIC_IBC200',
                     'P_IGIC_IBI0','P_IGIC_IBI3', 'P_IGIC_IBI7','P_IGIC_IBI95',
                     'P_IGIC_IBI135','P_IGIC_IBI200','P_IGIC_IBC6_5','P_IGIC_IBI6_5']
            ):
                return True
        return False
