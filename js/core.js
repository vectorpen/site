$(document).ready(function(){

	//bind scrollShow plugin
	$('ul.screen').scrollShow({
		view:'.view',
		content:'.images',
		easing:'backout',
		wrappers:'crop',
		navigators:'a[class]',
		navigationMode:'s',
		circular:true	
	});

	//bind the tinyLighbox
	$('#gallery .images a').tinyLightbox();

	var email = 'vectorpen@gmail.com';		
	$('#email').attr('href','mailto:' + email).text(email);
	
});

	/*
		
	//fix safari 2
	function noreturn (obj){
		obj.onclick=function(){return false;}
	}
	$.pageLoader({
		callback : function(){
			
			//update the page title
			document.title = 'VectorPen ' + $('#navi .active').text() + ' '+$('#subnavi .active').text();
	
			//Email
			$('#email').attr('href','mailto:support@vectorpen.com');
		
			//demo download
			$('#demoDownload').click(function(){
				demoDialog(this.href, this.title.split(':'));
				noreturn(this);
				return false;
			});
		
			//full download
			$('#fullDownload').click( function(){
				fullDialog(this.href, this.title.split(':'));
				noreturn(this);
				return false;
			});


/*
			$('ul.subnavi li').mouseover(function(){
				$.each(this,function(i,n){
					
					subnavi.this = i;
				});
				console.log(subnavi);
				$(this).animate({height: '40px'}, "slow").addClass('active').mouseout(function(){
					$(this).animate({height: '20px'}, "slow").removeClass('active');
				});
			});
*//*
			showGallery();
			contactForm();
			buyForm();
		}	
	});
	
	/*
	//shopping cart
	$('#add').bind('click', function(){
		value= parseInt($('#items_count').attr('value'));	
		$('#items_count').attr('value',value+1);
	});

	$('#remove').bind('click', function(){
		value= parseInt($('#items_count').attr('value'));	
		if (value>1)
			$('#items_count').attr('value',value-1);
	});
	*/

