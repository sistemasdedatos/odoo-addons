import StringIO, hashlib, re, tempfile, xlrd
import os, base64
from openerp import fields, models, api, exceptions, _, tools
from openerp.fields import Field
from reportlab.graphics.barcode.eanbc import Ean13BarcodeWidget

class sd_excel_line (models.TransientModel):
    _name = "sd.excel.line"
    _transient_max_hours = 168.0
    name = fields.Char (string = "Name", readonly = True)
    ralation_model_id = fields.Integer (string = "Relation model to import")
    sd_excel_toimport_id = fields.Many2one ('sd.excel.toimport', string = "To import", readonly = True)
    state = fields.Selection (string = "State", related = 'sd_excel_toimport_id.state', readonly = True)
    key0 = fields.Char (string = 'key0')
    key1 = fields.Char (string = 'key1')
    key2 = fields.Char (string = 'key2')
    key3 = fields.Char (string = 'key3')
    key4 = fields.Char (string = 'key4')
    key5 = fields.Char (string = 'key5')
    key6 = fields.Char (string = 'key6')
    key7 = fields.Char (string = 'key7')
    key8 = fields.Char (string = 'key8')
    key9 = fields.Char (string = 'key9')
    old_key0 = fields.Char (string = 'old_key0')
    old_key1 = fields.Char (string = 'old_key1')
    old_key2 = fields.Char (string = 'old_key2')
    old_key3 = fields.Char (string = 'old_key3')
    old_key4 = fields.Char (string = 'old_key4')
    old_key5 = fields.Char (string = 'old_key5')
    old_key6 = fields.Char (string = 'old_key6')
    old_key7 = fields.Char (string = 'old_key7')
    old_key8 = fields.Char (string = 'old_key8')
    old_key9 = fields.Char (string = 'old_key9')
     
