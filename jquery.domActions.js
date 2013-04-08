/*!
 * jQuery.domActions
 * Copyright (c) 2013 Ariel Flesler - aflesler<a>gmail<d>com
 * Dual licensed under MIT and GPL.
 * https://github.com/flesler/jquery.domActions
 * @author Ariel Flesler
 * @version 0.1.0
 */
;(function( $ ){
	
	// TODOs:
	// maybe event {action} can preventDefault the handler, or an {action}-pre
	// $.actions('a', null) also removes data-action ?

	// Simply a shortcut for $('body').actions()
	var $actions = $.actions = function(arg, arg2){
		return $('body').actions(arg, arg2);
	};

	// Can be changed externally
	$actions.attr = 'data-action';

	$.fn.actions = function(arg, arg2){
		if (arg === null) {
			// (null) -> Turn off
			return this.unbind('click', monitor);
		}

		if ($.isFunction(arg)){
			// (function(action, args)) -> Catch all handler
			data(this, '_handler', arg);
		}
		if ($.isPlainObject(arg)) {
			// (Object<string, function()>) -> List of handlers
			for (var action in arg) {
				data(this, action, arg[action]);
			}
		}
		if (typeof arg === 'string') {
			// (string, null) -> Clear action handler
			if (arg2 === null) {
				return this.removeData('actions.'+arg);
			}
			if ($.isFunction(arg2)) {
				// (string, function()) -> Add action handler
				data(this, arg, arg2);
			} else {
				// ("") -> Clear action from element
				// (string) -> Set action, no arguments
				// (string, Array) -> Set action with arguments
				arg2 = $.makeArray(arg2);
				action = arg ? $actions.toActionString(arg, arg2) : '';
				return this.attr($actions.attr, action);
			}
		}

		// () -> Listen for actions / Turn on (most fall here)
		// Clear in case it was bound already
		return this.unbind('click', monitor).bind('click', monitor);
	};

	// Takes the string in the HTML, returns an array of action+arguments
	// You can replace with a better one if needed
	$actions.parseAction = function(action){
		return $.map(action.split('/'), function(arg){
			// Convert to number when applicable
			return isNaN(arg) ? arg : parseFloat(arg);
		});
	};

	// Takes action+arguments, returns the string in the HTML
	// You can replace with a better one if needed
	$actions.toActionString = function(action, args){
		return action + '/' + args.join('/');
	};

	function data(obj, key, value) {
		return obj.data('actions.'+key, value);
	}

	function monitor(e) {
		var button = $(e.target).closest('['+$actions.attr+']');
		var value = button.attr($actions.attr);
		if (!value) return;

		e.preventDefault();

		var args = $actions.parseAction(value);
		var action = args.shift();
		args.push(function(){
			button.trigger(action+'-end', arguments);
		});

		var handler = $.data(this, 'actions.'+action);
		if (handler) {
			if (handler.apply(null, args) !== false) {
				e.stopPropagation();
				button.trigger(action, args);
			}
			return;
		}

		handler = $.data(this, 'actions._handler');
		if (handler) {
			if (handler(action, args) !== false) {
				e.stopPropagation();
				button.trigger(action, args);
			}
		}
	}
})( jQuery );