import StringIO, hashlib, re, tempfile, xlrd
import os, base64
from openerp import fields, models, api, exceptions, _, tools
from openerp.fields import Field
from reportlab.graphics.barcode.eanbc import Ean13BarcodeWidget

class sd_excel_toimport (models.Model):
    _inherit = "sd.excel.toimport"
    
    @api.multi
    def model_catalog (self):
        return self.env['ir.model'].search ([('model', '=', 'product.template')])
        
    @api.multi
    def fields_catalog (self):
        model = self.env['ir.model'].search ([('model', '=', 'product.template')])
        return self.env['ir.model.fields'].search ([('model_id', '=', model.id), ('name', 'in', ['seller_code','name','standard_price','list_price'])])
    
    @api.multi
    def fields_in_catalog (self):
        model = self.env['ir.model'].search ([('model', '=', 'product.template')])
        return self.env['ir.model.fields'].search ([('model_id', '=', model.id), ('name', 'in', ['list_price'])])
    
    @api.multi
    def link_catalog (self):
        model = self.env['ir.model'].search ([('model', '=', 'product.template')])
        return self.env['ir.model.fields'].search ([('model_id', '=', model.id), ('name', 'in', ['seller_code'])])
          
    model_id = fields.Many2one(default = model_catalog)
    fields_ids = fields.Many2many (default = fields_catalog)
    fields_in_ids = fields.Many2many (default = fields_in_catalog)
    field_id = fields.Many2one (default = link_catalog)
    
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

        if ws.ncols <= 10:
            try:
                to_imp = []
                for i in self.fields_in_ids:
                    to_imp.append (i.id)
                for r in range (2, ws.nrows):
                    a = self.sd_excel_line_id.create ({'name': str (r),
                                                       'sd_excel_toimport_id': self.id})
                    aux = ''
                    code_pr = ''
                    if type(ws.cell (r,0).value) is float:  
                        code_pr = repr(ws.cell (r,0).value).split(".")[0]
                    else:
                        code_pr = ws.cell (r,0).value
                    aux = self.env[str (self.model_id.model)].search ([(self.field_id.name, '=', code_pr)]) #mas de un producto con ese codigo de proveedor
                    if len (aux) > 1:
                        raise exceptions.Warning (_ ('%s %s in row %s has multiple matches' % (code_pr, self.field_id.name, r)))
                    elif len (aux) <= 0:
                        aux = ''
                    #codigo proveedor
                    a.write ({'key2': code_pr,})
                    if self.fields_ids[2].id in to_imp:
                        if aux != '':
                            a.write ({'old_key2': str (aux[self.fields_ids[2].name])})
                            a.write ({})
                            a.write ({'ralation_model_id': aux.id})
                        else:
                            a.write ({'old_key2': _('Product not found')})
                    #nombre producto
                    a.write ({'key1': ws.cell (r,2).value,})
                    #precio coste
                    a.write ({'key3': ws.cell (r,3).value,})
                    #precio venta     
                    a.write ({'key0': ws.cell (r,4).value,})
                    if self.fields_ids[0].id in to_imp:
                        if aux != '':
                            a.write ({'old_key0': str (aux[self.fields_ids[0].name])})
                            a.write ({'ralation_model_id': aux.id})
                            a.write ({'old_key9': str(aux['discount'])})
                        else:
                            a.write ({'old_key0': _('Product not found')})
                            a.write ({'old_key9': _('- - - - - - - - -')})
                
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
                    arch = arch + "\n<field name='old_key9' string='%s'/>" % (_('old ') + 'Descuento')
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