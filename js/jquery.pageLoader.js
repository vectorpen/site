/*
 * pageLoader 1.0 - jQuery plugin
 *
 * Copyright (c) 2008 Oleg Slobodskoi
 *
 */

(function( $ )
{
	


	$.pageLoader = function( s )
	{

			var d = {
				filterTag: 'rel',
				filterText: 'noPageLoader',
				fadeOutSpeed: 150,
				fadeInSpeed: 150,
				el: 'a',				//element to that will be done the binding
				primaryAttr: 'rel',		//attribute that will be used if the element has it
				secondaryAttr: 'href',	//if primary attribute is empty this one will be used
				targetEl: '#center', 	//element in that will recieved data be inserted
				param: 'page=ajax'		//this string will be attached to the url that will be loaded, so you can load only the needed part of html
			};

			$.extend( d, s );
			
			hashManager('start');
			
			if ( hash() )
				changePage(url());
			else
			{
				pageHash = 'empty';
				bind();
				$(d.callback);
			}	

			function bind ()
			{
				$(d.el).each(function(i){	
					var el = $(this);
					var url = internalURL(el);
					if ( url)
					{	
						el.attr('href', hash(url)).
						click(function(){

							if ( el.attr('href') == pageHash )
							{
								//set the absolute position attr for shake effect
								var left = $(window).width()/2 - $('#center').width()/2;
								el = $(d.targetEl);
								el.css({'left': left, 'margin': 0});
				
								shake(el , 20, 150);
							}
						});
					}
						
				});

				function internalURL(el)	
				{
					var url = el.attr(d.primaryAttr) || el.attr(d.secondaryAttr);

					if ( 
						!url 
						|| ( url.indexOf('http') != -1 && url.indexOf( location.host ) == -1 )  
						|| ( url.indexOf('mailto') != -1 )
						|| ( el.attr('target') ) 
						|| ( el.attr(d.filterTag) == d.filterText) 
					
					)
						return false;
					else
						return url;
					
				};

				

			
			};


			
			function changePage(url)
			{
				showWaiting(1);

				$.get(url, function(data){
					showWaiting();
					var el = $(d.targetEl);	
					el.fadeOut(d.fadeOutSpeed, function(){

						el.html(data).fadeIn(d.fadeInSpeed, function(){
							bind();
							$(d.callback);
						});	
					});
						
				});

		
			};
			
			// Checks constantly if the hash was changed and changes the page
			function hashManager ( sw ) 
			{
				if (sw == 'start')
				{
					if ( hash() ) 
						pageHash = hash();
					window.setInterval(function(){hashManager('check')}, 200);

				}
				else if (sw == 'check')
				{
					if ( hash() && hash() != pageHash )
					{
						pageHash = hash();
						changePage(url());
					} 
					//for pages widthout hash
					else if ( !hash() && hash() != pageHash && pageHash != 'empty')
					{
						pageHash = '';
						changePage(addParam(location.href, d.param));
					}
					
				}
			};
			
			
			//shows the loading graphic
			function showWaiting (sw)
			{
				if (sw)
				{
					$('<div id="page_loading">').prependTo('body');
					$.showWaiting('#page_loading');
				}
				else
				{
					$('#page_loading').remove();
					$.showWaiting('#page_loading','stop');
				}
				
			};
			
		
			//generate the url from adress width hash and adds the param
			function url ()
			{
				return  'http://' +  addParam( location.host + hash().replace(/#/,'') , d.param);
			};
			
			//helper function to check if some params already exists to add the new param with ? or &
			function addParam(url, param)
			{
				url.indexOf('?')==-1 ? ch = '?' : ch='&';
				return url + ch + param;
			};
			
			
			
			function hash (h)
			{
				if (h) 
				{
					//hack for ie6 because after load of ajax contents ie sets all url with http
					return h.indexOf(location.host) != -1 ? '#'+h.split(location.host)[1] : '#'+h;
				} else
					return location.hash
			};
			
			//quickfunction to shake the whole page, native shake effect didn't works
			function shake (el, size, speed)
			{
				var ml = parseInt( el.css('left').split('px')[0]);
				el.animate({'left': ml+size}, speed, function(){
					el.animate({'left': ml-2*size},speed, function(){
						el.animate({'left': ml+2*size}, speed, function(){
							el.animate({'left': ml}, speed);
						});
					});
				});
			};

	};
	

	

	





})( jQuery );