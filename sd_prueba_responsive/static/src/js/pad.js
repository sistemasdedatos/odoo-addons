(function(){
    var instance = openerp;
    var QWeb = instance.web.qweb,
          _t =  instance.web._t,
          _lt = instance.web._lt;

  openerp.session.rpc('/web/session/modules', {}).then(function(result){
    if(_.indexOf(result, 'pad') !== -1){
      instance.web.form.FieldPad.include({
        initialize_content: function() {
            var self = this;
            this.$('.oe_pad_switch').click(function() {
                self.$el.toggleClass('oe_pad_fullscreen');
                // hide the `#inshasview-tools`, `aside.left-panel`, and `.oe_chatter`
                var isFullScreen = self.$el.hasClass('oe_pad_fullscreen');
                $('#inshasview-tools').toggle(!isFullScreen);
                $('aside.left-panel').toggle(!isFullScreen);
                // can't understand why it should be different!!
                $('.oe_chatter').toggle(isFullScreen);

                self.$el.find('.oe_pad_switch').toggleClass('fa-expand fa-compress');
                self.view.$el.find('.oe_chatter').toggle();
                $('#oe_main_menu_navbar').toggle();
            });
            this._configured_deferred.always(function() {
                var configured = self.get('configured');
                self.$(".oe_unconfigured").toggle(!configured);
                self.$(".oe_configured").toggle(configured);
            });
            this.render_value();
        },
      });
    }


  })
})()
