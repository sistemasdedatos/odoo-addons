# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import fields, models, api, _
from odoo.exceptions import ValidationError

class LoyaltyPoint(models.Model):
    _name = 'loyalty.point'
      
    pos_id = fields.Many2one(comodel_name = 'pos.order',
                             string = 'Pos Order')
    partner_id = fields.Many2one(comodel_name = 'res.partner',
                                 string = 'Partner', ondelete = 'cascade')
    loyalty_program_id = fields.Many2one(comodel_name = 'loyalty.program',
                                         string = 'Loyalty Program', ondelete = 'restrict')
    active = fields.Boolean(string = 'Active', default = True)
    points = fields.Float(string = 'Loyalty Points',
                          help = 'The loyalty points the user won as '
                                 'part of a Loyalty Program')
    date_add = fields.Date(string = 'Date generation')
    date_end = fields.Date(string = 'Date disactivation')
    available_points = fields.Float(string = 'Available Points')

    @api.constrains('available_points')
    def _check_available_points(self):
        for record in self:
            if record.points > 0 and record.available_points > record.points:
                raise ValidationError(_("You cannot have more points available than those generated in the purchase: %s" % record.pos_id.name))
