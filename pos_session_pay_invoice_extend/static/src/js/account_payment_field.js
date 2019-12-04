odoo.define('pos_session_pay_invoice_extend.account_bank_statement_line', function (require) {
"use strict";

var AbstractField = require('web.AbstractField');
var core = require('web.core');
var field_registry = require('web.field_registry');
var field_utils = require('web.field_utils');
var account_payment = require('account.payment');

var QWeb = core.qweb;
account_payment.ShowPaymentLineWidget.include({
    _render: function() {
        var self = this;
        var info = JSON.parse(this.value);
        if (!info) {
            this.$el.html('');
            return;
        }
        _.each(info.content, function (k, v){
            k.index = v;
            k.amount = field_utils.format.float(k.amount, {digits: k.digits});
            if (k.date){
                k.date = field_utils.format.date(field_utils.parse.date(k.date, {}, {isUTC: true}));
            }
        });
        this.$el.html(QWeb.render('ShowPaymentInfo', {
            lines: info.content,
            outstanding: info.outstanding,
            title: info.title
        }));
        _.each(this.$('.js_payment_info'), function (k, v){
            var content = info.content[v];
            var options = {
                content: function () {
                    var $content = $(QWeb.render('PaymentPopOver', {
                        name: content.name,
                        journal_name: content.journal_name,
                        date: content.date,
                        amount: content.amount,
                        currency: content.currency,
                        position: content.position,
                        payment_id: content.payment_id,
                        move_id: content.move_id,
                        ref: content.ref,
                        account_payment_id: content.account_payment_id,
                        invoice_id: content.invoice_id,
                        pos_payment_id: content.pos_payment_id,
                    }));
                    $content.filter('.js_unreconcile_payment').on('click', self._onRemoveMoveReconcile.bind(self));
                    $content.filter('.js_open_payment').on('click', self._onOpenPayment.bind(self));
                    return $content;
                },
                html: true,
                placement: 'left',
                title: 'Payment Information',
                trigger: 'focus',
                delay: { "show": 0, "hide": 100 },
                container: $(k).parent(), // FIXME Ugly, should use the default body container but system & tests to adapt to properly destroy the popover
            };
            $(k).popover(options);
        });
    },
    _onOpenPayment: function (event) {
        var invoiceId = parseInt($(event.target).attr('invoice-id'));
        var paymentId = parseInt($(event.target).attr('payment-id'));
        var posPaymentId = parseInt($(event.target).attr('pos-payment-id'));
        var moveId = parseInt($(event.target).attr('move-id'));
        var res_model;
        var id;
        if (posPaymentId !== undefined && !isNaN(posPaymentId)){
            res_model = "account.bank.statement.line";
            id = posPaymentId;
        }else if (invoiceId !== undefined && !isNaN(invoiceId)){
            res_model = "account.invoice";
            id = invoiceId;
        } else if (paymentId !== undefined && !isNaN(paymentId)){
            res_model = "account.payment";
            id = paymentId;
        } else if (moveId !== undefined && !isNaN(moveId)){
            res_model = "account.move";
            id = moveId;
        }
        //Open form view of account.move with id = move_id
        if (res_model && id) {
            this.do_action({
                type: 'ir.actions.act_window',
                res_model: res_model,
                res_id: id,
                views: [[false, 'form']],
                target: 'current'
            });
        }
    },
    });
});

