/*
 * showWaiting 1.0 - jQuery plugin
 *
 * Copyright (c) 2008 Oleg Slobodskoi
 *
 */
(function( $ ) {


	var waitingsEl = [],
		waitingsObj = [];
 

	//s = settings, sw = switch
	$.showWaiting = function( el, s, sw)
	{		
		
			_wait = function(s, sw, el)
			{
			
				var self = this, c = 0, img, id;
				


				//defaults
				var d = {
					speed: 150,
					path: '/ccds_tpl_img/waiting/',
					images: new Array ('1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png', '11.png', '12.png'),
					fixpng: true
					
				};
				$.extend(d, s);
		
				this.start = function()
				{
					if ( !$(el).html() )
					{
						img = $('<img style="display: none">').appendTo(el);
						id = window.setInterval(self.change, d.speed);
					}
				};
			
				this.stop = function()
				{
					window.clearInterval(id);
					img.remove();	
				};
				
				this.change = function()
				{
					img.attr('src', d.path + d.images[c]);					
					if (d.fixpng ) img.ifixpng();
					img.show();
					c == d.images.length-1 ? c = 0 : c++;
				};
		
				

				this.start();					

		
			};

			if ( typeof s == 'string')
			{
				sw = s;
				s = {};
			}
			
			


			if ( sw == 'stop')
			{
				var id = $.inArray(el,waitingsEl);

				if (id != -1)
				{
					waitingsObj[id].stop();
					waitingsObj.splice(id,1);
					waitingsEl.splice(id,1);
				}
			}
			else	
			{
				if ( $.inArray(el, waitingsEl) == -1)
				{
					waitingsObj.push( new _wait(s, sw, el) );				
					waitingsEl.push( el );				
				}
			}
	};

	
})( jQuery );	