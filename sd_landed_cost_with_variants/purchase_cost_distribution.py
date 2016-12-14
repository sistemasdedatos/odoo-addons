from openerp import models, fields, exceptions, api, _
import openerp.addons.decimal_precision as dp


class PurchaseCostDistribution(models.Model):
    _inherit = "purchase.cost.distribution"
    
    def _product_price_update(self, move, new_price):
        """Method that mimicks stock.move's product_price_update_before_done
        method behaviour, but taking into account that calculations are made
        on an already done move, and prices sources are given as parameters.
        """
        if (move.location_id.usage == 'supplier' and
                move.product_id.cost_method == 'average'):
            product = move.product_id
            qty_available = product.qty_available #.product_tmpl_id
            product_avail = qty_available - move.product_qty
            if product_avail <= 0:
                new_std_price = new_price
            else:
                domain_quant = [
                    ('product_id', '=',#'in',
                     product.id), #product.product_tmpl_id.product_variant_ids.ids),
                    ('id', 'not in', move.quant_ids.ids),
                    ('location_id.usage', '=', 'internal')]
                quants = self.env['stock.quant'].search(domain_quant)
                current_valuation = sum([(q.cost * q.qty) for q in quants])
                # Get the standard price
                new_std_price = (
                    (current_valuation + new_price * move.product_qty) /
                    qty_available)
            # Write the standard price, as SUPERUSER_ID, because a
            # warehouse manager may not have the right to write on products
            product.sudo().write({'standard_price': new_std_price})
            product.sudo().write({'cost_price': new_std_price})
            