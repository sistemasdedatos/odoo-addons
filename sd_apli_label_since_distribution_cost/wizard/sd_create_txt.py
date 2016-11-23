import base64  
from openerp import models, fields, api

record = False

class ProductProductLabel(models.TransientModel):
    _inherit = 'download.file.base.model'
    _name = "product.product.label"

    label_lines = fields.One2many(
            comodel_name='product.product.label.line',
            inverse_name='label_id',
            string='Labels'
    )
    @api.model
    def default_get(self, fields):
        res = super(ProductProductLabel, self).default_get(fields)
        label_lines = self.lines_get()
        res['label_lines'] = label_lines
        return res

    @api.multi
    def lines_get(self):
        context = self._context or {}
        if context.get('active_model') == 'purchase.cost.distribution':
            distributions = self.env['purchase.cost.distribution'].browse(context.get('active_ids', []))
            label_list = []
            for dist in distributions:
                for line in dist.cost_lines:
                    label_list.append([0,0,{
                        'product_id': line.product_id.id,
                        'quantity': line.product_qty
                    }])
        else:
            products = self.env['product.product'].browse(context.get('active_ids', []))
            label_list = []
            for product in products:
                label_list.append([0,0,{
                    'product_id': product.id,
                    'quantity': 1
                }])
        return label_list

    def get_filename(self):
        return 'etiquetas.txt'

    def get_content(self):
        global record
        res = "Codigo EAN;Codigo;Descripcion;Atributos\r\n"
        for product in self.browse([record]).label_lines:
            for i in range (product.quantity):
                res += str (product.product_id.ean13 or '') + ';'
                res += (product.product_id.default_code) or ''
                res += ';'
                res += product.product_id.name
                res += ';'
                for at in product.product_id.attribute_value_ids:
                    res += at.name
                    res += ' '
                res += "\r\n"
        return res
    
    @api.multi
    def generate_labels(self):
        view_id = self.env['ir.ui.view'].search([('model','=', 'product.product.label'), ('name', '=', 'product.product.label.view.down')])
        global record
        record = self.id
        return {'type': 'ir.actions.act_window',
                'res_model': 'product.product.label',
                'name': 'Product Labels',
#                 'view_id': view_id,
                'view_type': 'form',
                'view_mode': 'form',
                'target': 'new',
                'nodestroy': True,
                'context': self._context
                }
        
class ProductProductLabelLine(models.TransientModel):
    _name = "product.product.label.line"

    label_id = fields.Many2one(
        comodel_name="product.product.label",
        string="Product Label"
    )
    product_id = fields.Many2one(
        comodel_name="product.product",
        string="Product"
    )
    quantity = fields.Integer(string="Label Qty", default=1)



