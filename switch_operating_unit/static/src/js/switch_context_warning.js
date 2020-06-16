odoo.define('switch_operating_unit.warningWidget', function (require){
    "use strict";
    // require original module JS
    var switch_context = require('web_switch_context_warning.widget');
    var session = require('web.session');
    // Extend widget
    switch_context.include({
        generateSignature: function () {
                return [session.name, session.uid, session.company_id, session.db].join();
        },
    });

});