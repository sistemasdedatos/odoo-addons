# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import api, fields, models, tools, _


class AdrConfig(models.Model):
    _name = 'adr.config'
    _inherit = ['mail.thread']
    _description = "ADR Config"

    name = fields.Char(string="Name", required=True)
    package =  fields.Html(string="Package types")
    notes = fields.Html(string="Notes")
    max_weight = fields.Float(string="Max Weight")

    _sql_constraints = [('adr_config_name_unique', 'unique(name)', 'ADR Config already exists.')]


class AdrTemplate(models.Model):
    _name = 'adr.template'
    _inherit = ['mail.thread']
    _description = "ADR Template"

    name = fields.Char(string="Name", required=True)
    active = fields.Boolean(string="Active", default=True)
    description = fields.Text(string="Description", required=True)
    onu_code = fields.Char(string="ONU Code", required=True)
    adr_config_id = fields.Many2one(comodel_name="adr.config", string="ADR Config", required=True)
    product_tmpl_ids = fields.One2many(comodel_name='product.template', inverse_name='adr_id')
    product_count = fields.Integer(
        '# Products', compute='_compute_product_count',
        help="The number of products under this category (Does not consider the children categories)")

    _sql_constraints = [('adr_template_name_unique', 'unique(name)', 'ADR Template name already exists.')]

    # def _compute_product_count(self):
    #     for s in self:
    #         s.product_count = 10
        # read_group_res = self.env['product.template'].read_group([('categ_id', 'child_of', self.ids)], ['categ_id'],
        #                                                          ['categ_id'])
        # group_data = dict((data['categ_id'][0], data['categ_id_count']) for data in read_group_res)
        # for categ in self:
        #     product_count = 0
        #     for sub_categ_id in categ.search([('id', 'child_of', categ.id)]).ids:
        #         product_count += group_data.get(sub_categ_id, 0)
        #     categ.product_count = product_count
