from openerp import models, fields
from openerp import api
from openerp.exceptions import Warning 
from openerp.tools.translate import _
import ftplib
import os
from subprocess import call
import time
import openerp.addons.decimal_precision as dp


class sd_ftp_config (models.Model):
    _name = 'sd.ftp_config'
    
    name = fields.Char (string = 'Description', required=True)
    user = fields.Char (sting = 'User')
    passw = fields.Char (string = 'Password')
    dir = fields.Char (string = 'Directory')
    server = fields.Char (string = 'Server', required=True)
    supplier_id = fields.Many2one ('res.partner', string = "Supplier", domain="[('supplier','=',True)]", ondelete = 'restrict')
    state = fields.Selection (string = 'State', selection = [('0', 'Draft'),
                                                             ('1', 'Configured')], default='0', readonly = True, copy=False)
    @api.multi
    def to_configured (self):
        try :
            ftp = ftplib.FTP (self.server, self.user, self.passw)
            ftp.cwd (self.dir)
            ftp.quit ()
            self.state = '1'
        except:
            raise Warning(_("ERROR\nConnection FTP failed, Server not correct configured"))
            return False
    
    @api.multi
    def to_draft (self):
        self.state = '0'
        
sd_ftp_config ()

class sd_ftp_import (models.Model):
    _name = 'sd.ftp_import'
    _inherit = ['mail.thread', 'ir.needaction_mixin']
     
    name = fields.Char (string = 'Number', size = 6, required = True, help = "Document number that you wish import")
    date = fields.Selection (string = 'Date', selection = [('14', '2014'),
                                                           ('15', '2015'),
                                                           ('16', '2016'),
                                                           ('17', '2017'),
                                                           ('18', '2018')], required = True, default = '16', help = "Document year that you wish import")
    type = fields.Selection (string = 'Document', selection=[('FA', 'Factura'),
                                                             ('AB', 'Abono'),
                                                             ('FR', 'Rectificativa'),
                                                             ('A', 'Albaran'),
                                                             ('FP', 'Presupuesto')], default='FA', required = True, help = "Document type that you wish import")
    ftp_config_id = fields.Many2one ('sd.ftp_config', string = 'Server', default = 1, required = True, help = "Server configuration", ondelete = 'restrict', domain="[('state','=','1')]")
    state = fields.Selection (string = 'State', selection = [('0', 'Draft'),
                                                             ('1', 'Imported'),
                                                             ('3', 'Imported'),
                                                             ('2', 'Done')], default='0', readonly = True, copy=False)
    office = fields.Char (string = 'Office', size = 3, default = '000', required = True)
    purchase_id = fields.Many2one ('purchase.order', string = "Purchase order", readonly = True)
    ftp_import_lines_id = fields.One2many ('sd.ftp_import.lines', 'ftp_import_id', string = 'Product imported', ondelete='cascade')
    head_document = fields.Char (string = 'Name document', readonly = True)
    head_date = fields.Date (string = 'Date document', readonly = True)
    dto1 = fields.Float (string = 'Dto1. %', readonly = True)
    dto2 = fields.Float (string = 'Dto2. %', readonly = True)
    dto3 = fields.Float (string = 'Dto3. %', readonly = True)
    auto_create = fields.Boolean (string = "Auto create", default = False, help = "If you activate this selection, the products that not created are created automaticly, but the internal reference and sale price don't insert in the program")
    supplier_id = fields.Many2one (string = "Supplier", related = 'ftp_config_id.supplier_id', readonly = True)
    
    @api.multi
    def unlink (self):
        if self.state == '2':
            raise Warning (_("You can't delete a import done"))
        return super (sd_ftp_import, self).unlink()
    
    @api.onchange('name')
    def number_exist (self):
        if (self.name):
            a = ''
            for i in range (6 - len (self.name)):
                a += '0'
            self.name = a + self.name
            names = super(sd_ftp_import, self).search([('name','=',self.name),('date','=',self.date),('office','=',self.office),('type','=',self.type)]).read(['name'])
            if len (names) != 0:
                raise Warning(_("Caution\nThe import %s already exist" % str(self.name)))
    
    @api.model
    def create (self, vals):
        res = super (sd_ftp_import, self).create (vals)
        res.message_post (body = _("Import %s created" % res.id))
        return res
    
    @api.multi
    def import_purchase (self):
        a = ''
        for i in range (3 - len (self.office)):
            a += '0'
        self.office = a + self.office
        a = ''
        for i in range (6 - len (self.name)):
            a += '0'
        self.name = a + self.name
            
        ftp_server = self.ftp_config_id.server
        ftp_usr = self.ftp_config_id.user
        ftp_pass = self.ftp_config_id.passw
        ftp_dir = self.ftp_config_id.dir
        ftp_file = self.type + self.name + self.office + self.date + '.TXT'         #Nombre del fichero a descargar
        file_name = ftp_usr+'_'+time.strftime ("%d-%m-%y_%H:%M_")+str (ftp_file)     #Nombre del fichero a guardar: usuario_fecha_hora_documento.txt
        os.chdir ('/home/odoo/ODOO/odoo80/bin/sdatos/sd_ftp_import/files_import')                     #No situamos en el directorio del modulo
   
