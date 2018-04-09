# -*- encoding: utf-8 -*-
#    Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
#    License AGPL-3 - See http://www.gnu.org/licenses/agpl-3.0
from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError

class MedicalRecord(models.Model):
    _name = 'medical.record'
    _inherit = ['mail.thread']
    _description = 'Medical record'
    _order = 'date desc'
    
    name = fields.Char(string = 'Description', required = True)
    date = fields.Datetime(string = 'Date', required = True)
    partner_id = fields.Many2one(comodel_name = 'res.partner', string = 'Patient', required = True)
    consultation_reason = fields.Text(string = 'Consultation reason')
    personal_antecedents = fields.Text(string = 'Personal antecedents')
    family_antecedents = fields.Text(string = 'Family antecedents')
    allergies = fields.Text(string = 'Allergies', help = 'Including medications')
    medicines = fields.Text(string = 'Medicines', help = 'Medications currently taken by the patient')
    anamnesis = fields.Text(string = 'Anamnesis')
    phisical_exploration = fields.Text(string = 'Phisical exploration')
    bmi = fields.Text(string = 'BMI', help = 'Body mass index')
    additional_test_ids = fields.One2many('medical.record.test', 'medical_record_id', string = 'Additional tests')
    diagnostic_guidance = fields.Text(string = 'Diagnostic guidance')
    therapeutic_indication = fields.Text(string = 'Therapeutic indication')
    preoperative = fields.Text(string = 'Preoperative')
    operating_room_date = fields.Datetime(string = 'Operating room date')
    postoperative = fields.Text(string = 'Postoperative')
    progress_ids = fields.One2many('medical.record.progress', 'medical_record_id', string = 'Progress')
    comments = fields.Text(string = 'Comments')
    
    @api.model
    def create(self, vals):
        return super(MedicalRecord, self.with_context(mail_create_nolog=True)).create(vals)

class MedicalRecordProgress(models.Model):
    _name = 'medical.record.progress'
    _description = 'Medical record progress'
    _order = 'date desc'
    
    name = fields.Char(string = 'Progress', required = True)
    date = fields.Date(string = 'Date', required = True)
    medical_record_id = fields.Many2one(comodel_name = 'medical.record', required = True)
    
class MedicalRecordProgress(models.Model):
    _name = 'medical.record.test'
    _description = 'Medical record test'
    _order = 'date desc'
    
    name = fields.Char(string = 'Test', required = True)
    date = fields.Date(string = 'Date', required = True)
    medical_record_id = fields.Many2one(comodel_name = 'medical.record', required = True)