from openerp import api, tools, SUPERUSER_ID, models, fields, exceptions
from openerp.osv import osv, expression
from openerp.tools.translate import _
from openerp.tools import DEFAULT_SERVER_DATETIME_FORMAT
import psycopg2
import openerp.addons.product.product

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
        if self.default_code:
            m1 = str (self.default_code)[0]
            m2 = str (self.default_code)[1:len(self.default_code)]
            ean = m1
            ean += str ('%.2d' % abs (self.list_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (self.list_price)).split ('.')[1])))
            ean += m2
        else:
            ean = "0"
            ean += str ('%.2d' % abs (self.list_price)).split ('.')[0] + '7' + str ('%.2d' % int (float (str('%.2f' % abs (self.list_price)).split ('.')[1])))    
        if len (ean) >= 13:
            if len (str (count)) > 1:
                ean = ean[:10] + str (count) + ean[10:]
            else:
                ean = ean[:11] + str (count) + ean[11:]
        else:
            ean += str (count)
        print ean
        return openerp.addons.product.product.sanitize_ean13 (ean)
    
    @api.multi
    def create_variant_ids(self):
        ean13 = self.ean13
        ref = self.default_code
        print ref
        product_variant_count = self.product_variant_count
        if not ean13:
            ean13 = self.generate_ean13 ()
        super (product_template, self).create_variant_ids ()
        tmpl_ids = self.browse (self._ids)
        for tmpl_id in tmpl_ids:
            count = product_variant_count + 1 if product_variant_count > 1 else product_variant_count
            print len (tmpl_id.product_variant_ids) 
            print product_variant_count
            if len (tmpl_id.product_variant_ids) > 1 and product_variant_count < len (tmpl_id.product_variant_ids):
                for product_id in tmpl_id.product_variant_ids:
                    if not product_id.ean13:
                        print "anterior", product_id.ean13
                        product_id.ean13 = self.generate_ean13 (count)
                        count = count + 1
                    print product_id.ean13
                    