#       os.chdir ('/data/odoo/srv/sdatos/sd_ftp_import/files_import')  # para softlayer y la maquina 49
#       os.chdir ('/opt/odoo/server/odoo80/sdatos/sd_ftp_import/files_import')  # para la maquina 9
   
        if not os.path.exists (ftp_usr):
            os.makedirs (ftp_usr)                                                   #Si no existe el directorio del usuario lo creamos
          
        #Descargamos el fichero del FTP y lo guardamos en un fichero
        try :
            ftp = ftplib.FTP (ftp_server, ftp_usr, ftp_pass)
            ftp.cwd (ftp_dir)
            tmp = open (ftp_usr+'/'+file_name, 'w')
            ftp.retrbinary ('RETR '+ ftp_file, tmp.write)
            tmp.close ()
            ftp.quit ()
            if (self.auto_create):
                self.state = '1'
            else:
                self.state = '3'
        except:
            raise Warning (_("ERROR\nConnection FTP failed, file %s doesn't exist" %ftp_file ))
            return False
        #Leemos el fichero descargado y lo guardamos en un string
        tmp2 = open (ftp_usr+'/'+file_name, 'r')
        file = tmp2.read ()
        tmp2.close ()
          
        #Guardamos el string en un dichionario indexado por filas
        file = file.splitlines (True)
        lines = {}
        cnt = 0
        for i in file:
            lines[cnt] = i.strip ()
            cnt += 1
         
        self.head_document = lines[0][9:29]
        self.head_date = fields.Date.from_string (lines[0][5:9]+'-'+lines[0][3:5]+'-'+lines[0][1:3])
        self.dto1 = float (lines[0][29:32]+'.'+lines[0][32:34])
        self.dto2 = float (lines[0][34:37]+'.'+lines[0][37:39])
        self.dto3 = float (lines[0][39:42]+'.'+lines[0][42:44])
         
        for i in range (1, cnt):
            self.ftp_import_lines_id.create ({'ftp_import_id': self.id,
                                              'name': str (lines[i][1:13]).strip (), 
                                              'description': lines[i][44:84],
                                              'units': float (lines[i][85:92]+'.'+lines[i][92:95]),
                                              'price': float (lines[i][95:102]+'.'+lines[i][102:106]),
                                              'dto1': float (lines[i][106:109]+'.'+lines[i][109:111]),
                                              'dto2': float (lines[i][111:114]+'.'+lines[i][114:116]),
                                              'ean': lines[i][31:44],
                                              'tax': str (int (lines[i][135:140])),
                                              })
         
        self.message_post(body=_("Importado documento %s" %self.head_document))
        return True
    
    @api.multi
    def create_product (self):
        try:
            ids_codigo = []
            for a in self.env['product.supplierinfo'].search ([['name','=',self.ftp_config_id.supplier_id.id]]):
                ids_codigo.append(a.product_code)
            no_products_ids = self.env['sd.ftp_import.lines'].search ([['ftp_import_id','=',self.id], ['name','not in', ids_codigo]])
            if len (no_products_ids) != 0:
                a = self.env['product.template'].create ({'name': no_products_ids[0].description,
                                                          'type': 'product',
                                                          'cost_method': 'average'
                                                        })
                if len (no_products_ids[0].ean.strip ()) > 0:
                    a.write ({'ean13': no_products_ids[0].ean})
                
                self.env['product.supplierinfo'].create ({'name': self.ftp_config_id.supplier_id.id,
                                                          'product_code': no_products_ids[0].name,
                                                          'product_tmpl_id': a.id,
                                                          'product_name': no_products_ids[0].description})
                no_products_ids[0].product_id = a.id
                if len (no_products_ids) == 1:
                    self.state = '1'
                return {
                    'name': a.name,
                    'type': 'ir.actions.act_window',
                    'res_model': 'product.template',
                    'view_type': 'form',
                    'view_mode': 'form',
                    'target': 'new',
                    'auto_refresh':1,
                    'res_id': a.id,
                    'flags': {'action_buttons': True},
                }
                
            else:
                self.state = '1'
        except:
            raise Warning (_("Create product ERROR!\nOn product %s\nEAN: %s\nCompruebe que no esta creado" % (no_products_ids[0].description, no_products_ids[0].ean)))

    @api.multi
    def sincronize_purchase (self):
        codes_product = []
        for codes in self.ftp_import_lines_id:
            codes_product.append (codes.name)           # codigos de los productos importados
            if self.env['product.supplierinfo'].search ([['name','=',self.ftp_config_id.supplier_id.id], ['product_code','=', codes.name]]):
                codes.product_id = self.env['product.supplierinfo'].search ([['name','=',self.ftp_config_id.supplier_id.id], ['product_code','=', codes.name]]).product_tmpl_id.id
            
        ids_codigo = []
        for a in self.env['product.supplierinfo'].search ([['name','=',self.ftp_config_id.supplier_id.id]]):
            ids_codigo.append (a.product_code)
        
        no_products_ids = self.env['sd.ftp_import.lines'].search ([['ftp_import_id','=',self.id], ['name','not in', ids_codigo]])
        try:
            if len (no_products_ids) != 0 and self.auto_create:
                for i in no_products_ids:
                    a = self.env['product.template'].create ({'name': i.description,
                                                              'type': 'product',
                                                              'cost_method': 'average'
                                                             })
                    if len (i.ean.strip ()) > 0:
                        a.write ({'ean13': i.ean})
                        
                    self.env['product.supplierinfo'].create ({'name': self.ftp_config_id.supplier_id.id,
                                                              'product_code': i.name,
                                                              'product_tmpl_id': a.id,
                                                              'product_name': i.description})
                    i.product_id = a.id
            elif len (no_products_ids) != 0:
                a = ''
                for i in no_products_ids:
                    a += i.description + ', '
                raise Warning (_("Producto %s don't create" % a))
                return False
        except:
            raise Warning (_("Autocreate Error on product: [%s] %s\n compruebe que no esta creado" % (i.name, i.description)))
        
        DTO1 = self.dto1 / 100
        DTO2 = self.dto2 / 100
        DTO3 = self.dto3 / 100

        purchase = self.env['purchase.order'].create ({'name': self.env['ir.sequence'].get ('purchase.order') or '/',
                                                       'date_order': fields.Datetime.now (),
                                                       'partner_id': self.ftp_config_id.supplier_id.id,
                                                       'origin': 'Importacion '+str (self.id),
                                                       'partner_ref': str (self.type) + str (self.name) + str (self.office) + str (self.date),
                                                       'location_id': self.pool.get ('stock.location').search (self._cr, self._uid, [['name','=','Stock']])[0],
                                                       'picking_type_id': self.pool.get ('stock.picking.type').search (self._cr, self._uid, [['name','=','Receipts']])[0],
                                                       'company_id': self.create_uid.company_id.id,
                                                       'invoice_method': 'order',
                                                       'currency_id':self.pool.get ('res.currency').search (self._cr, self._uid, [['name','=','EUR']])[0],
                                                       'pricelist_id': self.pool.get ('product.pricelist').search(self._cr, self._uid, [['name','=','Default Purchase Pricelist']])[0],
                                                       })
        self.purchase_id = purchase.id
         
         
          
        for pur in self.env['sd.ftp_import.lines'].search ([['ftp_import_id','=',self.id]]):
            dto = 1 - ((1 - (pur.dto1/100))*(1 - (pur.dto2/100))*(1 - DTO1)*(1 - DTO2)*(1 - DTO3))
            line = self.env['purchase.order.line'].create ({'name': pur.description,
                                                            'product_qty': pur.units,
                                                            'date_planned': fields.Date.today (),
                                                            'product_id': self.pool.get ('product.product').search(self._cr, self._uid, [['product_tmpl_id','=', pur.product_id.id,]])[0],# ,
                                                            'price_unit': pur.price,
                                                            'order_id': purchase.id,
                                                            'discount': dto * 100,
                                                            })
            line.taxes_id = self.pool.get ('account.tax').search (self._cr, self._uid, [['name','=', pur.get_select_tax (pur.tax),]])
        
        self.state = '2'   
        self.message_post(body=_("Purchase sincroniced"))  
        return {
                'name': 'Purchase',
                'type': 'ir.actions.act_window',
                'res_model': 'purchase.order',
                'view_type': 'form',
                'view_mode': 'form',
                'auto_refresh':1,
                'res_id': purchase.id,
                'flags': {'action_buttons': True},
            }
     