class sd_excel_toimport (models.Model):
    _name = "sd.excel.toimport"
    _inherit = ['mail.thread', 'ir.needaction_mixin']
    
    name = fields.Char (string = "Description", required = True)
    state = fields.Selection (string = "State", selection = [('0', 'Draft'),
                                                             ('1', 'In progress'),
                                                             ('2', 'Imported/Done')], default = '0', required = True, readonly = True)

    model_id = fields.Many2one('ir.model', required='True', string='Select Model', help = "Type of model odoo to import")
    fields_ids = fields.Many2many ('ir.model.fields', 'ir_model_fields_sd_excel_toimport_fields', string = "To_read", depends = 'model_id', domain="[('model_id','=',model_id)]", required = True, help = "Columns from read of excel document, the order must match")
    fields_in_ids = fields.Many2many ('ir.model.fields', 'ir_model_fields_sd_excel_toimport_fields_in', string = "To import", domain="[('id','in',fields_ids[0][2]),('id','!=',field_id)]", help = "Columns from import of excel document")
    field_id = fields.Many2one ('ir.model.fields', depends = 'fields_ids', string = "Link to import", domain="[('id','in',fields_ids[0][2]),('name','in',['default_code','ref','vat','name','seller_code','ean13','email'])]", help = "Field to link between Excel and Odoo Model")
    file = fields.Binary (string = "Excel document (XLS)", help = "Document in .xls format", default = None, copy = False)
    sd_excel_line_id = fields.One2many ('sd.excel.line', 'sd_excel_toimport_id', string = "Lines to import", readonly = True)
    view_ref_id = fields.Many2one ('ir.ui.view', string = "view_ref", default = None)
    not_found = fields.Boolean (string = "Import product not found", help = "if the field is true, the not found products are created, otherwise only overwrite existing", default = False)
    auto_create = fields.Boolean (string = "Auto create", help = "If you activate this selection, the products that not created are created automaticly", default = False)
    customer = fields.Boolean (string = 'Is customer', default = False)
    supplier = fields.Boolean (string = 'Is supplier', default = False)
    
    
    @api.model
    def create (self, vals):
        res = super (sd_excel_toimport, self).create (vals)
        res.message_post (body = _("Excel import %s with name %s created" % (res.id, res.name)))
        return res
    @api.multi    
    def copy (self, default):
        default['name'] = _("%s (copy)") % self.name
        default['view_ref_id'] = None
        return super(sd_excel_toimport, self).copy (default)
        
    @api.multi
    def unlink (self):
        res = []
        for i in self:
            if i.state == '2':
                raise exceptions.Warning (_("You can't delete a import done"))
            elif i.state == '1':
                i.pool.get ('ir.ui.view').browse (i._cr, i._uid, [i.view_ref_id.id]).sudo ().unlink ()
                i.sd_excel_line_id.sudo ().unlink ()
            res.append (super (sd_excel_toimport, i).unlink ())
        return res
            
    @api.multi
    def button_read (self):
        in_progress = super (sd_excel_toimport, self).search ([('state','=','1')])
        if len (in_progress) > 0:
            msg = ''
            for i in in_progress:
                msg += str (i.name) + ' ' 
            raise exceptions.Warning (_("You must complete or delete the import %s\nThere can only be an import in progress" % msg))
        if len (self.field_id) == 1 and self.file != None and len (self.fields_in_ids) != 0:
            if self.model_id.model == "product.template":
                return self.read_excel ()
            elif self.model_id.model == "res.partner":
                return self.read_excel (True)
        elif len (self.field_id) == 0:
            raise exceptions.Warning (_("Error on Document Type\nPlease, Select link to import"))
        elif len (self.fields_in_ids) == 0:
            raise exceptions.Warning (_("Error on Document Type\nPlease, Insert fields to import"))
        elif self.file == None:
            raise exceptions.Warning (_("Error on Document Type\nPlease, Insert Excel document"))
        else:
            raise exceptions.Warning (_("Error on Document Type"))
        
    @api.multi
    def button_import (self):
        res = self.write_data ()
        if res == True:
            self.message_post (body = _("Document %s imported" % self.name))
            self.state = "2"
            self.pool.get ('ir.ui.view').browse (self._cr, self._uid, [self.view_ref_id.id]).sudo ().unlink ()   
        return res
    @api.multi
    def button_back (self):
        try:
            if self.state == '1':
                self.pool.get ('ir.ui.view').browse (self._cr, self._uid, [self.view_ref_id.id]).sudo ().unlink ()
                self.sd_excel_line_id.unlink ()
                self.message_post (body = _("Document %s change state -> Draft" % self.name))
                self.state = "0"
        except:
            raise exceptions.Warning (_("Error on delete"))
        
    @api.multi
    def read_excel (self, partner = False):
        try:
            file_path = tempfile.gettempdir () + '/' + str (self._cr.dbname) + str (self._uid) + '.xls'
            f = open (file_path, 'wb')
            f.write (self.file.decode ('base64'))
            f.close ()
            wb = xlrd.open_workbook (file_path)
            ws = wb.sheet_by_index (0)
        except:
            raise exceptions.Warning (_("Error on read Excel"))
        if len (self.fields_ids) == ws.ncols and ws.ncols <= 10:
            try:
                to_imp = []
                for i in self.fields_in_ids:
                    to_imp.append (i.id)
                for r in range (1, ws.nrows):
                    a = self.sd_excel_line_id.create ({'name': str (r),
                                                       'sd_excel_toimport_id': self.id})
                    aux = ''
                    for c in range (ws.ncols):
                        if self.field_id.name == self.fields_ids[c].name:
                            aux = self.env[str (self.model_id.model)].search ([(self.field_id.name, '=', ws.cell (r,c).value)])
                            if len (aux) > 1:
                                raise exceptions.Warning (_ ('%s %s in row %s has multiple matches' % (ws.cell (r,c).value, self.field_id.name, r)))
                            elif len (aux) <= 0:
                                aux = ''
                            break
                    for c in range(ws.ncols):
                        a.write ({'key%d' % c: ws.cell (r,c).value,})
                        if self.fields_ids[c].id in to_imp:
                            if aux != '':
                                a.write ({'old_key%d' % c: str (aux[self.fields_ids[c].name])})
                                a.write ({'ralation_model_id': aux.id})
                            else:
                                a.write ({'old_key%d' % c: _('Product not found')})
                
                self.message_post (body = _("Read Excel document %s" % self.name))
                return self.view_create (to_imp)
            except:
                raise exceptions.Warning (_("Error on write excel in sd_excel_line table"))
        else:
            raise exceptions.Warning (_("The columns of excel and number of fields don't match"))
           
    
    def view_create (self, to_imp):
        try:
            arch = """<?xml version="1.0"?>
                        <tree string="Excel Import">"""
            
            for c in range (len (self.fields_ids)):
                arch = arch + "\n<field name='key%d' string='%s'/>" % (c, self.fields_ids[c].field_description)
                if self.fields_ids[c].id in to_imp:
                    arch = arch + "\n<field name='old_key%d' string='%s'/>" % (c, _('old ') + self.fields_ids[c].field_description)
            arch = arch + "\n</tree>"
            self.view_ref_id = self.env['ir.ui.view'].sudo().create ({'name': 'view.excel.line.tree',
                                                                      'arch': arch,
                                                                      'priority': 16,
                                                                      'mode': 'primary',
                                                                      'active': 1,
                                                                      'model': 'sd.excel.line',
                                                                      'type': 'tree'})
            self.state = "1"
            return {
                    'type': 'ir.actions.act_window',
                    'res_model': 'sd.excel.toimport',
                    'view_type': 'form',
                    'view_mode': 'form',
                    'auto_refresh':1,
                    'res_id': self.id,
                    }
        except:
            raise exceptions.Warning (_("Error on view_create"))
    
    @api.multi
    def write_data (self):
        to_imp = []
        for i in self.fields_in_ids:
            to_imp.append (i.id)
        for line in self.sd_excel_line_id:
            if line.ralation_model_id:
                try:
                    key_count = 0
                    model_to_in = self.pool.get (str (self.model_id.model)).browse (self._cr, self._uid, [line.ralation_model_id])
                    for fiel in self.fields_ids:
                        if fiel.id in to_imp:
                            clave = 'key%d' % key_count
                            model_to_in.write ({str (fiel.name): line[clave]})
                        key_count += 1
                except:
                    raise exceptions.Warning (_('Error to write in %s %s' % (self.model_id.model, model_to_in.name)))
            elif self.not_found:
                try:
                    if self.auto_create:
                        key_count = 0
                        model_to_create = self.env[str (self.model_id.model)].create ({'name': 'temp'})
                        line.ralation_model_id = model_to_create.id
                        for fiel in self.fields_ids:
                            clave = 'key%d' % key_count
                            model_to_create.write ({fiel.name: line[clave]})
                            key_count += 1
                        self.message_post (body = _("Created product %s" % model_to_create.name))
                    else:
                        key_count = 0
                        model_to_create = self.env[str (self.model_id.model)].create ({'name': 'temp'})
                        line.ralation_model_id = model_to_create.id
                        for fiel in self.fields_ids:
                            clave = 'key%d' % key_count
                            model_to_create.write ({fiel.name: line[clave]})
                            key_count += 1
                        self.message_post (body = _("Created product %s" % model_to_create.name))
                        return {'name': str (self.model_id.name),
                                'type': 'ir.actions.act_window',
                                'res_model': str (self.model_id.model),
                                'view_type': 'form',
                                'view_mode': 'form',
                                'target': 'new',
                                'auto_refresh':1,
                                'res_id': model_to_create.id,
                                'flags': {'action_buttons': True},
                                }
                except:
                    raise exceptions.Warning (_('Error to create in %s %s' % (self.model_id.model, model_to_in.name))) 
        return True
sd_excel_toimport ()