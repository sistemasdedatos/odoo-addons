# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import api, fields, models, tools, _


class ProductTemplate(models.Model):
    _inherit = 'product.template'

    adr_id = fields.Many2one(comodel_name='adr.template', string='ADR Template')
    adr_uom_id = fields.Many2one(comodel_name='product.uom', string='Unit of mesure', help=_('Unit of measure for ADR report'))
    adr_uom_equal = fields.Float(string='Equal', help=_('Equal for unit of measure to calculate in picking'))
