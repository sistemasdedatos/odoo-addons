/* <inline asset> defined in bundle 'web.assets_backend' */
$.fn.bstooltip = $.fn.tooltip;
$.fn.bsbutton = $.fn.button;;

/* <inline asset> defined in bundle 'web.assets_backend' */
$.fn.tooltip = $.fn.bstooltip;
$.fn.button = $.fn.bsbutton;;

/* /web_mobile_responsive_app/static/src/js/widgets/chrome.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.Menu.include({
        bind_menu: function() {
            var self = this;
            this.$secondary_menus = this.$el.parents().find('.oe_secondary_menus_container')
            this.$secondary_menus.on('click', 'a[data-menu]', this.on_menu_click);
            this.$el.on('click', 'a[data-menu]', this.on_top_menu_click);
            $('#MoreAppsModal').on('click', 'a[data-menu]', function(e) {
                var $target = $(e.target);
                self.on_top_menu_click(e);
                $('#MoreAppsModal').modal('hide');
                $('#MoreAppsModal').find('.active').removeClass('active');
                $target.closest('li').addClass('active');
            });
            this.$secondary_menus.find('.oe_menu_toggler').siblings('.oe_secondary_submenu').hide();
            if (self.current_menu) {
                self.open_menu(self.current_menu);
            }
            this.trigger('menu_bound');
            var lazyreflow = _.debounce(this.reflow.bind(this), 200);
            instance.web.bus.on('resize', this, function() {
                if (parseInt(self.$el.parent().css('width')) <= 768) {
                    lazyreflow('all_inside');
                } else {
                    lazyreflow();
                }
            });
            instance.web.bus.trigger('resize');
            this.is_bound.resolve();
        },
        open_menu: function(id) {
            this.current_menu = id;
            this.session.active_id = id;
            var $clicked_menu, $sub_menu, $main_menu;
            $clicked_menu = this.$el.add(this.$secondary_menus).find('a[data-menu=' + id + ']');
            this.trigger('open_menu', id, $clicked_menu);
            if (this.$secondary_menus.has($clicked_menu).length) {
                $sub_menu = $clicked_menu.parents('.oe_secondary_menu');
                $main_menu = this.$el.find('a[data-menu=' + $sub_menu.data('menu-parent') + ']');
            } else {
                $sub_menu = this.$secondary_menus.find('.oe_secondary_menu[data-menu-parent=' + $clicked_menu.attr('data-menu') + ']');
                $main_menu = $clicked_menu;
            }
            this.$el.find('.active').removeClass('active');
            $main_menu.parent().addClass('active');
            $main_menu.parents('li.has-submenu').addClass('active');
            this.$secondary_menus.find('.oe_secondary_menu').hide();
            $sub_menu.show();
            this.$secondary_menus.parent('.oe_leftbar').toggle(!!$sub_menu.children().length);
            this.$secondary_menus.find('.active').removeClass('active');
            if ($main_menu !== $clicked_menu) {
                if ($clicked_menu.is('.oe_menu_toggler')) {
                    $clicked_menu.parents('li').siblings('li').find('>.oe_menu_toggler').removeClass('oe_menu_opened').siblings('.oe_secondary_submenu').hide();
                    $clicked_menu.toggleClass('oe_menu_opened').siblings('.oe_secondary_submenu:first').toggle();
                } else {
                    $clicked_menu.parent().addClass('active');
                    $clicked_menu.closest('li.has-submenu').addClass('active');
                }
            }
            this.$secondary_menus.find('.oe_secondary_submenu li a span').each(function() {
                $(this).tooltip(this.scrollWidth > this.clientWidth ? {
                    title: $(this).text().trim(),
                    placement: 'right'
                } : 'destroy');
            });
        },
    });
})();;

/* /web_mobile_responsive_app/static/src/js/widgets/views.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.View.include({
        load_view: function(context) {
            var self = this;
            var view_loaded_def;
            if (this.embedded_view) {
                view_loaded_def = $.Deferred();
                $.async_when().done(function() {
                    view_loaded_def.resolve(self.embedded_view);
                });
            } else {
                if (!this.view_type)
                    console.warn("view_type is not defined", this);
                view_loaded_def = instance.web.fields_view_get({
                    "model": this.dataset._model,
                    "view_id": this.view_id,
                    "view_type": this.view_type,
                    "toolbar": !!this.options.$sidebar,
                    "context": this.dataset.get_context(),
                });
            }
            return this.alive(view_loaded_def).then(function(r) {
                self.fields_view = r;
                self.$el.addClass('oe_view').toggleClass('oe_cannot_create', !self.is_action_enabled('create')).toggleClass('oe_cannot_edit', !self.is_action_enabled('edit')).toggleClass('oe_cannot_delete', !self.is_action_enabled('delete'));
                return $.when(self.view_loading(r)).then(function() {
                    self.trigger('view_loaded', r);
                    window.on_scroll_fix_tools();
                });
            });
        },
    });
    instance.web.Loading.include({
        template: _t("Loading"),
        init: function(parent) {
            this._super(parent);
            this.count = 0;
            this.blocked_ui = false;
            this.session.on("request", this, this.request_call);
            this.session.on("response", this, this.response_call);
            this.session.on("response_failed", this, this.response_call);
        },
        destroy: function() {
            this.on_rpc_event(-this.count);
            this._super();
        },
        request_call: function() {
            this.on_rpc_event(1);
        },
        response_call: function() {
            this.on_rpc_event(-1);
        },
        on_rpc_event: function(increment) {
            var self = this;
            if (!this.count && increment === 1) {
                this.long_running_timer = setTimeout(function() {
                    self.blocked_ui = true;
                    instance.web.blockUI();
                }, 3000);
            }
            this.count += increment;
            if (this.count > 0) {
                if (instance.session.debug) {
                    this.$el.text(_.str.sprintf(_t("Loading (%d)"), this.count));
                } else {
                    this.$el.text(_t("Loading"));
                }
                this.$el.show();
                this.getParent().$el.addClass('oe_wait');
            } else {
                this.count = 0;
                clearTimeout(this.long_running_timer);
                if (self.blocked_ui) {
                    this.blocked_ui = false;
                    instance.web.unblockUI();
                }
                this.$el.fadeOut();
                this.getParent().$el.removeClass('oe_wait');
            }
        }
    });
    instance.web.ViewManagerAction.include({
        template: "ResponsiveViewManagerAction",
    });
    instance.web.ActionManager.include({
        on_breadcrumb_clicked: function(ev) {
            var $e = $(ev.target);
            var id = $e.data('id');
            var index;
            for (var i = this.breadcrumbs.length - 1; i >= 0; i--) {
                if (this.breadcrumbs[i].id == id) {
                    index = i;
                    break;
                }
            }
            var subindex = $e.parent().find('a.oe_breadcrumb_item[data-id=' + $e.data('id') + ']').index($e);
            this.select_breadcrumb(index, subindex);
            window.on_scroll_fix_tools();
        },
    });
    instance.web.ViewManager.include({
        start: function() {
            var self = this;
            this.$el.find('.oe_view_manager_switch a').click(function() {
                self.switch_mode($(this).data('view-type'));
            }).tooltip();
            var views_ids = {};
            _.each(this.views_src, function(view) {
                self.views[view.view_type] = $.extend({}, view, {
                    deferred: $.Deferred(),
                    controller: null,
                    options: _.extend({
                        $buttons: self.$el.find('.oe_view_manager_buttons'),
                        $sidebar: self.flags.sidebar ? self.$el.find('.oe_view_manager_sidebar') : undefined,
                        $pager: self.$el.find('.oe_view_manager_pager'),
                        action: self.action,
                        action_views_ids: views_ids
                    }, self.flags, self.flags[view.view_type] || {}, view.options || {})
                });
                views_ids[view.view_type] = view.view_id;
            });
            if (this.flags.views_switcher === false) {
                this.$el.find('.oe_view_manager_switch').hide();
            }
            this.$el.find('sidebar-small, pager-small').click(function(e) {
                e.stopPropagation();
                $('sidebar-small .dropdown-toggle').dropdown();
            });
            $(window).on('resize', self.reposition_sidebar_and_pager);
            self.reposition_sidebar_and_pager();
            var default_view = this.flags.default_view || this.views_src[0].view_type;
            return this.switch_mode(default_view, null, this.flags[default_view] && this.flags[default_view].options);
        },
        reposition_sidebar_and_pager: function() {
            var $el = $('div.oe_view_manager');
            var is_large = $('.more_options').is(':hidden');
            if (is_large) {
                $el.find('pager-large').append($el.find('pager-small .oe_view_manager_pager'));
                $el.find('sidebar-large').append($el.find('sidebar-small .oe_view_manager_sidebar'));
            } else {
                $el.find('pager-small').append($el.find('pager-large .oe_view_manager_pager'));
                $el.find('sidebar-small').append($el.find('sidebar-large .oe_view_manager_sidebar'));
            }
        },
    });
})();

/* /web_mobile_responsive_app/static/src/js/widgets/searchview.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    var isMobile = function() {
        var isMob = false;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            isMob = true;
        }
        return isMob;
    }
    instance.web.SearchView.include({
        renderFacets: function(collection, model, options) {
            var self = this;
            var started = [];
            var $e = this.$('div.oe_searchview_facets');
            _.invoke(this.input_subviews, 'destroy');
            this.input_subviews = [];
            var i = new instance.web.search.InputView(this);
            started.push(i.appendTo($e));
            this.input_subviews.push(i);
            this.query.each(function(facet) {
                var f = new instance.web.search.FacetView(this, facet);
                started.push(f.appendTo($e));
                self.input_subviews.push(f);
                var i = new instance.web.search.InputView(this);
                started.push(i.appendTo($e));
                self.input_subviews.push(i);
            }, this);
            _.each(this.input_subviews, function(childView) {
                childView.on('focused', self, self.proxy('childFocused'));
                childView.on('blurred', self, self.proxy('childBlurred'));
            });
            $.when.apply(null, started).then(function() {
                if (options && options.focus_input === false) return;
                var input_to_focus;
                if (!options || typeof options.at !== 'number') {
                    input_to_focus = _.last(self.input_subviews);
                } else {
                    input_to_focus = self.input_subviews[(options.at + 1) * 2];
                }
                if (!isMobile()) {
                    input_to_focus.$el.focus();
                }
            });
        }
    });
    instance.web.search.FacetView.include({
        events: {
            'focus': function() {
                this.trigger('focused', this);
            },
            'blur': function() {
                this.trigger('blurred', this);
            },
            'click': function(e) {
                if ($(e.target).is('.oe_facet_remove>.fa.fa-times')) {
                    this.model.destroy();
                    return false;
                }
                this.$el.focus();
                e.stopPropagation();
            },
            'keydown': function(e) {
                var keys = $.ui.keyCode;
                switch (e.which) {
                    case keys.BACKSPACE:
                    case keys.DELETE:
                        this.model.destroy();
                        return false;
                }
            }
        },
    });
    instance.web.search.CustomFilters.include({
        facet_for: function(filter) {
            return {
                category: _t("Custom Filter"),
                field: {
                    get_context: function() {
                        return filter.context;
                    },
                    get_groupby: function() {
                        return [filter.context];
                    },
                    get_domain: function() {
                        return filter.domain;
                    }
                },
                _id: filter['id'],
                is_custom_filter: true,
                values: [{
                    label: filter.name,
                    value: null
                }]
            };
        },
    });
    instance.web.search.Filters = instance.web.search.Input.extend({
        template: 'SearchView.Filters',
        _in_drawer: true,
        start: function() {
            var self = this;
            var is_group = function(i) {
                return i instanceof instance.web.search.FilterGroup;
            };
            var visible_filters = _(this.drawer.controls).chain().reject(function(group) {
                return _(_(group.children).filter(is_group)).isEmpty() || group.modifiers.invisible;
            });
            var groups = visible_filters.map(function(group) {
                var filters = _(group.children).filter(is_group);
                return {
                    name: _.str.sprintf("<span class='oe_i'>%s</span> %s", group.icon, group.name),
                    filters: filters,
                    length: _(filters).chain().map(function(i) {
                        return i.filters.length;
                    }).sum().value()
                };
            }).value();
            var $dl = $('<dl class="dl-horizontal">').appendTo(this.$el);
            var rendered_lines = _.map(groups, function(group) {
                $('<dt>').html(group.name).appendTo($dl);
                var $dd = $('<dd>').appendTo($dl);
                return $.when.apply(null, _(group.filters).invoke('appendTo', $dd));
            });
            return $.when.apply(this, rendered_lines);
        },
    });
})();

/* /web_mobile_responsive_app/static/src/js/widgets/listview.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.ListView.include({
        _template: 'ResponsiveListView',
        load_list: function(data) {
            var self = this;
            this.fields_view = data;
            this.name = "" + this.fields_view.arch.attrs.string;
            if (this.fields_view.arch.attrs.colors) {
                this.colors = _(this.fields_view.arch.attrs.colors.split(';')).chain().compact().map(function(color_pair) {
                    var pair = color_pair.split(':'),
                        color = pair[0],
                        expr = pair[1];
                    return [color, py.parse(py.tokenize(expr)), expr];
                }).value();
            }
            if (this.fields_view.arch.attrs.fonts) {
                this.fonts = _(this.fields_view.arch.attrs.fonts.split(';')).chain().compact().map(function(font_pair) {
                    var pair = font_pair.split(':'),
                        font = pair[0],
                        expr = pair[1];
                    return [font, py.parse(py.tokenize(expr)), expr];
                }).value();
            }
            this.setup_columns(this.fields_view.fields, this.grouped);
            this.$el.html(QWeb.render(this._template, this));
            this.$el.addClass(this.fields_view.arch.attrs['class']);
            this.$el.find('.oe_list_record_selector').click(function() {
                self.$el.find('.oe_list_record_selector input').prop('checked', self.$el.find('.oe_list_record_selector').prop('checked') || false);
                var selection = self.groups.get_selection();
                $(self.groups).trigger('selected', [selection.ids, selection.records]);
            });
            if (!this.$buttons) {
                this.$buttons = $(QWeb.render("ListView.buttons", {
                    'widget': self
                }));
                if (this.options.$buttons) {
                    this.$buttons.appendTo(this.options.$buttons);
                } else {
                    this.$el.find('.oe_list_buttons').replaceWith(this.$buttons);
                }
                this.$buttons.find('.oe_list_add').click(this.proxy('do_add_record')).prop('disabled', this.grouped);
            }
            if (!this.$pager) {
                this.$pager = $(QWeb.render("ResponsiveListView.pager", {
                    'widget': self
                }));
                if (this.options.$buttons) {
                    this.$pager.appendTo(this.options.$pager);
                } else {
                    this.$el.find('.oe_list_pager').replaceWith(this.$pager);
                }
                this.$pager.on('click', 'a[data-pager-action]', function() {
                    var $this = $(this);
                    var max_page_index = Math.ceil(self.dataset.size() / self.limit()) - 1;
                    switch ($this.data('pager-action')) {
                        case 'first':
                            self.page = 0;
                            break;
                        case 'last':
                            self.page = max_page_index;
                            break;
                        case 'next':
                            self.page += 1;
                            break;
                        case 'previous':
                            self.page -= 1;
                            break;
                    }
                    if (self.page < 0) {
                        self.page = max_page_index;
                    } else if (self.page > max_page_index) {
                        self.page = 0;
                    }
                    self.reload_content();
                }).find('.oe_list_pager_state').click(function(e) {
                    e.stopPropagation();
                    var $this = $(this);
                    var $select = $('<select class="col-md-12 col-xs-12 col-sm-12 btn btn-default">').appendTo($this.empty()).click(function(e) {
                        e.stopPropagation();
                    }).append('<option value="80">80</option>' + '<option value="200">200</option>' + '<option value="500">500</option>' + '<option value="2000">2000</option>' + '<option value="NaN">' + _t("Unlimited") + '</option>').change(function() {
                        var val = parseInt($select.val(), 10);
                        self._limit = (isNaN(val) ? null : val);
                        self.page = 0;
                        self.reload_content();
                    }).blur(function() {
                        $(this).trigger('change');
                    }).val(self._limit || 'NaN');
                });
            }
            if (!this.sidebar && this.options.$sidebar) {
                this.sidebar = new instance.web.Sidebar(this);
                this.sidebar.appendTo(this.options.$sidebar);
                this.sidebar.add_items('other', _.compact([{
                    label: _t("Export"),
                    callback: this.on_sidebar_export
                }, self.is_action_enabled('delete') && {
                    label: _t('Delete'),
                    callback: this.do_delete_selected
                }]));
                this.sidebar.add_toolbar(this.fields_view.toolbar);
                this.sidebar.$el.hide();
            }
            var default_order = this.fields_view.arch.attrs.default_order,
                unsorted = !this.dataset._sort.length;
            if (unsorted && default_order && !this.grouped) {
                this.dataset.set_sort(default_order.split(','));
            }
            if (this.dataset._sort.length) {
                if (this.dataset._sort[0].indexOf('-') == -1) {
                    this.$el.find('th[data-id=' + this.dataset._sort[0] + ']').addClass("sortdown");
                } else {
                    this.$el.find('th[data-id=' + this.dataset._sort[0].split('-')[1] + ']').addClass("sortup");
                }
            }
            this.trigger('list_view_loaded', data, this.grouped);
        },
    });
})();;

/* /web_mobile_responsive_app/static/src/js/widgets/formview.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.form.AbstractField.include({
        set_dimensions: function(height, width) {
            this.$el.css({
                width: width,
                minHeight: height,
                maxheight: height,
            });
        },
    });
    instance.web.form.AbstractFormPopup.include({
        template: "AbstractFormPopup.render",
        setup_form_view: function() {
            var self = this;
            if (this.row_id) {
                this.dataset.ids = [this.row_id];
                this.dataset.index = 0;
            } else {
                this.dataset.index = null;
            }
            var options = _.clone(self.options.form_view_options) || {};
            if (this.row_id !== null) {
                options.initial_mode = this.options.readonly ? "view" : "edit";
            }
            _.extend(options, {
                $buttons: this.$buttonpane,
            });
            this.view_form = new instance.web.ResponsiveFormView(this, this.dataset, this.options.view_id || false, options);
            if (this.options.alternative_form_view) {
                this.view_form.set_embedded_view(this.options.alternative_form_view);
            }
            this.view_form.appendTo(this.$el.find(".oe_popup_form"));
            this.view_form.on("form_view_loaded", self, function() {
                var multi_select = self.row_id === null && !self.options.disable_multiple_selection;
                self.$buttonpane.html(QWeb.render("AbstractFormPopup.buttons", {
                    multi_select: multi_select,
                    readonly: self.row_id !== null && self.options.readonly,
                }));
                var $snbutton = self.$buttonpane.find(".oe_abstractformpopup-form-save-new");
                $snbutton.click(function() {
                    $.when(self.view_form.save()).done(function() {
                        self.view_form.reload_mutex.exec(function() {
                            self.view_form.on_button_new();
                        });
                    });
                });
                var $sbutton = self.$buttonpane.find(".oe_abstractformpopup-form-save");
                $sbutton.click(function() {
                    $.when(self.view_form.save()).done(function() {
                        self.view_form.reload_mutex.exec(function() {
                            self.check_exit();
                        });
                    });
                });
                var $cbutton = self.$buttonpane.find(".oe_abstractformpopup-form-close");
                $cbutton.click(function() {
                    self.view_form.trigger('on_button_cancel');
                    self.check_exit();
                });
                self.view_form.do_show();
            });
        },
    });
    instance.web.views.add('form', 'instance.web.ResponsiveFormView');
    instance.web.ResponsiveFormView = instance.web.FormView.extend({
        searchable: false,
        template: "ResponsiveFormView",
        display_name: _lt('Form'),
        view_type: "form",
        init: function() {
            this._super.apply(this, arguments);
            this.rendering_engine = new instance.web.form.ResponsiveFormRenderingEngine(this);
        },
        view_loading: function(r) {
            return this.load_form(r);
        },
        destroy: function() {
            _.each(this.get_widgets(), function(w) {
                w.off('focused blurred');
                w.destroy();
            });
            if (this.$el) {
                this.$el.off('.formBlur');
            }
            this._super();
        },
        load_form: function(data) {
            var self = this;
            if (!data) {
                throw new Error(_t("No data provided."));
            }
            if (this.arch) {
                throw "Form view does not support multiple calls to load_form";
            }
            this.fields_order = [];
            this.fields_view = data;
            this.rendering_engine.set_fields_registry(this.fields_registry);
            this.rendering_engine.set_tags_registry(this.tags_registry);
            this.rendering_engine.set_widgets_registry(this.widgets_registry);
            this.rendering_engine.set_fields_view(data);
            var $dest = this.$el.hasClass("oe_form_container") ? this.$el : this.$el.find('.oe_form_container');
            this.rendering_engine.render_to($dest);
            this.$el.on('mousedown.formBlur', function() {
                self.__clicked_inside = true;
            });
            this.$buttons = $(QWeb.render("ResponsiveFormView.buttons", {
                'widget': self
            }));
            if (this.options.$buttons) {
                this.$buttons.appendTo(this.options.$buttons);
            } else {
                this.$el.find('.oe_form_buttons').replaceWith(this.$buttons);
            }
            this.$buttons.on('click', '.oe_form_button_create', this.guard_active(this.on_button_create));
            this.$buttons.on('click', '.oe_form_button_edit', this.guard_active(this.on_button_edit));
            this.$buttons.on('click', '.oe_form_button_save', this.guard_active(this.on_button_save));
            this.$buttons.on('click', '.oe_form_button_cancel', this.guard_active(this.on_button_cancel));
            if (this.options.footer_to_buttons) {
                this.$el.find('footer').appendTo(this.$buttons);
            }
            this.$sidebar = this.options.$sidebar || this.$el.find('.oe_form_sidebar');
            if (!this.sidebar && this.options.$sidebar) {
                this.sidebar = new instance.web.Sidebar(this);
                this.sidebar.appendTo(this.$sidebar);
                if (this.fields_view.toolbar) {
                    this.sidebar.add_toolbar(this.fields_view.toolbar);
                }
                this.sidebar.add_items('other', _.compact([self.is_action_enabled('delete') && {
                    label: _t('Delete'),
                    callback: self.on_button_delete
                }, self.is_action_enabled('create') && {
                    label: _t('Duplicate'),
                    callback: self.on_button_duplicate
                }]));
            }
            this.has_been_loaded.resolve();
            this.$el.find(".oe_form_group_row,.oe_form_field,label,h1,.oe_title,.oe_notebook_page, .oe_list_content").on('click', function(e) {
                if (self.get("actual_mode") == "view") {
                    var $button = self.options.$buttons.find(".oe_form_button_edit");
                    $button.openerpBounce();
                    e.stopPropagation();
                    instance.web.bus.trigger('click', e);
                }
            });
            this.$el.find(".oe_form_field_status:not(.oe_form_status_clickable)").on('click', function(e) {
                if ((self.get("actual_mode") == "view")) {
                    var $button = self.$el.find(".oe_highlight:not(.oe_form_invisible)").css({
                        'float': 'left',
                        'clear': 'none'
                    });
                    $button.openerpBounce();
                    e.stopPropagation();
                }
            });
            this.trigger('form_view_loaded', data);
            return $.when();
        },
        widgetFocused: function() {
            this.__clicked_inside = false;
            if (this.__blur_timeout) {
                clearTimeout(this.__blur_timeout);
                this.__blur_timeout = null;
            }
        },
        widgetBlurred: function() {
            if (this.__clicked_inside) {
                this.__clicked_inside = false;
                return;
            }
            var self = this;
            this.widgetFocused();
            this.__blur_timeout = setTimeout(function() {
                self.trigger('blurred');
            }, 0);
        },
        do_load_state: function(state, warm) {
            if (state.id && this.datarecord.id != state.id) {
                if (this.dataset.get_id_index(state.id) === null) {
                    this.dataset.ids.push(state.id);
                }
                this.dataset.select_id(state.id);
                this.do_show();
            }
        },
        do_show: function(options) {
            var self = this;
            options = options || {};
            if (this.sidebar) {
                this.sidebar.$el.show();
            }
            if (this.$buttons) {
                this.$buttons.show();
            }
            this.$el.show().css({
                opacity: '0',
                filter: 'alpha(opacity = 0)'
            });
            this.$el.add(this.$buttons).removeClass('oe_form_dirty');
            var shown = this.has_been_loaded;
            if (options.reload !== false) {
                shown = shown.then(function() {
                    if (self.dataset.index === null) {
                        return self.on_button_new();
                    }
                    var fields = _.keys(self.fields_view.fields);
                    fields.push('display_name');
                    return self.dataset.read_index(fields, {
                        context: {
                            'bin_size': true
                        }
                    }).then(function(r) {
                        self.trigger('load_record', r);
                    });
                });
            }
            return shown.then(function() {
                self._actualize_mode(options.mode || self.options.initial_mode);
                self.$el.css({
                    opacity: '1',
                    filter: 'alpha(opacity = 100)'
                });
            });
        },
        do_hide: function() {
            if (this.sidebar) {
                this.sidebar.$el.hide();
            }
            if (this.$buttons) {
                this.$buttons.hide();
            }
            if (this.$pager) {
                this.$pager.hide();
            }
            this._super();
        },
        load_record: function(record) {
            var self = this,
                set_values = [];
            if (!record) {
                this.set({
                    'title': undefined
                });
                this.do_warn(_t("Form"), _t("The record could not be found in the database."), true);
                return $.Deferred().reject();
            }
            this.datarecord = record;
            this._actualize_mode();
            this.set({
                'title': record.id ? record.display_name : _t("New")
            });
            _(this.fields).each(function(field, f) {
                field._dirty_flag = false;
                field._inhibit_on_change_flag = true;
                var result = field.set_value(self.datarecord[f] || false);
                field._inhibit_on_change_flag = false;
                set_values.push(result);
            });
            return $.when.apply(null, set_values).then(function() {
                if (!record.id) {
                    self.do_onchange(null);
                }
                self.on_form_changed();
                self.rendering_engine.init_fields();
                self.is_initialized.resolve();
                self.do_update_pager(record.id === null || record.id === undefined);
                if (self.sidebar) {
                    self.sidebar.do_attachement_update(self.dataset, self.datarecord.id);
                }
                if (record.id) {
                    self.do_push_state({
                        id: record.id
                    });
                } else {
                    self.do_push_state({});
                }
                self.$el.add(self.$buttons).removeClass('oe_form_dirty');
                self.autofocus();
            });
        },
        load_defaults: function() {
            var self = this;
            var keys = _.keys(this.fields_view.fields);
            if (keys.length) {
                return this.dataset.default_get(keys).then(function(r) {
                    self.trigger('load_record', r);
                });
            }
            return self.trigger('load_record', {});
        },
        on_form_changed: function() {
            this.trigger("view_content_has_changed");
        },
        do_notify_change: function() {
            this.$el.add(this.$buttons).addClass('oe_form_dirty');
        },
        execute_pager_action: function(action) {
            if (this.can_be_discarded()) {
                switch (action) {
                    case 'first':
                        this.dataset.index = 0;
                        break;
                    case 'previous':
                        this.dataset.previous();
                        break;
                    case 'next':
                        this.dataset.next();
                        break;
                    case 'last':
                        this.dataset.index = this.dataset.ids.length - 1;
                        break;
                }
                var def = this.reload();
                this.trigger('pager_action_executed');
                return def;
            }
            return $.when();
        },
        init_pager: function() {
            var self = this;
            if (this.$pager)
                this.$pager.remove();
            if (this.get("actual_mode") === "create")
                return;
            this.$pager = $(QWeb.render("ResponsiveFormView.pager", {
                'widget': self
            })).hide();
            if (this.options.$pager) {
                this.$pager.appendTo(this.options.$pager);
            } else {
                this.$el.find('.oe_form_pager').replaceWith(this.$pager);
            }
            this.$pager.on('click', 'a[data-pager-action]', function() {
                var $el = $(this);
                if ($el.attr("disabled"))
                    return;
                var action = $el.data('pager-action');
                var def = $.when(self.execute_pager_action(action));
                $el.attr("disabled");
                def.always(function() {
                    $el.removeAttr("disabled");
                });
            });
            this.do_update_pager();
        },
        do_update_pager: function(hide_index) {
            this.$pager.toggle(this.dataset.ids.length > 1);
            if (hide_index) {
                $(".oe_form_pager_state", this.$pager).html("");
            } else {
                $(".oe_form_pager_state", this.$pager).html(_.str.sprintf(_t("%d / %d"), this.dataset.index + 1, this.dataset.ids.length));
            }
        },
        _build_onchange_specs: function() {
            var self = this;
            var find = function(field_name, root) {
                var fields = [root];
                while (fields.length) {
                    var node = fields.pop();
                    if (!node) {
                        continue;
                    }
                    if (node.tag === 'field' && node.attrs.name === field_name) {
                        return node.attrs.on_change || "";
                    }
                    fields = _.union(fields, node.children);
                }
                return "";
            };
            self._onchange_fields = [];
            self._onchange_specs = {};
            _.each(this.fields, function(field, name) {
                self._onchange_fields.push(name);
                self._onchange_specs[name] = find(name, field.node);
                _.each(field.field.views, function(view) {
                    _.each(view.fields, function(_, subname) {
                        self._onchange_specs[name + '.' + subname] = find(subname, view.arch);
                    });
                });
            });
        },
        _get_onchange_values: function() {
            var field_values = this.get_fields_values();
            if (field_values.id.toString().match(instance.web.BufferedDataSet.virtual_id_regex)) {
                delete field_values.id;
            }
            if (this.dataset.parent_view) {
                var parent_view = this.dataset.parent_view;
                var child_name = this.dataset.child_name;
                var parent_name = parent_view.get_field_desc(child_name).relation_field;
                if (parent_name) {
                    var parent_values = parent_view.get_fields_values();
                    delete parent_values[child_name];
                    field_values[parent_name] = parent_values;
                }
            }
            return field_values;
        },
        do_onchange: function(widget) {
            var self = this;
            var onchange_specs = self._onchange_specs;
            try {
                var def = $.when({});
                var change_spec = widget ? onchange_specs[widget.name] : null;
                if (!widget || (!_.isEmpty(change_spec) && change_spec !== "0")) {
                    var ids = [],
                        trigger_field_name = widget ? widget.name : self._onchange_fields,
                        values = self._get_onchange_values(),
                        context = new instance.web.CompoundContext(self.dataset.get_context());
                    if (widget && widget.build_context()) {
                        context.add(widget.build_context());
                    }
                    if (self.dataset.parent_view) {
                        var parent_name = self.dataset.parent_view.get_field_desc(self.dataset.child_name).relation_field;
                        context.add({
                            field_parent: parent_name
                        });
                    }
                    if (self.datarecord.id && !instance.web.BufferedDataSet.virtual_id_regex.test(self.datarecord.id)) {
                        ids.push(self.datarecord.id);
                    }
                    def = self.alive(new instance.web.Model(self.dataset.model).call("onchange", [ids, values, trigger_field_name, onchange_specs, context]));
                }
                this.onchanges_mutex.exec(function() {
                    return def.then(function(response) {
                        var fields = {};
                        if (widget) {
                            fields[widget.name] = widget.field;
                        } else {
                            fields = self.fields_view.fields;
                        }
                        var defs = [];
                        _.each(fields, function(field, fieldname) {
                            if (field && field.change_default) {
                                var value_;
                                if (response.value && (fieldname in response.value)) {
                                    value_ = response.value[fieldname];
                                } else {
                                    value_ = self.fields[fieldname].get_value();
                                }
                                var condition = fieldname + '=' + value_;
                                if (value_) {
                                    defs.push(self.alive(new instance.web.Model('ir.values').call('get_defaults', [self.model, condition])).then(function(results) {
                                        if (!results.length) {
                                            return response;
                                        }
                                        if (!response.value) {
                                            response.value = {};
                                        }
                                        for (var i = 0; i < results.length; ++i) {
                                            var triplet = results[i];
                                            response.value[triplet[1]] = triplet[2];
                                        }
                                        return response;
                                    }));
                                }
                            }
                        });
                        return _.isEmpty(defs) ? response : $.when.apply(null, defs);
                    }).then(function(response) {
                        return self.on_processed_onchange(response);
                    });
                });
                return this.onchanges_mutex.def;
            } catch (e) {
                console.error(e);
                instance.webclient.crashmanager.show_message(e);
                return $.Deferred().reject();
            }
        },
        on_processed_onchange: function(result) {
            try {
                var fields = this.fields;
                _(result.domain).each(function(domain, fieldname) {
                    var field = fields[fieldname];
                    if (!field) {
                        return;
                    }
                    field.node.attrs.domain = domain;
                });
                if (!_.isEmpty(result.value)) {
                    this._internal_set_values(result.value);
                }
                if (!_.isEmpty(result.warning)) {
                    new instance.web.Dialog(this, {
                        size: 'medium',
                        title: result.warning.title,
                        buttons: [{
                            text: _t("Ok"),
                            click: function() {
                                this.parents('.modal').modal('hide');
                            }
                        }]
                    }, QWeb.render("CrashManager.warning", result.warning)).open();
                }
                return $.Deferred().resolve();
            } catch (e) {
                console.error(e);
                instance.webclient.crashmanager.show_message(e);
                return $.Deferred().reject();
            }
        },
        _process_operations: function() {
            var self = this;
            return this.mutating_mutex.exec(function() {
                function iterate() {
                    var mutex = new $.Mutex();
                    _.each(self.fields, function(field) {
                        self.onchanges_mutex.def.then(function() {
                            mutex.exec(function() {
                                return field.commit_value();
                            });
                        });
                    });
                    var args = _.toArray(arguments);
                    return $.when.apply(null, [mutex.def, self.onchanges_mutex.def]).then(function() {
                        var save_obj = self.save_list.pop();
                        if (save_obj) {
                            return self._process_save(save_obj).then(function() {
                                save_obj.ret = _.toArray(arguments);
                                return iterate();
                            }, function() {
                                save_obj.error = true;
                            });
                        }
                        return $.when();
                    }).fail(function() {
                        self.save_list.pop();
                        return $.when();
                    });
                }
                return iterate();
            });
        },
        _internal_set_values: function(values) {
            for (var f in values) {
                if (!values.hasOwnProperty(f)) {
                    continue;
                }
                var field = this.fields[f];
                if (field) {
                    var value_ = values[f];
                    if (field.get_value() != value_) {
                        field._inhibit_on_change_flag = true;
                        field.set_value(value_);
                        field._inhibit_on_change_flag = false;
                        field._dirty_flag = true;
                    }
                }
            }
            this.on_form_changed();
        },
        set_values: function(values) {
            var self = this;
            return this.mutating_mutex.exec(function() {
                self._internal_set_values(values);
            });
        },
        to_view_mode: function() {
            this._actualize_mode("view");
        },
        to_edit_mode: function() {
            this.onchanges_mutex = new $.Mutex();
            this._actualize_mode("edit");
        },
        _actualize_mode: function(switch_to) {
            var mode = switch_to || this.get("actual_mode");
            if (!this.datarecord.id) {
                mode = "create";
            } else if (mode === "create") {
                mode = "edit";
            }
            this.render_value_defs = [];
            this.set({
                actual_mode: mode
            });
        },
        check_actual_mode: function(source, options) {
            var self = this;
            if (this.get("actual_mode") === "view") {
                self.$el.removeClass('oe_form_editable').addClass('oe_form_readonly');
                self.$buttons.find('.oe_form_buttons_edit').hide();
                self.$buttons.find('.oe_form_buttons_view').show();
                self.$sidebar.show();
            } else {
                self.$el.removeClass('oe_form_readonly').addClass('oe_form_editable');
                self.$buttons.find('.oe_form_buttons_edit').show();
                self.$buttons.find('.oe_form_buttons_view').hide();
                self.$sidebar.hide();
                this.autofocus();
            }
        },
        autofocus: function() {
            if (this.get("actual_mode") !== "view" && !this.options.disable_autofocus) {
                var fields_order = this.fields_order.slice(0);
                if (this.default_focus_field) {
                    fields_order.unshift(this.default_focus_field.name);
                }
                for (var i = 0; i < fields_order.length; i += 1) {
                    var field = this.fields[fields_order[i]];
                    if (!field.get('effective_invisible') && !field.get('effective_readonly') && field.$label) {
                        if (field.focus() !== false) {
                            break;
                        }
                    }
                }
            }
        },
        on_button_save: function(e) {
            var self = this;
            $(e.target).attr("disabled", true);
            return this.save().done(function(result) {
                self.trigger("save", result);
                self.reload().then(function() {
                    self.to_view_mode();
                    var menu = instance.webclient.menu;
                    if (menu) {
                        menu.do_reload_needaction();
                    }
                });
            }).always(function() {
                $(e.target).attr("disabled", false);
            });
        },
        on_button_cancel: function(event) {
            var self = this;
            if (this.can_be_discarded()) {
                if (this.get('actual_mode') === 'create') {
                    this.trigger('history_back');
                } else {
                    this.to_view_mode();
                    $.when.apply(null, this.render_value_defs).then(function() {
                        self.trigger('load_record', self.datarecord);
                    });
                }
            }
            this.trigger('on_button_cancel');
            return false;
        },
        on_button_new: function() {
            var self = this;
            this.to_edit_mode();
            return $.when(this.has_been_loaded).then(function() {
                if (self.can_be_discarded()) {
                    return self.load_defaults();
                }
            });
        },
        on_button_edit: function() {
            return this.to_edit_mode();
        },
        on_button_create: function() {
            this.dataset.index = null;
            this.do_show();
        },
        on_button_duplicate: function() {
            var self = this;
            return this.has_been_loaded.then(function() {
                return self.dataset.call('copy', [self.datarecord.id, {}, self.dataset.context]).then(function(new_id) {
                    self.record_created(new_id);
                    self.to_edit_mode();
                });
            });
        },
        on_button_delete: function() {
            var self = this;
            var def = $.Deferred();
            this.has_been_loaded.done(function() {
                if (self.datarecord.id && confirm(_t("Do you really want to delete this record?"))) {
                    self.dataset.unlink([self.datarecord.id]).done(function() {
                        if (self.dataset.size()) {
                            self.execute_pager_action('next');
                        } else {
                            self.do_action('history_back');
                        }
                        def.resolve();
                    });
                } else {
                    $.async_when().done(function() {
                        def.reject();
                    });
                }
            });
            return def.promise();
        },
        can_be_discarded: function() {
            if (this.$el.is('.oe_form_dirty')) {
                if (!confirm(_t("Warning, the record has been modified, your changes will be discarded.\n\nAre you sure you want to leave this page ?"))) {
                    return false;
                }
                this.$el.removeClass('oe_form_dirty');
            }
            return true;
        },
        save: function(prepend_on_create) {
            var self = this;
            var save_obj = {
                prepend_on_create: prepend_on_create,
                ret: null
            };
            this.save_list.push(save_obj);
            return self._process_operations().then(function() {
                if (save_obj.error)
                    return $.Deferred().reject();
                return $.when.apply($, save_obj.ret);
            }).done(function(result) {
                self.$el.removeClass('oe_form_dirty');
            });
        },
        _process_save: function(save_obj) {
            var self = this;
            var prepend_on_create = save_obj.prepend_on_create;
            try {
                var form_invalid = false,
                    values = {},
                    first_invalid_field = null,
                    readonly_values = {};
                for (var f in self.fields) {
                    if (!self.fields.hasOwnProperty(f)) {
                        continue;
                    }
                    f = self.fields[f];
                    if (!f.is_valid()) {
                        form_invalid = true;
                        if (!first_invalid_field) {
                            first_invalid_field = f;
                        }
                    } else if (f.name !== 'id' && (!self.datarecord.id || f._dirty_flag)) {
                        if (!f.get("readonly")) {
                            values[f.name] = f.get_value();
                        } else {
                            readonly_values[f.name] = f.get_value();
                        }
                    }
                }
                if (!self.datarecord.id && self.fields.sequence && !_.has(values, 'sequence') && !_.isEmpty(self.dataset.cache)) {
                    var current = _[prepend_on_create ? "min" : "max"](_.map(self.dataset.cache, function(o) {
                        return o.values.sequence
                    }));
                    values['sequence'] = prepend_on_create ? current - 1 : current + 1;
                }
                if (form_invalid) {
                    self.set({
                        'display_invalid_fields': true
                    });
                    first_invalid_field.focus();
                    self.on_invalid();
                    return $.Deferred().reject();
                } else {
                    self.set({
                        'display_invalid_fields': false
                    });
                    var save_deferral;
                    if (!self.datarecord.id) {
                        save_deferral = self.dataset.create(values, {
                            readonly_fields: readonly_values
                        }).then(function(r) {
                            return self.record_created(r, prepend_on_create);
                        }, null);
                    } else if (_.isEmpty(values)) {
                        save_deferral = $.Deferred().resolve({}).promise();
                    } else {
                        save_deferral = self.dataset.write(self.datarecord.id, values, {
                            readonly_fields: readonly_values
                        }).then(function(r) {
                            return self.record_saved(r);
                        }, null);
                    }
                    return save_deferral;
                }
            } catch (e) {
                console.error(e);
                return $.Deferred().reject();
            }
        },
        on_invalid: function() {
            var warnings = _(this.fields).chain().filter(function(f) {
                return !f.is_valid();
            }).map(function(f) {
                return _.str.sprintf('<li>%s</li>', _.escape(f.string));
            }).value();
            warnings.unshift('<ul>');
            warnings.push('</ul>');
            this.do_warn(_t("The following fields are invalid:"), warnings.join(''));
        },
        record_saved: function(r) {
            this.trigger('record_saved', r);
            if (!r) {
                return $.Deferred().reject();
            }
            return r;
        },
        record_created: function(r, prepend_on_create) {
            var self = this;
            if (!r) {
                this.trigger('record_created', r);
                return $.Deferred().reject();
            } else {
                this.datarecord.id = r;
                if (!prepend_on_create) {
                    this.dataset.alter_ids(this.dataset.ids.concat([this.datarecord.id]));
                    this.dataset.index = this.dataset.ids.length - 1;
                } else {
                    this.dataset.alter_ids([this.datarecord.id].concat(this.dataset.ids));
                    this.dataset.index = 0;
                }
                this.do_update_pager();
                if (this.sidebar) {
                    this.sidebar.do_attachement_update(this.dataset, this.datarecord.id);
                }
                return $.when(this.reload()).then(function() {
                    self.trigger('record_created', r);
                    return _.extend(r, {
                        created: true
                    });
                });
            }
        },
        on_action: function(action) {
            console.debug('Executing action', action);
        },
        reload: function() {
            var self = this;
            return this.reload_mutex.exec(function() {
                if (self.dataset.index === null || self.dataset.index === undefined) {
                    self.trigger("previous_view");
                    return $.Deferred().reject().promise();
                }
                if (self.dataset.index < 0) {
                    return $.when(self.on_button_new());
                } else {
                    var fields = _.keys(self.fields_view.fields);
                    fields.push('display_name');
                    return self.dataset.read_index(fields, {
                        context: {
                            'bin_size': true
                        },
                        check_access_rule: true
                    }).then(function(r) {
                        self.trigger('load_record', r);
                    }).fail(function() {
                        self.do_action('history_back');
                    });
                }
            });
        },
        get_widgets: function() {
            return _.filter(this.getChildren(), function(obj) {
                return obj instanceof instance.web.form.FormWidget;
            });
        },
        get_fields_values: function() {
            var values = {};
            var ids = this.get_selected_ids();
            values["id"] = ids.length > 0 ? ids[0] : false;
            _.each(this.fields, function(value_, key) {
                values[key] = value_.get_value();
            });
            return values;
        },
        get_selected_ids: function() {
            var id = this.dataset.ids[this.dataset.index];
            return id ? [id] : [];
        },
        recursive_save: function() {
            var self = this;
            return $.when(this.save()).then(function(res) {
                if (self.dataset.parent_view)
                    return self.dataset.parent_view.recursive_save();
            });
        },
        recursive_reload: function() {
            var self = this;
            var pre = $.when();
            if (self.dataset.parent_view)
                pre = self.dataset.parent_view.recursive_reload();
            return pre.then(function() {
                return self.reload();
            });
        },
        is_dirty: function() {
            return _.any(this.fields, function(value_) {
                return value_._dirty_flag;
            });
        },
        is_interactible_record: function() {
            var id = this.datarecord.id;
            if (!id) {
                if (this.options.not_interactible_on_create)
                    return false;
            } else if (typeof(id) === "string") {
                if (instance.web.BufferedDataSet.virtual_id_regex.test(id))
                    return false;
            }
            return true;
        },
        sidebar_eval_context: function() {
            return $.when(this.build_eval_context());
        },
        open_defaults_dialog: function() {
            var self = this;
            var display = function(field, value) {
                if (!value) {
                    return value;
                }
                if (field instanceof instance.web.form.FieldSelection) {
                    return _(field.get('values')).find(function(option) {
                        return option[0] === value;
                    })[1];
                } else if (field instanceof instance.web.form.FieldMany2One) {
                    return field.get_displayed();
                }
                return value;
            };
            var fields = _.chain(this.fields).map(function(field) {
                var value = field.get_value();
                if (!value || field.get('invisible') || field.get("readonly") || field.field.type === 'one2many' || field.field.type === 'many2many' || field.field.type === 'binary' || field.password) {
                    return false;
                }
                return {
                    name: field.name,
                    string: field.string,
                    value: value,
                    displayed: display(field, value),
                };
            }).compact().sortBy(function(field) {
                return field.string;
            }).value();
            var conditions = _.chain(self.fields).filter(function(field) {
                return field.field.change_default;
            }).map(function(field) {
                var value = field.get_value();
                return {
                    name: field.name,
                    string: field.string,
                    value: value,
                    displayed: display(field, value),
                };
            }).value();
            var d = new instance.web.Dialog(this, {
                title: _t("Set Default"),
                args: {
                    fields: fields,
                    conditions: conditions
                },
                buttons: [{
                    text: _t("Close"),
                    click: function() {
                        d.close();
                    }
                }, {
                    text: _t("Save default"),
                    click: function() {
                        var $defaults = d.$el.find('#formview_default_fields');
                        var field_to_set = $defaults.val();
                        if (!field_to_set) {
                            $defaults.parent().addClass('oe_form_invalid');
                            $defaults.parent().addClass('has-feedback has-error');
                            return;
                        }
                        var condition = d.$el.find('#formview_default_conditions').val(),
                            all_users = d.$el.find('#formview_default_all').is(':checked');
                        new instance.web.DataSet(self, 'ir.values').call('set_default', [self.dataset.model, field_to_set, self.fields[field_to_set].get_value(), all_users, true, condition || false]).done(function() {
                            d.close();
                        });
                    }
                }]
            });
            d.template = 'FormView.set_default';
            d.open();
        },
        register_field: function(field, name) {
            this.fields[name] = field;
            this.fields_order.push(name);
            if (JSON.parse(field.node.attrs.default_focus || "0")) {
                this.default_focus_field = field;
            }
            field.on('focused', null, this.proxy('widgetFocused')).on('blurred', null, this.proxy('widgetBlurred'));
            if (this.get_field_desc(name).translate) {
                this.translatable_fields.push(field);
            }
            field.on('changed_value', this, function() {
                if (field.is_syntax_valid()) {
                    this.trigger('field_changed:' + name);
                }
                if (field._inhibit_on_change_flag) {
                    return;
                }
                field._dirty_flag = true;
                if (field.is_syntax_valid()) {
                    this.do_onchange(field);
                    this.on_form_changed(true);
                    this.do_notify_change();
                }
            });
        },
        get_field_desc: function(field_name) {
            return this.fields_view.fields[field_name];
        },
        get_field_value: function(field_name) {
            return this.fields[field_name].get_value();
        },
        compute_domain: function(expression) {
            return instance.web.form.compute_domain(expression, this.fields);
        },
        _build_view_fields_values: function() {
            var a_dataset = this.dataset;
            var fields_values = this.get_fields_values();
            var active_id = a_dataset.ids[a_dataset.index];
            _.extend(fields_values, {
                active_id: active_id || false,
                active_ids: active_id ? [active_id] : [],
                active_model: a_dataset.model,
                parent: {}
            });
            if (a_dataset.parent_view) {
                fields_values.parent = a_dataset.parent_view.get_fields_values();
            }
            return fields_values;
        },
        build_eval_context: function() {
            var a_dataset = this.dataset;
            return new instance.web.CompoundContext(a_dataset.get_context(), this._build_view_fields_values());
        },
    });
    instance.web.form.ResponsiveFormRenderingEngine = instance.web.form.FormRenderingEngine.extend({
        render_to: function($target) {
            var self = this;
            this.$target = $target;
            this.$form = this.get_arch_fragment();
            this.process_version();
            this.fields_to_init = [];
            this.tags_to_init = [];
            this.widgets_to_init = [];
            this.labels = {};
            this.process(this.$form);
            this.$form.appendTo(this.$target);
            this.to_replace = [];
            _.each(this.fields_to_init, function($elem) {
                var name = $elem.attr("name");
                if (!self.fvg.fields[name]) {
                    throw new Error(_.str.sprintf(_t("Field '%s' specified in view could not be found."), name));
                }
                var obj = self.fields_registry.get_any([$elem.attr('widget'), self.fvg.fields[name].type]);
                if (!obj) {
                    throw new Error(_.str.sprintf(_t("Widget type '%s' is not implemented"), $elem.attr('widget')));
                }
                var w = new(obj)(self.view, instance.web.xml_to_json($elem[0]));
                var $label = self.labels[$elem.attr("name")];
                if ($label) {
                    w.set_input_id($label.attr("for"));
                }
                self.alter_field(w);
                self.view.register_field(w, $elem.attr("name"));
                self.to_replace.push([w, $elem]);
            });
            _.each(this.tags_to_init, function($elem) {
                var tag_name = $elem[0].tagName.toLowerCase();
                var obj = self.tags_registry.get_object(tag_name);
                var w = new(obj)(self.view, instance.web.xml_to_json($elem[0]));
                self.to_replace.push([w, $elem]);
            });
            _.each(this.widgets_to_init, function($elem) {
                var widget_type = $elem.attr("type");
                var obj = self.widgets_registry.get_object(widget_type);
                var w = new(obj)(self.view, instance.web.xml_to_json($elem[0]));
                self.to_replace.push([w, $elem]);
            });
            if (this.$target.find('.r_notebook_wrapper').length !== 0) {
                var $n_wrapper = this.$target.find('.r_notebook_wrapper');
                var $notebook = $n_wrapper.find('ul.oe_notebook');
                var $tabs_wrapper = $notebook.wrap($('<div></div>').addClass('r_tabs_wrapper'));
            }
            if (this.$target.find('.oe_button_box [widget="website_button"]').length !== 0) {
                this.$target.find('.oe_button_box [widget="website_button"]').insertAfter('.oe_button_box');
            }
            if ((this.$target.find('.oe_button_box').length !== 0) && (this.$target.find('.oe_button_box').parents('.oe_button_box_wrapper').length === 0)) {
                this.$target.find('.oe_button_box').wrap($('<div></div>').addClass('oe_button_box_wrapper'));
                var $wrapper = this.$target.find('.oe_button_box_wrapper');
                var $button_box = $wrapper.find('.oe_button_box');
                $wrapper.css({
                    'width': '100%',
                    'min-width': '100%',
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'height': '41px',
                    'overflow': 'hidden',
                    'padding': '0px 25px',
                });
            }
        },
        attach_node_attr: function($new_element, $node, attr) {
            $new_element.data(attr, $node.attr(attr));
        },
        process_group: function($group) {
            var self = this;
            $group.children('field').each(function() {
                self.preprocess_field($(this));
            });
            var $new_group = this.render_element('FormRenderingGroup', $group.getAttributes());
            var $table;
            if ($new_group.first().is('table.oe_form_group')) {
                $table = $new_group;
            } else if ($new_group.filter('table.oe_form_group').length) {
                $table = $new_group.filter('table.oe_form_group').first();
            } else {
                $table = $new_group.find('table.oe_form_group').first();
            }
            var $tr, $td, cols = parseInt($group.attr('col') || 2, 10),
                row_cols = cols;
            var children = [];
            $group.children().each(function(a, b, c) {
                var $child = $(this);
                var colspan = parseInt($child.attr('colspan') || 1, 10);
                var tagName = $child[0].tagName.toLowerCase();
                var $td = $('<td/>').addClass('oe_form_group_cell').attr('colspan', colspan);
                var newline = tagName === 'newline';
                if (tagName === 'group' && $child.children('group').length == 0) {
                    $td.addClass('oe_ground_group');
                }
                if ($tr && row_cols > 0 && (newline || row_cols < colspan)) {
                    $tr.addClass('oe_form_group_row_incomplete');
                    if (newline) {
                        $tr.addClass('oe_form_group_row_newline');
                    }
                }
                if (newline) {
                    $tr = null;
                    return;
                }
                if (!$tr || row_cols < colspan) {
                    $tr = $('<tr/>').addClass('oe_form_group_row').appendTo($table);
                    row_cols = cols;
                } else if (tagName === 'group') {
                    $td.addClass('oe_group_right');
                }
                row_cols -= colspan;
                var field_modifiers = JSON.parse($child.attr('modifiers') || '{}');
                var invisible = field_modifiers.invisible;
                self.handle_common_properties($td, $("<dummy>").attr("modifiers", JSON.stringify({
                    invisible: invisible
                })));
                $tr.append($td.append($child));
                children.push($child[0]);
            });
            if (row_cols && $td) {
                $td.attr('colspan', parseInt($td.attr('colspan'), 10) + row_cols);
            }
            $group.before($new_group).remove();
            $table.find('> tbody > tr').each(function() {
                var to_compute = [],
                    row_cols = cols,
                    total = 100;
                $(this).children().each(function() {
                    var $td = $(this),
                        $child = $td.children(':first');
                    if ($child.attr('cell-class')) {
                        $td.addClass($child.attr('cell-class'));
                    }
                    switch ($child[0].tagName.toLowerCase()) {
                        case 'separator':
                            break;
                        case 'label':
                            if ($child.attr('for')) {
                                $td.attr('width', '1%').addClass('oe_form_group_cell_label');
                                row_cols -= $td.attr('colspan') || 1;
                                total--;
                            }
                            break;
                        default:
                            var width = _.str.trim($child.attr('width') || ''),
                                iwidth = parseInt(width, 10);
                            if (iwidth) {
                                if (width.substr(-1) === '%') {
                                    total -= iwidth;
                                    width = iwidth + '%';
                                } else {
                                    $td.css('min-width', width + 'px');
                                }
                                $td.attr('width', width);
                                $child.removeAttr('width');
                                row_cols -= $td.attr('colspan') || 1;
                            } else {
                                to_compute.push($td);
                            }
                    }
                });
                if (row_cols) {
                    var unit = Math.floor(total / row_cols);
                    if (!$(this).is('.oe_form_group_row_incomplete')) {
                        _.each(to_compute, function($td, i) {
                            var width = parseInt($td.attr('colspan'), 10) * unit;
                            $td.attr('width', width + '%');
                            total -= width;
                        });
                    }
                }
            });
            _.each(children, function(el) {
                self.process($(el));
            });
            this.handle_common_properties($new_group, $group);
            return $new_group;
        },
        process_sheet: function($sheet) {
            var $new_sheet = this.render_element('FormRenderingSheet', $sheet.getAttributes());
            this.handle_common_properties($new_sheet, $sheet);
            var $dst = $new_sheet.find('.oe_form_sheet');
            $sheet.contents().appendTo($dst);
            $sheet.before($new_sheet).remove();
            $new_sheet.has('.oe_button_box').css({
                'padding-top': '50px',
            });
            this.process($new_sheet);
        },
        process_notebook: function($notebook) {
            var self = this;
            var pages = [];
            $notebook.find('> page').each(function() {
                var $page = $(this);
                var page_attrs = $page.getAttributes();
                page_attrs.id = _.uniqueId('notebook_page_');
                var $new_page = self.render_element('FormRenderingNotebookPage', page_attrs);
                $page.contents().appendTo($new_page);
                $page.before($new_page).remove();
                var ic = self.handle_common_properties($new_page, $page).invisibility_changer;
                page_attrs.__page = $new_page;
                page_attrs.__ic = ic;
                pages.push(page_attrs);
                $new_page.children().each(function() {
                    self.process($(this));
                });
            });
            var $new_notebook = this.render_element('FormRenderingNotebook', {
                pages: pages
            });
            $notebook.contents().appendTo($new_notebook);
            $notebook.before($new_notebook).remove();
            self.process($($new_notebook.children()[0]));
            $new_notebook.tabs();
            _.each(pages, function(page, i) {
                if (!page.__ic)
                    return;
                page.__ic.on("change:effective_invisible", null, function() {
                    if (!page.__ic.get('effective_invisible') && page.autofocus) {
                        $new_notebook.tabs('select', i);
                        return;
                    }
                    var current = $new_notebook.tabs("option", "selected");
                    if (!pages[current].__ic || !pages[current].__ic.get("effective_invisible"))
                        return;
                    var first_visible = _.find(_.range(pages.length), function(i2) {
                        return (!pages[i2].__ic) || (!pages[i2].__ic.get("effective_invisible"));
                    });
                    if (first_visible !== undefined) {
                        $new_notebook.tabs('select', first_visible);
                    }
                });
            });
            this.handle_common_properties($new_notebook, $notebook);
            return $new_notebook;
        },
        process_separator: function($separator) {
            var $new_separator = this.render_element('FormRenderingSeparator', $separator.getAttributes());
            $separator.before($new_separator).remove();
            this.handle_common_properties($new_separator, $separator);
            return $new_separator;
        },
        process_label: function($label) {
            var name = $label.attr("for"),
                field_orm = this.fvg.fields[name];
            var dict = {
                string: $label.attr('string') || (field_orm || {}).string || '',
                help: $label.attr('help') || (field_orm || {}).help || '',
                _for: name ? _.uniqueId('oe_field_input_') : undefined,
            };
            var $new_label = this.render_element('FormRenderingLabel', dict);
            $label.before($new_label).remove();
            this.handle_common_properties($new_label, $label);
            if (name) {
                this.labels[name] = $new_label;
            }
            return $new_label;
        },
    });
    instance.web.form.ResponsiveFieldEmail = instance.web.form.FieldEmail.extend({
        template: 'ResponsiveFieldEmail',
    });
    instance.web.form.ResponsiveFieldUrl = instance.web.form.FieldUrl.extend({
        template: 'ResponsiveFieldUrl',
    });
    instance.web.form.ResponsiveFieldChar = instance.web.form.FieldChar.extend({
        template: 'ResponsiveFieldChar',
        widget_class: 'oe_form_field_char',
        events: {
            'change input': 'store_dom_value',
        },
        initialize_content: function() {
            this.setupFocus(this.$('input'));
        },
        store_dom_value: function() {
            if (!this.get('effective_readonly') && this.$('input').length && this.is_syntax_valid()) {
                this.internal_set_value(this.parse_value(this.$('input').val()));
            }
        },
        commit_value: function() {
            this.store_dom_value();
            return this._super();
        },
        render_value: function() {
            var show_value = this.format_value(this.get('value'), '');
            if (!this.get("effective_readonly")) {
                this.$el.find('input').val(show_value);
            } else {
                if (this.password) {
                    show_value = new Array(show_value.length + 1).join('*');
                }
                this.$(".oe_form_char_content").text(show_value);
            }
        },
        is_syntax_valid: function() {
            if (!this.get("effective_readonly") && this.$("input").size() > 0) {
                try {
                    this.parse_value(this.$('input').val(), '');
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return true;
        },
        parse_value: function(val, def) {
            return instance.web.parse_value(val, this, def);
        },
        format_value: function(val, def) {
            return instance.web.format_value(val, this, def);
        },
        is_false: function() {
            return this.get('value') === '' || this._super();
        },
        focus: function() {
            var input = this.$('input:first')[0];
            return input ? input.focus() : false;
        },
        set_dimensions: function(height, width) {
            this._super(height, width);
            this.$('input').css({
                height: height,
                width: width
            });
        }
    });
    instance.web.form.ResponsiveFieldMany2One = instance.web.form.FieldMany2One.extend({
        template: "ResponsiveFieldMany2One",
    });
    instance.web.DateTimeWidget.include({
        template: "inshas.datepicker",
        jqueryui_object: 'datetimepicker',
        type_of_date: "datetime",
        pickTime: true,
        events: {
            'change .oe_datepicker_master': 'change_datetime',
            'keypress .oe_datepicker_master': 'change_datetime',
        },
        start: function() {
            var self = this;
            this.$input = this.$el.find('.oe_datepicker_master');
            this.$input_picker = this.$el.find('.input-group.date');
            moment.locale(Date.CultureInfo.name, {
                week: {
                    dow: Date.CultureInfo.firstDayOfWeek,
                }
            });
            var format_ = this.pickTime ? "L HH:mm:ss" : "L"
            this.picker({
                defaultDate: Date.now(),
                toolbarPlacement: 'bottom',
                showTodayButton: true,
                showClear: true,
                showClose: false,
                format: format_,
                calendarWeeks: true,
                useCurrent: true
            });
            this.set_readonly(false);
            this.set({
                'value': false
            });
            this.$input_picker.on('dp.hide', function(ev) {
                self.on_picker_close(ev.date.format(self.pickTime ? "L HH:mm:ss" : "L"), ev.date);
                self.change_datetime(ev);
            });
            this.$input_picker.on('dp.change', function(ev) {
                self.on_picker_select(ev.date.format(self.pickTime ? "L HH:mm:ss" : "L"), ev.date);
                self.change_datetime(ev);
            });
        },
        picker: function() {
            if (this.jqueryui_object !== 'datetimepicker') {
                this.jqueryui_object = 'datetimepicker';
            }
            return $.fn[this.jqueryui_object].apply(this.$input_picker, arguments);
        },
        on_picker_close: function(text, date_) {
            this.on_picker_select(text, date_);
            this.$input.focus();
        },
        on_picker_select: function(text, date_) {
            var date = date_;
            this.$input.val(date ? this.format_client(date._d) : '');
            this.$input.trigger('change');
        },
        set_value: function(value_) {
            this.set({
                'value': value_
            });
            this.$input.val(value_ ? this.format_client(value_) : '');
        },
        get_value: function() {
            return this.get('value');
        },
        set_value_from_ui_: function() {
            var value_ = this.$input.val() || false;
            this.set({
                'value': this.parse_client(value_)
            });
        },
        set_readonly: function(readonly) {
            this.readonly = readonly;
            this.$input.prop('readonly', this.readonly);
            this.$el.find('img.oe_datepicker_trigger').toggleClass('oe_input_icon_disabled', readonly);
        },
        is_valid_: function() {
            var value_ = this.$input.val();
            if (value_ === "") {
                return true;
            } else {
                try {
                    this.parse_client(value_);
                    return true;
                } catch (e) {
                    return false;
                }
            }
        },
        parse_client: function(v) {
            return instance.web.parse_value(v, {
                "widget": this.type_of_date
            });
        },
        format_client: function(v) {
            return instance.web.format_value(v, {
                "widget": this.type_of_date
            });
        },
        change_datetime: function(e) {
            if ((e.type !== "keypress" || e.which === 13) && this.is_valid_()) {
                this.set_value_from_ui_();
                this.trigger("datetime_changed");
            }
        },
        commit_value: function() {
            this.change_datetime();
        },
    });
    instance.web.ResponsiveDateWidget = instance.web.DateTimeWidget.extend({
        jqueryui_object: 'datetimepicker',
        type_of_date: "date",
        pickTime: false,
    });
    instance.web.form.ResponsiveFieldDatetime = instance.web.form.FieldDatetime.extend({
        build_widget: function() {
            return new instance.web.DateTimeWidget(this);
        },
    });
    instance.web.form.ResponsiveFieldDate = instance.web.form.FieldDate.extend({
        build_widget: function() {
            return new instance.web.ResponsiveDateWidget(this);
        }
    });
    instance.web.form.One2ManyListView.include({
        _template: 'ResponsiveOne2Many.listview',
    });
    instance.web.form.ResponsiveFieldFloat = instance.web.form.ResponsiveFieldChar.extend({
        is_field_number: true,
        widget_class: 'oe_form_field_float',
        init: function(field_manager, node) {
            this._super(field_manager, node);
            this.internal_set_value(0);
            if (this.node.attrs.digits) {
                this.digits = this.node.attrs.digits;
            } else {
                this.digits = this.field.digits;
            }
        },
        set_value: function(value_) {
            if (value_ === false || value_ === undefined) {
                value_ = 0;
            }
            if (this.digits !== undefined && this.digits.length === 2) {
                value_ = instance.web.round_decimals(value_, this.digits[1]);
            }
            this._super.apply(this, [value_]);
        },
        focus: function() {
            var $input = this.$('input:first');
            return $input.length ? $input.select() : false;
        }
    });
    instance.web.form.ResponsiveFieldText = instance.web.form.FieldText.extend({
        template: 'ResponsiveFieldText',
    });
    instance.web.form.ResponsiveFieldMany2ManyTags = instance.web.form.FieldMany2ManyTags.extend({
        template: "ResponsiveFieldMany2ManyTags",
    });
    instance.web.form.ResponsiveFieldSelection = instance.web.form.FieldSelection.extend({
        template: 'ResponsiveFieldSelection',
        render_value: function() {
            var values = this.get("values");
            values = [
                [false, this.node.attrs.placeholder || '']
            ].concat(values);
            var found = _.find(values, function(el) {
                return el[0] === this.get("value");
            }, this);
            if (!found) {
                found = [this.get("value"), _t('Unknown')];
                values = [found].concat(values);
            }
            if (!this.get("effective_readonly")) {
                this.$().html(QWeb.render("ResponsiveFieldSelectionSelect", {
                    widget: this,
                    values: values
                }));
                this.$("select").val(JSON.stringify(found[0]));
            } else {
                this.$el.text(found[1]);
            }
        },
    });
    instance.web.form.ResponsiveFieldBoolean = instance.web.form.FieldBoolean.extend({
        template: 'ResponsiveFieldBoolean',
    });
    instance.web.form.ResponsiveFieldRadio = instance.web.form.FieldRadio.extend({
        template: 'ResponsiveFieldRadio',
    });
    instance.web.form.widgets = instance.web.form.widgets.extend({
        'char': 'instance.web.form.ResponsiveFieldChar',
        'email': 'instance.web.form.ResponsiveFieldEmail',
        'url': 'instance.web.form.ResponsiveFieldUrl',
        'date': 'instance.web.form.ResponsiveFieldDate',
        'datetime': 'instance.web.form.ResponsiveFieldDatetime',
        'many2one': 'instance.web.form.ResponsiveFieldMany2One',
        'float': 'instance.web.form.ResponsiveFieldFloat',
        'integer': 'instance.web.form.ResponsiveFieldFloat',
        'float_time': 'instance.web.form.ResponsiveFieldFloat',
        'text': 'instance.web.form.ResponsiveFieldText',
        'many2many_tags': 'instance.web.form.ResponsiveFieldMany2ManyTags',
        'image': 'instance.web.form.FieldBinaryImage',
        'selection': 'instance.web.form.ResponsiveFieldSelection',
        'boolean': 'instance.web.form.ResponsiveFieldBoolean',
        'radio': 'instance.web.form.ResponsiveFieldRadio',
        'many2many': 'instance.web.form.FieldMany2Many',
        'one2many': 'instance.web.form.FieldOne2Many',
        'one2many_list': 'instance.web.form.FieldOne2Many',
        'html': 'instance.web.form.FieldTextHtml',
        'id': 'instance.web.form.FieldID',
        'char_domain': 'instance.web.form.FieldCharDomain',
        'many2onebutton': 'instance.web.form.Many2OneButton',
        'many2many_kanban': 'instance.web.form.FieldMany2ManyKanban',
        'reference': 'instance.web.form.FieldReference',
        'percentpie': 'instance.web.form.FieldPercentPie',
        'barchart': 'instance.web.form.FieldBarChart',
        'progressbar': 'instance.web.form.FieldProgressBar',
        'binary': 'instance.web.form.FieldBinaryFile',
        'many2many_binary': 'instance.web.form.FieldMany2ManyBinaryMultiFiles',
        'statusbar': 'instance.web.form.FieldStatus',
        'monetary': 'instance.web.form.FieldMonetary',
        'many2many_checkboxes': 'instance.web.form.FieldMany2ManyCheckBoxes',
        'x2many_counter': 'instance.web.form.X2ManyCounter',
        'priority': 'instance.web.form.Priority',
        'kanban_state_selection': 'instance.web.form.KanbanSelection',
        'statinfo': 'instance.web.form.StatInfo',
    });
})();;

/* /web_mobile_responsive_app/static/src/js/widgets/list_editable.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.ListView.include({
        start_edition: function(record, options) {
            var self = this;
            this.edit_inline_cond = true;
            this.editor.edit_inline_cond = true;
            var item = false;
            if (record) {
                item = record.attributes;
                this.dataset.select_id(record.get('id'));
            } else {
                record = this.make_empty_record(false);
                this.records.add(record, {
                    at: this.prepends_on_create() ? 0 : null
                });
            }
            return this.ensure_saved().then(function() {
                return $.when.apply(null, self.editor.form.render_value_defs);
            }).then(function() {
                var $recordRow = self.groups.get_row_for(record);
                var cells = self.get_cells_for($recordRow);
                var fields = {};
                self.fields_for_resize.splice(0, self.fields_for_resize.length);
                return self.with_event('edit', {
                    record: record.attributes,
                    cancel: false
                }, function() {
                    return self.editor.edit(item, function(field_name, field) {
                        var cell = cells[field_name];
                        if (!cell) {
                            return;
                        }
                        field.$el.attr('data-fieldname', field_name);
                        fields[field_name] = field;
                        self.fields_for_resize.push({
                            field: field,
                            cell: cell
                        });
                    }, options).then(function() {
                        $recordRow.addClass('oe_edition');
                        if (self.edit_inline_cond) {
                            self.resize_fields();
                        } else {
                            self.show_edit_form($recordRow);
                        }
                        if (self.editor.form.inline_form_footer) {
                            self.editor.form.inline_form_footer.toggle(!self.edit_inline_cond);
                        }
                        var focus_field = options && options.focus_field ? options.focus_field : undefined;
                        if (!focus_field) {
                            focus_field = _.find(self.editor.form.fields_order, function(field) {
                                return fields[field] && fields[field].$el.is(':visible:has(input)');
                            });
                        }
                        if (focus_field && fields[focus_field]) fields[focus_field].$el.find('input').select();
                        return record.attributes;
                    });
                }).fail(function() {
                    if (!record.get('id')) {
                        self.records.remove(record);
                    }
                });
            });
        },
        resize_fields: function() {
            if (!this.editor.is_editing()) {
                return;
            }
            for (var i = 0, len = this.fields_for_resize.length; i < len; ++i) {
                var item = this.fields_for_resize[i];
                this.resize_field(item.field, item.cell);
            }
            this.$el.find('.oe_form_container.oe_form_nosheet').css({
                'height': '0px',
            });
        },
        resize_field: function(field, cell) {
            var $cell = $(cell);
            field.set_dimensions($cell.outerHeight(), $cell.outerWidth());
            field.$el.css({
                top: 0,
                left: 0
            }).position({
                my: 'left top',
                at: 'left top',
                of: $cell
            });
            if (field.get('effective_readonly')) {
                field.$el.addClass('oe_readonly');
            }
            if (field.widget == "handle")
                field.$el.addClass('oe_list_field_handle');
            field.$el.find('.form-group').css({
                'padding': '0px',
            });
        },
        show_edit_form: function(recordRow) {
            var self = this;
            if (!this.editor.is_editing()) {
                return;
            }
            var target_list = this.$el.find('.table-responsive');
            self.editor.form.$el.hide();
            if (!self.editor.form.has_responsive_footer) {
                self.add_actions_to_form(self.editor.form.$el);
                self.editor.form.has_responsive_footer = true;
                for (var i = 0, len = this.fields_for_resize.length; i < len; ++i) {
                    var item = this.fields_for_resize[i];
                    item.field.$el.before('<p><b>' + item.field.string + '</b></p>');
                }
            }
            self.editor.form.$el.slideToggle(false);
            target_list.slideToggle().css({
                'overflow-x': 'auto'
            });
            return;
        },
        add_actions_to_form: function($form) {
            var self = this;
            var inline_form_footer = $('<div class="btn-group" role="role" style="width:100% !important;"></div>').append($('<a href="#" class="btn btn-danger" style="color:#fff;">Save</a>').off('click touchstart').on('click touchstart', function(e) {
                e.preventDefault();
                self.save_edition();
                self.$el.find('.table-responsive').slideToggle(function() {
                    $(this).css({
                        'overflow-x': 'auto'
                    });
                });
            })).append($('<a href="#" class="btn btn-default">Cancel</a>').off('click touchstart').on('click touchstart', function(e) {
                e.preventDefault();
                self.cancel_edition(true);
                self.$el.find('.table-responsive').slideToggle(function() {
                    $(this).css({
                        'overflow-x': 'auto'
                    });
                });
            }));
            $form.append(inline_form_footer);
            self.editor.form.inline_form_footer = inline_form_footer;
            return;
        }
    });
    instance.web.list.Editor.include({
        init: function(parent, options) {
            this._super(parent);
            this.options = options || {};
            _.defaults(this.options, {
                formView: instance.web.ResponsiveFormView,
                delegate: this.getParent()
            });
            this.delegate = this.options.delegate;
            this.record = null;
            this.form = new(this.options.formView)(this, this.delegate.dataset, false, {
                initial_mode: 'edit',
                disable_autofocus: true,
                $buttons: $(),
                $pager: $()
            });
        },
        edit: function(record, configureField, options) {
            var self = this;
            var form = self.form;
            var loaded = record ? form.trigger('load_record', _.extend({}, record)) : form.load_defaults();
            return $.when(loaded).then(function() {
                if (self.edit_inline_cond) {
                    form.$el.find('.oe_form_field').css({
                        'position': 'absolute',
                    });
                }
                return form.do_show({
                    reload: false
                });
            }).then(function() {
                self.record = form.datarecord;
                _(form.fields).each(function(field, name) {
                    configureField(name, field);
                });
                return form;
            });
        },
    });
})();;

/* /web_mobile_responsive_app/static/src/js/widgets/treeview.js defined in bundle 'web.assets_backend' */
(function() {
    var instance = openerp;
    var QWeb = instance.web.qweb,
        _t = instance.web._t,
        _lt = instance.web._lt;
    instance.web.TreeView.include({
        load_tree: function(fields_view) {
            var self = this;
            var has_toolbar = !!fields_view.arch.attrs.toolbar;
            this.children_field = fields_view['field_parent'];
            this.fields_view = fields_view;
            _(this.fields_view.arch.children).each(function(field) {
                if (field.attrs.modifiers) {
                    field.attrs.modifiers = JSON.parse(field.attrs.modifiers);
                }
            });
            this.fields = fields_view.fields;
            this.hook_row_click();
            this.$el.html(QWeb.render('ResponsiveTreeView', {
                'title': this.fields_view.arch.attrs.string,
                'fields_view': this.fields_view.arch.children,
                'fields': this.fields,
                'toolbar': has_toolbar
            }));
            this.$el.addClass(this.fields_view.arch.attrs['class']);
            this.dataset.read_slice(this.fields_list()).done(function(records) {
                if (!has_toolbar) {
                    self.getdata(null, _(records).pluck('id'));
                    return;
                }
                var $select = self.$el.find('select').change(function() {
                    var $option = $(this).find(':selected');
                    self.getdata($option.val(), $option.data('children'));
                });
                _(records).each(function(record) {
                    self.records[record.id] = record;
                    $('<option>').val(record.id).text(record.name).data('children', record[self.children_field]).appendTo($select);
                });
                if (!_.isEmpty(records)) {
                    $select.change();
                }
            });
            this.do_push_state({});
            if (!this.fields_view.arch.attrs.colors) {
                return;
            }
            this.colors = _(this.fields_view.arch.attrs.colors.split(';')).chain().compact().map(function(color_pair) {
                var pair = color_pair.split(':'),
                    color = pair[0],
                    expr = pair[1];
                return [color, py.parse(py.tokenize(expr)), expr];
            }).value();
        },
    });
})();;

/* <inline asset> defined in bundle 'web.assets_backend' */
(function() {
    openerp.im_odoo_support.support = new openerp.im_odoo_support.OdooSupport("demo", "6eee8d8e-0977-11e6-83b6-12207746c6ef");
})();;