/*	
});

var dialogs = {};	
//var subnavi = {};





// window width demo download
function demoDialog(url, params) 
{
	if ( !dialogs.demoDialog )
	{
		$('<div id="demoDialog" class="flora"/>').appendTo('body').
		dialog({
			title : params[0],
			width: params[1]+'px',
			height: params[2]+'px'
		}).load(url);			
		dialogs.demoDialog=true;
	}
	else
		$('#demoDialog').dialog('open');
};

// window width full version download
function fullDialog(url, params) 
{
	$.get(url,function(data){
		//check if this is login form
		if ( data.indexOf('form') != -1 )
		{
			if ( !dialogs.login )
			{
				$('<div id="login" class="flora"/>').appendTo('body').
				dialog({
					title : 'Login',
					width: 255,
					height: 150,
					resizable: false,
					buttons: {
						'Login': function() { 
							doLogin();	
						}
					}		

				}).html(data);
				dialogs.login=true;
			}
			else
				$('#login').dialog('open');
		}
		else 
			showDownload();
	
	});


	function doLogin ()
	{
		showSending(1);
		$('#login form').ajaxSubmit({
			success: function(responseText, statusText)
			{
				showSending();
				if (responseText)
					showMessage(responseText);
				else
				{
					$('#login').dialog('close');
					showDownload();
				}
			},
			error: function(msg){
			 alert(msg);
		    }

		
		});

	
	};

	function showMessage (msg)
	{
		title = $(msg).attr('title');
		
		$(msg).dialog({
			title: title,
			width: 320,
			height: 150,
			resizable: false,
			buttons: {
				'Ok': function() { 
					$(this).dialog('close');
				}
			}
		}).css('display','block');
	};
	
	//shows the loading graphic
	function showSending (sw)
	{
		if (sw)
		{
			$('<div id="login_waiting">').prependTo('#login');
		}
		else
		{
			$('#login_waiting').remove();
		}
	};

	function showDownload()
	{
		if ( !dialogs.fullDialog )
		{
			$('<div id="fullDialog" class="flora"/>').appendTo('body').
			dialog({
				title : params[0],
				width: params[1]+'px',
				height: params[2]+'px',
				resizable: true,
				buttons: {
					'Logout': function() { 
						$(this).dialog('close');
						$.get('/php/download/login.php?do=logout');
					}
				}
			}).load(url);	
			dialogs.fullDialog=true;
		}else
			$('#fullDialog').dialog('open');
	}

};


//Gallery from startpage
function showGallery()
{
		//borrowed from jQuery easing plugin
		//http://gsgd.co.uk/sandbox/jquery.easing.php
		$.easing.backout = function(x, t, b, c, d){
			var s=1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		};
		
		activate();
		var galURL;
		//bind click gallery navi
		$('.gallery_navi').click( function(){
		
			if ( galURL == this.href )
				$('#gallery').effect('shake');
			else
			{
				showWaiting(1);
				galURL = this.href;
				$.get(this.href, function(data){
					showWaiting();
					el=$('#gallery');
					el.slideUp(500, function(){
						el.html(data).slideDown(500);				
						activate();
					});
					
				 });
			 }
			this.onclick=function(){return false};
			return false;
		});


	function activate()
	{
		//hack for safari2
		$('#gallery .left, #gallery .right').click(function(){
			this.onclick=function(){return false};
		});
		//bind scrollShow plugin
		$('ul.screen').scrollShow({
			view:'.view',
			content:'.images',
			easing:'backout',
			wrappers:'crop',
			navigators:'a[class]',
			navigationMode:'s',
			circular:true	
		});

		//bind the tinyLighbox
		$('#gallery .images a').tinyLightbox();
	}
	
	//shows the loading graphic
	function showWaiting (sw)
	{
		if (sw)
		{
			$('<div id="galleryLoading">').prependTo('#gallery');
			$.showWaiting('#galleryLoading');
		}
		else
		{
			$('#galleryLoading').remove();
			$.showWaiting('#galleryLoading','stop');
		}
	};

}


function buyForm ()
{
	$('#buy_form').submit(function(){
		showSending(1);
		
		$('#buy_form').ajaxSubmit({
			success: function(responseText, statusText)
			{
				showSending();
				showMessage(responseText);

			},
			error: function(msg){
			 alert(msg);
		   }
		   
		});
		return false;
	});

	function showMessage (msg)
	{
		height= 150;
		title = $(msg).attr('title');
		if (title == 'Success')
		{
			height = 200;
			buttons = {
				'Ok': function() { 
					$(this).dialog('close');
					$('#terms').css('overflow','auto');
					$('#buy_form').resetForm();
				}
			};			
		}
		else if (title == 'Error')
		{
			height= 150;
			buttons = {
				'Ok': function() { 
					$(this).dialog('close');
					$('#terms').css('overflow','auto');
				}
			};
		}
		else if (title == 'Congratulation')		
		{
			height = 200;
			buttons = {
				'Ok': function() { 
					$(this).dialog('close');
					$('#terms').css('overflow','auto');
					$('#buy_form').attr({'action': 'https://www.paypal.com/cgi-bin/webscr'});	
					document.buy_form.submit();
				}
			}				
		};
		
		if (msg)
		{
		
			$('#terms').css('overflow','hidden');

			$(msg).dialog({
				width: 320,
				height: height,
				resizable: false,
				buttons: buttons
				
			}).css('display','block');
		}
	};	
	
}


//shows the loading graphic
function showSending (sw)
{
	if (sw)
	{
		$('#terms').css('overflow','hidden');
		el = $('<div id="contact_uploading" class="flora">').prependTo('body');
		$.showWaiting('#contact_uploading');
		el.dialog({
			title : 'Sending ...',
			width: 300,
			height: 200,
			resizable: false,
			modal: true
		});
		
	} else
	{
		$.showWaiting('#contact_uploading', 'stop');
		el.dialog('close');
		$('#terms').css('overflow','auto');
	}
};

function contactForm ()
{

	$('#contact_form').submit(function (){
		showSending(1);
		$('#contact_form').append('<input type="hidden" name="ajax" value="true"/>');	

		$(this).ajaxSubmit({
			
			success: function(responseText, statusText)
			{
				showSending();
				showMessage(responseText);
			},
			error: function(msg){
			 alert(msg);
			}
		});
		return false;
	
	});

	function showMessage (msg)
	{
		title = $(msg).attr('title');
		
		$(msg).dialog({
			title: title,
			width: 320,
			height: 150,
			resizable: false,
			buttons: {
				'Ok': function() { 
					$(this).dialog('close');
					if (title =='Success')
						$('#contact_form').resetForm();
				}
			}
		}).css('display','block');
	};	
	

	
}
*/
