from openerp import api, tools, SUPERUSER_ID, models, fields, exceptions
from openerp.osv import osv, expression
from openerp.tools.translate import _
from openerp.tools import DEFAULT_SERVER_DATETIME_FORMAT
import psycopg2
import openerp.addons.product.product
import re
import openerp.addons.decimal_precision as dp
from openerp.tools.float_utils import float_round, float_compare

class product_template(models.Model):
    _inherit = "product.template"
    
    @api.multi
    def button_gen_ean13 (self):
        if not self.default_code:
            raise exceptions.Warning (_("Default code do not established"))
        if self.ean13:
            raise exceptions.Warning (_("Ean13 is not empty, please clean the field"))
        if not self.list_price:
            raise exceptions.Warning (_("Public price do not established"))
        self.ean13 = self.generate_ean13 ()
    
    @api.multi
    def generate_ean13 (self, count = 0):
        for s in self:
            if s.default_code:
                m1 = str (s.default_code)[0]
                m2 = str (s.default_code)[1:len(s.default_code)]
                ean = m1
                ean += str ('%.2d' % abs (s.list_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (s.list_price)).split ('.')[1])))
                ean += m2
            else:
                ean = "0"
                ean += str ('%.2d' % abs (s.list_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (s.list_price)).split ('.')[1])))    
            if len (ean) >= 12:
                if len (str (count)) > 1:
                    ean = ean[:10] + str (count) + ean[10:]
                else:
                    ean = ean[:11] + str (count) + ean[11:]
            else:
                ean += str (count)
            ean = openerp.addons.product.product.sanitize_ean13 (ean)
            if s.env['product.product'].search ([('ean13', '=', ean)]):  #, ('active', '=', True)
                ean = s.generate_ean13 (count + 50)
        
        return ean
    
class product_product(models.Model):
    _inherit = "product.product"
    
    @api.multi
    def generate_ean13 (self, count = 0):
        for s in self:
            d_code = []
            if s.default_code:
                d_code = list (s.default_code)
                while True:
                    if not len (d_code) or re.match (r"[1-9]", d_code[0]): break
                    else: d_code.pop (0)
            if len (d_code):
                d_code = ''.join(d_code)
                ean = d_code[0]
                ean += str ('%.2d' % abs (s.lst_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (s.lst_price)).split ('.')[1])))
                ean += d_code[1:len(d_code)]
            else:
                ean = str (s.id)[0]
                ean += str ('%.2d' % abs (s.lst_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (s.lst_price)).split ('.')[1])))
                ean += str (s.id)[1:len (str (s.id))]    
            if len (ean) >= 12:
                if len (str (count)) > 1:
                    ean = ean[:10] + str (count) + ean[10:]
                else:
                    ean = ean[:11] + str (count) + ean[11:]
            else:
                ean += str (count)
            ean = openerp.addons.product.product.sanitize_ean13 (ean)
            if not s.env['product.product'].search ([('ean13', '=', ean)]):  #, ('active', '=', True)
                s.ean13 = ean
            else:    
                ean = s.generate_ean13 (count + 50)
            count = count + 1