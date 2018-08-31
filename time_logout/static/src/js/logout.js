/* Copyright 2018 Sistemas de Datos - Rodrigo Colombo Vlaeminch <rcolombo@sdatos.es>
 * Copyright 2018 Sistemas de Datos - Lorenzo Martin Alvarez <lmartin@sdatos.es>
 * License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl). */


odoo.define('time_logout.logout', function (require) {
	"use strict";

	var core = require('web.core');
	var _t = core._t;
	var session = require('web.session');
	
	/** localStorage
	 * Active_ses -> int (ses_id)
	 * Cont -> int (cont)
	 * Alive -> dict {ses_id: time.now()}
	 * Edit -> array [ses_id, ses_id ...]
	 * Load -> array [ses_id, ses_id ...]
	 **/
	
    var ses_id = (Date.now()).toString();
    var t_message;
    var t_max;
    var edition_type;
    var t_max_alive = 2;
    var interval1;
    var interval2;
    var isRefresh;
    
    var html_message = "<div id='session_end' class='o_notification o_timeout' style='opacity: 1;'>" +
		    				"<div class='o_notification_title'>" + _t("Your session will expire, move mouse to avoid it") + "</div>" +
		    				"<div class='o_notification_content'>" +
		    				    "<div style='text-align:center'>" +
		    					    "<span class='fa fa-clock-o' style='font-size: 48px;'</span>" + "<span id='cont_message'/>" +
		    					"</div>" +
		    				"</div>" +
		    			"</div>";

    $(document).ready(function () {
    	isRefresh = false;
		if (!/\/web\/login/.test(window.location.pathname) &&
			typeof session.user_context !== 'undefined' &&
			session.user_context.session_timeout >= 30) {

			t_message = parseInt(session.user_context.session_alert_time);				//time message before logout
			t_max = parseInt(session.user_context.session_timeout);						//time of session
			edition_type = session.user_context.not_in_edition;		//true=no logout, false=save and logout
			
            interval1 = setInterval(timerIncrement, 1000); // 1 second
            testAlive();								//Call to clean on first load
            interval2 = setInterval(testAlive, 5000); // 5 second
            
            localStorage.setItem('Active_ses', ses_id);
            localStorage.setItem('Cont', 0);
            setDictStorage('Alive', ses_id, (Date.now()).toString());
            
            document.onmousemove =
            document.onmousedown =
            document.onmouseup =
            document.onmousewheel =
            document.DOMMouseScroll =
            document.onkeydown =
            document.onkeyup =
            document.ontouchstart =
            document.ontouchmove =
            document.onscroll =
            document.focus = function (e) {
            	if (e.which === 116){
            		isRefresh = true;
            		removeDictStorage('Alive',ses_id);
            	}
            	else{
            		isRefresh = false;
	                localStorage.setItem('Active_ses', ses_id);
	                localStorage.setItem('Cont', 0);
	                $("#session_end").remove();
	                if (!getDictStorage('Alive', ses_id)){
	                	setDictStorage('Alive', ses_id, (Date.now()).toString());
	                }
	                if (!inEdition() && getArrayStorage('Edit', ses_id)){          		 //No editing and in array
	                    removeArrayStorage('Edit', ses_id);
	                }
	                else if (inEdition() && !getArrayStorage('Edit', ses_id)){          //Editing and not in array
	                	setArrayStorage('Edit', ses_id);
	                }
            	}
            }
            $(window).on('beforeunload',function(e){
            	e.preventDefault();
            	if (!isRefresh){
	            	removeDictStorage('Alive', ses_id);
	            	removeArrayStorage('Edit', ses_id);
	            	removeArrayStorage('Load', ses_id);
	            	if (!getDictStorage('Alive')){		//Im the last
	            		location.assign('/web/login');
	            		localStorage.clear();
	            		session.session_logout();
	            	}
	            	else if(ses_id == localStorage.getItem('Active_ses')){
	            		reasignActive();
	            	}
            	}
		    });
        }
    });
    function timerIncrement(){
        var tmp_cont = parseInt(localStorage.getItem('Cont'))
        if (localStorage.getItem('Active_ses') == ses_id){
            if (!isNaN(tmp_cont)){
                tmp_cont = tmp_cont + 1;
                localStorage.setItem('Cont', tmp_cont);
            }
        }
        if (!inLoad() && getArrayStorage('Load', ses_id)){		//No load and in array
        	removeArrayStorage('Load', ses_id);
        }
        else if (inLoad() && !getArrayStorage('Load', ses_id)){		//Load and not in array
        	setArrayStorage('Load', ses_id);
        }
        if (tmp_cont >= t_max){
        	if (getArrayStorage('Edit')){
        		if (edition_type){
        			tmp_cont = 0;
        			localStorage.setItem('Cont', tmp_cont);
        		}
        		else if (getArrayStorage('Edit', ses_id)){
        			saveOdoo();
        		}
        		$("#session_end").remove();
        	}
        	else if (!getArrayStorage('Load')){
        		removeDictStorage('Alive', ses_id);
        		var old = "" + window.location;
        		if (!getDictStorage('Alive')){		//Im the last
            		localStorage.clear();
            		session.session_logout();
        		}
        		var url = '/web/login'
        		if (old.split("#")[1] != null){
        			url += '#' + old.split("#")[1]
        		}
        		location.assign(url);
        	}
        }
        else if ((tmp_cont >= t_message) && !(getArrayStorage('Edit') && edition_type)){
        	var t = t_max - tmp_cont;
        	$("#session_end").remove();
        	$(".o_notification_manager").append(html_message);
        	if (t < 0) { t = 0; }
        	$("#cont_message").text(t);
        }
    }
    function testAlive(){
    	var now = Date.now();
    	setDictStorage('Alive', ses_id, now.toString());
    	for (var key in getDictStorage('Alive')){
    		if ((now-(5000*t_max_alive)) > parseInt(getDictStorage('Alive', key))){
    			removeDictStorage('Alive', key);
    			removeArrayStorage('Edit', key);
    			removeArrayStorage('Load', key);
    			if (localStorage.getItem('Active_ses') == key) {
    				reasignActive();
    			}
    		}
    	}
    	var clean = function (a) {
    		for (var key in getArrayStorage(a)){    			
	    		if (!getDictStorage('Alive', getArrayStorage(a)[key])){	    			
	    			removeArrayStorage(a, getArrayStorage(a)[key]);
	    		}
    		}
    	}
    	clean('Edit');
    	clean('Load');
    }
    function getArrayStorage(name, index){
    	var arr = JSON.parse(localStorage.getItem(name));
    	if ((arr == null) || (index !== undefined && arr.indexOf(index) < 0)){
    		return false;
    	}
    	return arr;
    }
    function setArrayStorage(name, value){
    	var arr = JSON.parse(localStorage.getItem(name));
    	if (arr == null){
    		arr=[];
    	}
    	arr.push(value);
    	localStorage.setItem(name, JSON.stringify(arr));
    }
    function removeArrayStorage(name, value){
    	var arr = JSON.parse(localStorage.getItem(name));
    	if (arr == null){
    		arr=[];
    	}
    	if (arr.indexOf(value)>=0){
    		arr.splice(arr.indexOf(value), 1);
    	}
    	if (arr.length > 0){
        	localStorage.setItem(name, JSON.stringify(arr));
    	}
    	else {
    		localStorage.removeItem(name);
    	}
    }
    function getDictStorage(name, index){
    	var dict = JSON.parse(localStorage.getItem(name));
    	
    	if (index === undefined && dict != null) {
    		return dict;
    	}
    	else if (dict == null || !(index in dict)){
    		return false;
    	}
    	return dict[index];
    }
    function setDictStorage(name, index, value){
    	var dict = JSON.parse(localStorage.getItem(name));
    	if (dict == null && value === undefined){
    		localStorage.setItem(name, JSON.stringify(index));
    		return;
    	}
    	if (dict == null){
    		dict={};
    	}
    	dict[index] = value;
        localStorage.setItem(name, JSON.stringify(dict));
    }
    function removeDictStorage(name, index){
    	var dict = JSON.parse(localStorage.getItem(name));
    	if (dict != null && index in dict){
    		delete dict[index];
    	}
    	if (dict != null && !(Object.keys(dict).length === 0)) {
    		localStorage.setItem(name, JSON.stringify(dict));
    	}
    	else {
    		localStorage.removeItem(name);
    	}
    }
    function reasignActive(){
    	if(getDictStorage('Alive')){
	    	for (var key in getDictStorage('Alive')){
	    		localStorage.setItem('Active_ses', key)
	    		return;
	    	}
    	}	
    }
    function inEdition(){
    	if ($(".o_form_input").length > 0){
    		return true;
    	}
    	return false;
    }
    function inLoad(){
    	if (($(".o_loading").length > 0 && $(".o_loading").is(":hidden") == false) 
            || ($(".oe_throbber_message").length > 0 && $(".oe_throbber_message").is(":hidden") == false)){
    		return true;
    	}
    	return false;
    }
    function saveOdoo(){
    	if ($(".o_form_button_save").length > 0 && $(".o_form_button_save").is(":hidden") == false){
    		$(".o_form_button_save").click();
    		removeArrayStorage('Edit', ses_id);
    	}
    	else if ($(".o_list_button_save").length > 0 && $(".o_list_button_save").is(":hidden") == false){
    		$(".o_list_button_save").click();
    		removeArrayStorage('Edit', ses_id);    	
    	}
    	if ($(".o_notification.o_error").length > 0 && $(".o_notification.o_error").is(":hidden") == false) {		//warning to save
    		localStorage.setItem('Cont', 0);
    		setArrayStorage('Edit', ses_id);
    	}
    }
});
	