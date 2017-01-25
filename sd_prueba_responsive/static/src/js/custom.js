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

/********************************
 Preloader
 ********************************/
$(window).load(function () {
    $('.loading-container').fadeOut(1000, function () {
        $(this).remove();
    });
});


$(function () {

    // TODO : change some style of .oe_view_manager_body when the viewport is changed.
    // ResponsiveBootstrapToolkit.changed(function(){
    // 	console.log('hi there');
    // });

    // Add the content to the 'More Apps' Modal on show
    $('#MoreAppsModal').on('show.bs.modal', function (event) {
        var $modal_body = $(this).find('.modal-body');
        if ($modal_body.children().length == 0) {
            $('ul#menu_more').first().clone().removeClass('dropdown-menu').attr('id', 'modal_more').appendTo($modal_body);
        }

        if ($('#modal_more').children().lenght == 0) {
            $($('ul#menu_more').html()).clone().appendTo($modal_body.find('#modal_more'));
        }

    });

    $('body').on('hidden.bs.modal', '.modal', function () {
    });

    $('#MoreAppsModal').on('click', function (e) {
        var $target = $(e.target);
        if ($target.is('li')) {
            console.log('click', $target);
            $target.find('a').click();
            $(this).find('.close').click();
        }
    });

    window.on_scroll_fix_tools = function () {
        var header = $("#inshasviewmanagerpanel");
        if (header && header.position()) {
            var width = header.width();
            var inshastools = header.find('#inshasview-tools');

            var scroll = Math.abs($('#body_wrapper').position().top);
            if (header.hasClass('fixed')) {
                header.removeClass('fixed');
            }
            if (scroll >= Math.abs(header.position().top)) {
                header.addClass("fixed");
                // header.find('#main').css('top', (inshastools.height()+ 20) + 'px');
                inshastools.css('width', width + 'px');
            } else {
                header.removeClass("fixed");
                header.find('#inshasview-tools').css('width', 'auto');
            }
        }
    }

    $('body').scroll(on_scroll_fix_tools);
    $(window).resize(on_scroll_fix_tools);
    on_scroll_fix_tools();


    /********************************
     Toggle Aside Menu
     ********************************/

    $(document).on('click', '.navbar-toggle', function () {
        var condition = $(window).width() > 768 && screen.width > 768;
        $('aside.left-panel').toggleClass('collapsed');
        $('aside.left-panel li.has-submenu>ul.list-unstyled').hide().css({overflow: 'visible'});
        if (!(condition && $('aside.left-panel').hasClass('collapsed'))) {
            $('aside.left-panel li.has-submenu.active>ul.list-unstyled').show();
        }
        if (!condition){
          $('.content-overlay').toggle($('aside.left-panel').hasClass('collapsed'));
        }
        openerp.web.bus.trigger('resize');
    });

    $(document).on('click touchstart','.content-overlay' ,function(ev){
      $('.navbar-toggle').click();
      $('.content-overlay').hide();
    })

    $(document).on('hover', 'aside.left-panel li.has-submenu', function () {
        var condition = $(window).width() > 768 && screen.width > 768; // true if large
        $('.nicescroll-rails.nicescroll-rails-vr').toggle(!(condition && $('aside.left-panel').hasClass('collapsed')));
    });

    /********************************
     Aside Navigation Menu
     ********************************/

    $("aside.left-panel nav.navigation > ul > li:has(ul) > a").click(function (e) {

        if ($("aside.left-panel").hasClass('collapsed') == false || $(window).width() < 768) {

            $("aside.left-panel nav.navigation > ul > li > ul").slideUp(300);
            $("aside.left-panel nav.navigation > ul > li").removeClass('active');

            if (!$(this).next().is(":visible")) {

                $(this).next().slideToggle(300, function () {
                    $("aside.left-panel:not(.collapsed)").getNiceScroll().resize();
                });
                $(this).closest('li').addClass('active');

            }

            return false;
        }

    });


    /********************************
     popover
     ********************************/
    if ($.isFunction($.fn.popover)) {
        $('.popover-btn').popover();
    }


    /********************************
     tooltip
     ********************************/
    if ($.isFunction($.fn.tooltip)) {
        $('.tooltip-btn').tooltip()
    }


    /********************************
     NanoScroll - fancy scroll bar
     ********************************/
    if ($.isFunction($.fn.niceScroll)) {
        $(".nicescroll").niceScroll({

            cursorcolor: '#9d9ea5',
            cursorborderradius: '0px'

        });
    }


    if ($.isFunction($.fn.niceScroll)) {
        $("aside.left-panel:not(.collapsed)").niceScroll({
            cursorcolor: '#8e909a',
            cursorborder: '0px solid #fff',
            cursoropacitymax: '0.5',
            cursorborderradius: '0px'
        });
    }


    /********************************
     Input Mask
     ********************************/
    if ($.isFunction($.fn.inputmask)) {
        $(".inputmask").inputmask();
    }


    /********************************
     TagsInput
     ********************************/
    if ($.isFunction($.fn.tagsinput)) {
        $('.tagsinput').tagsinput();
    }


    /********************************
     Chosen Select
     ********************************/
    if ($.isFunction($.fn.chosen)) {
        $('.chosen-select').chosen();
        $('.chosen-select-deselect').chosen({allow_single_deselect: true});
    }


    /********************************
     DateTime Picker
     ********************************/
    if ($.isFunction($.fn.datetimepicker)) {
        $('#datetimepicker').datetimepicker();
        $('#datepicker').datetimepicker({pickTime: false});
        $('#timepicker').datetimepicker({pickDate: false});

        $('#datetimerangepicker1').datetimepicker();
        $('#datetimerangepicker2').datetimepicker();
        $("#datetimerangepicker1").on("dp.change", function (e) {
            $('#datetimerangepicker2').data("DateTimePicker").setMinDate(e.date);
        });
        $("#datetimerangepicker2").on("dp.change", function (e) {
            $('#datetimerangepicker1').data("DateTimePicker").setMaxDate(e.date);
        });
    }


    /********************************
     wysihtml5
     ********************************/
    if ($.isFunction($.fn.wysihtml5)) {
        $('.wysihtml').wysihtml5();
    }


    /********************************
     wysihtml5
     ********************************/
    if ($.isFunction($.fn.ckeditor)) {
        CKEDITOR.disableAutoInline = true;
        $('#ckeditor').ckeditor();
        $('.inlineckeditor').ckeditor();
    }


    /********************************
     Scroll To Top
     ********************************/
    $('.scrollToTop').click(function () {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });


});


/********************************
 Toggle Full Screen
 ********************************/

function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
