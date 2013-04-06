/*!
 * jQuery.domActions
 * Copyright (c) 2013 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * https://github.com/flesler/jquery.domActions
 * @author Ariel Flesler
 * @version 1.0.0
 */

;(function( $ ){
	
	var $actions = $.actions = function(arg, arg2){
		return $('body').actions(arg, arg2);
	};

	$actions.attr = 'data-action';
	$actions.separator = '/';

	$.fn.actions = function(arg, arg2){
		if (arg === null) {
			// $.actions(null);
			return this.unbind('click', monitor);
		}

		if ($.isFunction(arg)){
			// $.actions(function(action, args){ });
			data(this, '_handler', arg);
		}
		if ($.isPlainObject(arg)) {
			// $.actions({ a:function(){} });
			for (var action in arg) {
				data(this, action, arg[action]);
			}
		}
		if (typeof arg === 'string') {
			// $.actions('a', null);
			if (arg2 === null) {
				return this.removeData('actions.'+arg);
			}
			if ($.isFunction(arg2)) {
				// $.actions('a', function(){ });
				data(this, arg, arg2);
			} else {
				// $.actions('a');
				// $.actions('a', [1,2,3]);
				arg2 = $.makeArray(arg2);
				arg2.unshift(arg);
				return this.attr($actions.attr, arg2.join($actions.separator));
			}
		}

		// Setup, clear in case it was bound already
		return this.unbind('click', monitor).bind('click', monitor);
	};

	function data(obj, key, value) {
		return obj.data('actions.'+key, value);
	}

	function monitor(e) {
		var value = $(e.target).closest('['+$actions.attr+']').attr($actions.attr);
		if (!value) return;

		e.preventDefault();
		e.stopPropagation();

		var args = value.split($actions.separator);
		var action = args.shift();

		var handler = $.data(this, 'actions.'+action);
		if (handler) {
			return handler.apply(null, args);
		}

		handler = $.data(this, 'actions._handler');
		if (handler) {
			handler(action, args);
		}
	}

})( jQuery );