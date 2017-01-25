/*
 *    Copyright (c) 2015 - Present Ahmed Magdy
 *    All Rights Reserved
 *    Author: Ahmed Magdy <ahmed.magdy40@gmail.com>
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    A copy of the GNU General Public License is available at:
 *    <http://www.gnu.org/licenses/gpl.html>.
 */

openerp.web_mobile_responsive = function(instance) {
    var _t = instance.web._t,
       _lt = instance.web._lt;
    var QWeb = instance.web.qweb;
    instance.web_kanban.KanbanView.include({
        template: "KanbanView",
        load_kanban: function(data) {
            this.fields_view = data;

            // use default order if defined in xml description
            var default_order = this.fields_view.arch.attrs.default_order,
                unsorted = !this.dataset._sort.length;
            if (unsorted && default_order) {
                this.dataset.set_sort(default_order.split(','));
            }

            this.$el.addClass(this.fields_view.arch.attrs['class']);
            this.$buttons = $(QWeb.render("KanbanView.buttons", {'widget': this}));
            if (this.options.$buttons) {
                this.$buttons.appendTo(this.options.$buttons);
            } else {
                this.$el.find('.oe_kanban_buttons').replaceWith(this.$buttons);
            }
            this.$buttons
                .on('click', 'button.oe_kanban_button_new', this.do_add_record)
                .on('click', '.oe_kanban_add_column', this.do_add_group);
            this.$groups = this.$el.find('.oe_kanban_groups tr');
            this.fields_keys = _.keys(this.fields_view.fields);
            this.add_qweb_template();
            this.has_been_loaded.resolve();
            this.trigger('kanban_view_loaded', data);
            return $.when();
        },
    });
    instance.web_kanban.KanbanGroup.include({
        template: 'KanbanView.group_header',
    });
};