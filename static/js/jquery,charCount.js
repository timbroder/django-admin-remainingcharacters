/*
 * 	Character Count Plugin - jQuery plugin
 * 	Dynamic character count for text areas and input fields
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/7161/jquery-plugin-simplest-twitterlike-dynamic-character-count-for-textareas
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

/*
 * Modified 2010 Tim Broder for django-admin-charcount
 * http://gpowered.net
 */
 
(function($) {
	$.fn.charCount = function(options){
		// default configuration properties
		var defaults = {	
			allowed: 140,		
			warning: 20,
			css: 'help',
			counterElement: 'p',
			cssWarning: 'warning',
			cssExceeded: 'exceeded',
			counterText: ''
		}; 
			
		var options = $.extend(defaults, options); 
		
		function calculate(obj){
			/* line break counting fix
			*
			* HTTP spec insists that newlines be represented as \r\n
			* jQuery, only counts \n, thus as 1 character
			*
			* Modification based on the following conversation:
			* http://stackoverflow.com/questions/10030921/chrome-counts-characters-wrong-in-textarea-with-maxlength-attribute
			*/
			var input = $(obj).val();
			
			var newLines = input.match(/(\r\n|\n|\r)/g);
			
			var addition = 0;
			if (newLines != null) {
				addition = newLines.length;
			}
			
			var count = input.length + addition;
			var available = options.allowed - count;
			if(available <= options.warning && available >= 0){
				$(obj).next().addClass(options.cssWarning);
			} else {
				$(obj).next().removeClass(options.cssWarning);
			}
			if(available < 0){
				$(obj).next().addClass(options.cssExceeded);
			} else {
				$(obj).next().removeClass(options.cssExceeded);
			}
			$(obj).next().html(options.counterText + available);
		};

		this.each(function() {  			

			$(this).after('<'+ options.counterElement +' class="' + options.css + '">'+ options.counterText +'</'+ options.counterElement +'>');
			calculate(this);
			$(this).keyup(function(){calculate(this); });
			$(this).change(function(){calculate(this)});
		});
	  
	};

})(jQuery);

/*function init_counters(selector, len){
	$(selector).each(function() {
		//console.log($(this).attr('maxlength'));
		if(len==null){
			len = $(this).attr('maxlength');
		}
		$(this).charCount({
			counterText: 'Characters Remaining: ',
			allowed: len,
		});
	});
}*/

$(document).ready(function(){
	$(".counted").each(function(){
		console.log($(this));
		len = $(this).attr('maxlength');
		$(this).charCount({
			counterText: 'Characters Remaining: ',
			allowed: len,
		});
	});
	//init_counters("input[maxlength]", 80);
	//init_counters("textarea[maxlength]");
	//init_counters("#id_abstract", 400);
});

/*
 * <style type="text/css">
form .counter{
	}
form .warning{color:#600;}	
form .exceeded{color:#e00;}
</style>
*/

