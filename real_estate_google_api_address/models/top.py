# -*- coding: utf-8 -*-
from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError
import googlemaps

class Top(models.Model):
    _inherit = "real.estate.top"

    def get_lat_long(self):
        google_maps_api_key = self.env['ir.config_parameter'].get_param('google_maps_api_key', default='')
        if google_maps_api_key != '' and self.city_id and self.address != '/' and not self.longitude and not self.latitude:
            dir = self.address
            if self.number:
                dir += ', ' + self.number
            dir += ', ' + self.city_id.display_name
            gmaps = googlemaps.Client(key=google_maps_api_key)
            geocode_result = gmaps.geocode(dir)[0]
            map = geocode_result.get('geometry', False).get('location', False)
            if map:
                self.longitude = map.get('lng')
                self.latitude = map.get('lat')
        else:
            return 0

    @api.multi
    def write(self, values):
        res = super(Top, self).write(values)
        if values.get('city_id', False) or values.get('address'):
            for top in self:
                top.get_lat_long()
        return res
