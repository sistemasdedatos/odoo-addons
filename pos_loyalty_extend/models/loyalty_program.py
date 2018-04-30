# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0

from odoo import fields, models, api, _
from datetime import date, datetime, timedelta
from odoo.exceptions import UserError, ValidationError
from dateutil.relativedelta import relativedelta
import math

_intervalTypes = {
    'days': lambda interval: relativedelta(days = interval),
    'weeks': lambda interval: relativedelta(days = 7 * interval),
    'months': lambda interval: relativedelta(months = interval),
}

class LoyaltyProgram(models.Model):
    _inherit = 'loyalty.program'
    
    ir_cron_id = fields.Many2one(comodel_name = 'ir.cron', readonly = True, ondelete = 'cascade')
    rounding_type = fields.Selection(selection = [('truncated', 'Truncated'), 
                                                  ('symmetrical', 'Symmetrical')],
                                     string = 'Rounding Type', default = 'symmetrical',
                                     help = _("Type of rounding to be applied to point of sale tickets\n"
                                              "-Symmetrical: Conventional rounding, between 0 and 4 is left as is and between 5 and 9 is added 1\n"
                                              "-Truncated: Values that we do not want are despised"))
    point_expired_type = fields.Selection(selection = [('points', 'Based on points'),
                                                       ('date', 'Based on dates'),
                                                       ('no', 'Do not expire')], string = 'Type of expiration', required = True, default = 'no',
                                          help = _("Points Expiration Mode\n"
                                                   "-Based on points: Each point has a validity period.\n"
                                                   "-Based on dates: A specific date is set and all points are discounted.\n"
                                                   "-Do not expire: Points do not expire."))
    exp_type_date = fields.Date(string = 'Next Expiration date')
    exp_type_points_value_rec = fields.Integer(string = 'Recurrence value')
    exp_type_points_type_rec = fields.Selection(selection = [('days', 'Days'),
                                                             ('weeks', 'Weeks'),
                                                             ('months', 'Months')], string = 'Recurrence type')
    points_ids = fields.One2many('loyalty.point', 'loyalty_program_id', readonly = True)
    refund_point_rule = fields.Selection(selection = [('all_points', 'All points'),
                                                      ('prev_points', 'Previous points'),
                                                      ('no', 'Not refund')], default = 'no', required = True, string = 'Refund rule',
                                         help = _("Policy to be used to discount points for returns:\n"
                                                  "-All points: The discount points will be passed on to all points (stored and future), in this case, a customer may have negative balances of points.\n"
                                                  "-Previous points: Points will be deducted from orders dated prior to or equal to the order being returned. If there are no points, nothing will be deducted.\n"
                                                  "-Not refund: Returns do not discount points")) 
     
    def discount_prev_points(self, point):
        self.disable_points(point)
        point.available_points = 0
        discount_number = abs(point.points)
        to_discount = self.points_ids.search([('active', '=', True), ('loyalty_program_id', '=', self.id), ('partner_id', '=', point.partner_id.id), ('date_add', '<=', point.date_add)])
        for p in to_discount:
            if p.available_points <= discount_number:
                discount_number = discount_number - p.available_points
                p.available_points = 0
                self.disable_points(p)
            else:
                p.available_points = p.available_points - discount_number
                discount_number = 0
            if discount_number <= 0:
                break
            
    def disable_points(self, points):
        try:
            for point in points:
                point.active = False
                point.date_end = fields.Date.today()
            return True
        except Exception:
            return False
    
    @api.multi
    def disable_points_masive(self, id, date_to_disable = datetime.now()):
        if len(self) == 0 and id:                                   #called from cron
            self = self.env['loyalty.program'].browse([int(id)])
            date_to_disable = self.ir_cron_id.nextcall[:10]
        for record in self:
            try:
                if record.point_expired_type == 'date':
                    points_to_disable = self.env['loyalty.point'].search([('active', '=', True),
                                                                          ('loyalty_program_id', '=', record.id),
                                                                          ('date_add', '<', date_to_disable)])
                    record.exp_type_date = record.ir_cron_id.nextcall[:10]
                elif record.point_expired_type == 'points':
                    points_to_disable = self.env['loyalty.point'].search([('active', '=', True),
                                                                          ('loyalty_program_id', '=', record.id),
                                                                          ('date_add', '<=', date_to_disable - relativedelta(**{record.exp_type_points_type_rec: record.exp_type_points_value_rec}))])
                return record.disable_points(points_to_disable)
            except Exception:
                raise ValidationError(_("Error when desactivating the points."))
        return True
    
    @api.model
    def create(self, vals):
        res = super(LoyaltyProgram, self).create(vals)
        if res.point_expired_type != 'no':
            point_expired = {'date': {'date': res.exp_type_date,
                                      'frecuency': res.exp_type_points_value_rec,
                                      'type': res.exp_type_points_type_rec} if res.exp_type_date else False,
                             'points': {'date': datetime.now() + relativedelta(days = 1),
                                        'frecuency': 1,
                                        'type': 'days'}}
            res.ir_cron_id = self.env['ir.cron'].create({'name': 'Expired points %s' % res.name,
                                                         'interval_number': point_expired[res.point_expired_type]['frecuency'],
                                                         'interval_type': point_expired[res.point_expired_type]['type'],
                                                         'numbercall': -1,
                                                         'nextcall': point_expired[res.point_expired_type]['date'],
                                                         'model': 'loyalty.program',
                                                         'function': 'disable_points_masive',
                                                         'args': "(%d,)" % res.id})
        return res

    @api.multi
    def write(self, vals):
        res = super(LoyaltyProgram, self).write(vals)
        for record in self:
            if record.point_expired_type != 'no':
                if sum(map(lambda x: x in vals.keys(), ['point_expired_type', 'exp_type_date', 'exp_type_points_value_rec', 'exp_type_points_type_rec'])):
                    point_expired = {'date': {'date': record.exp_type_date,
                                              'frecuency': record.exp_type_points_value_rec,
                                              'type': record.exp_type_points_type_rec},
                                     'points': {'date': datetime.now() + relativedelta(days = 1),
                                                'frecuency': 1,
                                                'type': 'days'}}
                    if record.ir_cron_id:
                        record.ir_cron_id.write({'interval_number': point_expired[record.point_expired_type]['frecuency'],
                                                 'interval_type': point_expired[record.point_expired_type]['type'],
                                                 'nextcall': point_expired[record.point_expired_type]['date']})
                    else:
                        record.ir_cron_id = self.env['ir.cron'].create({'name': 'Expired points %s' % record.name,
                                                                        'interval_number': point_expired[record.point_expired_type]['frecuency'],
                                                                        'interval_type': point_expired[record.point_expired_type]['type'],
                                                                        'numbercall': -1,
                                                                        'nextcall': point_expired[record.point_expired_type]['date'],
                                                                        'model': 'loyalty.program',
                                                                        'function': 'disable_points_masive',
                                                                        'args': "(%d,)" % record.id})
            elif record.ir_cron_id:
                record.ir_cron_id.unlink()
        return res
    
    @api.multi
    def unlink(self):
        for record in self:
            if record.ir_cron_id:
                record.ir_cron_id.unlink()
        return super(LoyaltyProgram, self).unlink()