sd_ftp_import ()
                                              
class sd_ftp_import_lines (models.Model):
    _name = 'sd.ftp_import.lines'
    
    name = fields.Char (string = 'Product', readonly = True, required = True)                 #CDART  se ignora -> +CDMRC+CDCAR1+CDCAR2
    description = fields.Char (string = 'Description', readonly = True)      #NMART
    units = fields.Float (string = 'Units', readonly = True)                 #UNART
    price = fields.Float (string = 'Price', digits_compute = dp.get_precision ('Product Price'), readonly = True)                 #PRPVPF
    dto1 = fields.Float (string = 'DTO1. %', readonly = True)                  #DTO1
    dto2 = fields.Float (string = 'DTO2. %', readonly = True)                  #DTO2
    ean = fields.Char (string = 'EAN')                      #EAN
    ftp_import_id = fields.Many2one ('sd.ftp_import', string = 'Documents', ondelete='cascade', readonly = True)
    product_id = fields.Many2one ('product.template', string = 'Product template', readonly = True)
    tax = fields.Selection (string = 'Tax', selection = [('700', 'IGIC 7% BC'),
                                                        ('300', 'IGIC 3% BC'),
                                                        ('950', 'IGIC 9,5% BC'),
                                                        ('1350', 'IGIC 13,5% BC'),
                                                        ('0','IGIC 0% BC')], default = '700', readonly = True)
    
    def get_select_tax (self, val):
        res = {'700': 'IGIC 7% BC',
               '300': 'IGIC 3% BC',
               '950': 'IGIC 9,5% BC',
               '1350': 'IGIC 13,5% BC',
               '0':'IGIC 0% BC'}
        return res[val]
    
sd_ftp_import_lines ()
