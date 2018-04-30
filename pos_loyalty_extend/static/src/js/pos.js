/* Copyright 2018 Rodrigo Colombo (rcolombo@sdatos.es) - Sistemas de datos S.L (http://www.sdatos.es)
 * License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl). */


odoo.define('pos_loyalty_extend.loyalty_program_extend', function (require){
    "use strict";

    var core = require("web.core");
    var models = require("point_of_sale.models") 
    var utils = require('web.utils');

    var round_pr = utils.round_precision;
    
    models.load_fields("loyalty.program", ["rounding_type","refund_point_rule"]);
    var _order_super = models.Order.prototype;
    models.Order = models.Order.extend({
        /* The total of points won, excluding the points spent on rewards */
        get_won_points: function(){
        	if (!this.pos.loyalty || !this.get_client()) {
                return 0;
            }

            var orderLines = this.get_orderlines();
            var rounding = this.pos.loyalty.rounding;
            var rounding_type = this.pos.loyalty.rounding_type;
            var refund_rule = this.pos.loyalty.refund_point_rule;
            
            var product_sold = 0;
            var total_sold   = 0;
            var total_points = 0;
            for (var i = 0; i < orderLines.length; i++) {
                var line = orderLines[i];
                var product = line.get_product();
                var rules  = this.pos.loyalty.rules_by_product_id[product.id] || [];
                var overriden = false;

                if (line.get_reward()) {  // Reward products are ignored
                    continue;
                }

                for (var j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    if (rounding_type == 'symmetrical') {
	                    total_points += round_pr(line.get_quantity() * rule.pp_product, rounding);
	                    total_points += round_pr(line.get_price_with_tax() * rule.pp_currency, rounding);
                    }
                    else if (rounding_type == 'truncated') {
                    	total_points += round_pr(Math.trunc((line.get_quantity() * rule.pp_product) / rounding) * rounding, rounding);
	                    total_points += round_pr(Math.trunc((line.get_price_with_tax() * rule.pp_currency) / rounding) * rounding, rounding);
                    }
                    // if affected by a non cumulative rule, skip the others. (non cumulative rules are put
                    // at the beginning of the list when they are loaded )
                    if (!rule.cumulative) {
                        overriden = true;
                        break;
                    }
                }

                // Test the category rules
                if ( product.pos_categ_id ) {
                    var category = this.pos.db.get_category_by_id(product.pos_categ_id[0]);
                    while (category && !overriden) {
                        var rules = this.pos.loyalty.rules_by_category_id[category.id] || [];
                        for (var j = 0; j < rules.length; j++) {
                            var rule = rules[j];
                            if (rounding_type == 'symmetrical') {
	                            total_points += round_pr(line.get_quantity() * rule.pp_product, rounding);
	                            total_points += round_pr(line.get_price_with_tax() * rule.pp_currency, rounding);
                            }
                            else if (rounding_type == 'truncated') {
                            	total_points += round_pr(Math.trunc((line.get_quantity() * rule.pp_product) / rounding) * rounding, rounding);
        	                    total_points += round_pr(Math.trunc((line.get_price_with_tax() * rule.pp_currency) / rounding) * rounding, rounding);
                            }
                            if (!rule.cumulative) {
                                overriden = true;
                                break;
                            }
                        }
                        var _category = category;
                        category = this.pos.db.get_category_by_id(this.pos.db.get_category_parent_id(category.id));
                        if (_category === category) {
                            break;
                        }
                    }
                }

                if (!overriden) {
                    product_sold += line.get_quantity();
                    total_sold   += line.get_price_with_tax();
                }
            }

            if (rounding_type == 'symmetrical') {
	            total_points += round_pr( total_sold * this.pos.loyalty.pp_currency, rounding );
	            total_points += round_pr( product_sold * this.pos.loyalty.pp_product, rounding );
	            total_points += round_pr( this.pos.loyalty.pp_order, rounding );
            }
            else if (rounding_type == 'truncated') {
            	total_points += round_pr( Math.trunc((total_sold * this.pos.loyalty.pp_currency) / rounding) * rounding, rounding );
	            total_points += round_pr( Math.trunc((product_sold * this.pos.loyalty.pp_product) / rounding) * rounding, rounding );
	            total_points += round_pr( Math.trunc(this.pos.loyalty.pp_order / rounding) * rounding, rounding );
            }
            if (refund_rule == 'no' && total_points < 0) {
            	total_points = 0;
            }
            return total_points;
        },
    });    
});
	