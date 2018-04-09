# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError

class ResPartner(models.Model):
    _inherit = 'res.partner'
    
    medical_record_count = fields.Integer(string='Medical records count', compute = '_compute_medical_record_count', groups='medical_record.group_medical_user')
    medical_record_ids = fields.One2many('medical.record', 'partner_id', string = 'Medical records', groups='medical_record.group_medical_user')
    
    def _compute_medical_record_count(self):
        medical_data = self.env['medical.record'].read_group(domain=[('partner_id', 'child_of', self.ids)],
                                                             fields=['partner_id'], groupby=['partner_id'])
        # read to keep the child/parent relation while aggregating the read_group result in the loop
        partner_child_ids = self.read(['child_ids'])
        mapped_data = dict([(m['partner_id'][0], m['partner_id_count']) for m in medical_data])
        for partner in self:
            # let's obtain the partner id and all its child ids from the read up there
            partner_ids = filter(lambda r: r['id'] == partner.id, partner_child_ids)[0]
            partner_ids = [partner_ids.get('id')] + partner_ids.get('child_ids')
            # then we can sum for all the partner's child
            partner.medical_record_count = sum(mapped_data.get(child, 0) for child in partner_ids)