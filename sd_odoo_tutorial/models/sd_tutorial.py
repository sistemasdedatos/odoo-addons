# -*- coding: utf-8 -*-
from openerp import models, fields, api
from openerp.tools.translate import _
from openerp.exceptions import Warning

class sd_tutorial (models.Model):
     _name = 'sd.tutorial'
     _order='sequence asc'
     
     @api.depends('url')
     def compute_iframe(self):
        #embed normal video url
        for record in self:
            if record.url and "watch?v=" in record.url:
                url = record.url.replace("watch?v=", "embed/")
                url = url + "?rel=0"
                record.iframe = "<iframe width='%s' height='500' src='%s' frameborder='1' allowfullscreen></iframe>" % ("100%", url)
     
     name = fields.Char (string = "Name", required = True, translate = True)
     description = fields.Char (string = "Description", required = True, translate =True)
     type_id = fields.Many2one ('sd.tutorial.types', string = 'Type', required = True)
     url = fields.Char (string = "Link", required = True)
     sequence = fields.Integer (string = "Sequence", required = True, default = 100)
     iframe = fields.Text (string = "Video Link", compute= "compute_iframe", readonly = True)

     
class sd_tutorial_types (models.Model):
     _name = 'sd.tutorial.types'
     _order='sequence asc'
     
     name = fields.Char (string = "Type", required = True, translate=True)
     description = fields.Char (string = "Description", required = True, translate=True)
     sequence = fields.Integer (string = "Sequence", required= True)