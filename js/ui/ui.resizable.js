(function(A){A.extend(A.expr[":"],{resizable:"(' '+a.className+' ').indexOf(' ui-resizable ')"});A.fn.resizable=function(B){return this.each(function(){if(!A(this).is(".ui-resizable")){new A.ui.resizable(this,B)}})};A.ui.resizable=function(G,J){var I=this;this.element=A(G);A.data(G,"ui-resizable",this);this.element.addClass("ui-resizable");this.options=A.extend({},J);var B=this.options;if(!B.proxy&&(this.element.css("position")=="static"||this.element.css("position")=="")){this.element.css("position","relative")}if(G.nodeName.match(/textarea|input|select|button|img/i)){this.element.wrap('<div class="ui-wrapper"  style="position: relative; width: '+this.element.outerWidth()+"px; height: "+this.element.outerHeight()+';"></div>');var E=this.element;G=G.parentNode;this.element=A(G);this.element.css({marginLeft:E.css("marginLeft"),marginTop:E.css("marginTop"),marginRight:E.css("marginRight"),marginBottom:E.css("marginBottom")});E.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});var H=[parseInt(E.css("borderTopWidth")),parseInt(E.css("borderRightWidth")),parseInt(E.css("borderBottomWidth")),parseInt(E.css("borderLeftWidth"))]}else{var H=[0,0,0,0]}if(!B.handles){B.handles=!A(".ui-resizable-handle",G).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}}if(B.handles.constructor==String){if(B.handles=="all"){B.handles="n,e,s,w,se,sw,ne,nw"}var C=B.handles.split(",");B.handles={};var D={n:"top: "+H[0]+"px;",e:"right: "+H[1]+"px;"+(B.zIndex?"z-index: "+B.zIndex+";":""),s:"bottom: "+H[1]+"px;"+(B.zIndex?"z-index: "+B.zIndex+";":""),w:"left: "+H[3]+"px;",se:"bottom: "+H[2]+"px; right: "+H[1]+"px;"+(B.zIndex?"z-index: "+B.zIndex+";":""),sw:"bottom: "+H[2]+"px; left: "+H[3]+"px;",ne:"top: "+H[0]+"px; right: "+H[1]+"px;",nw:"top: "+H[0]+"px; left: "+H[3]+"px;"};for(var F=0;F<C.length;F++){this.element.append("<div class='ui-resizable-"+C[F]+" ui-resizable-handle' style='"+D[C[F]]+"'></div>");B.handles[C[F]]=".ui-resizable-"+C[F]}}for(var F in B.handles){if(B.handles[F].constructor==String){B.handles[F]=A(B.handles[F],G)}if(!A(B.handles[F]).length){continue}}this.element.mouseInteraction({executor:this,delay:0,distance:0,dragPrevention:["input","textarea","button","select","option"],start:this.start,stop:this.stop,drag:this.drag,condition:function(L){if(this.disabled){return false}for(var K in this.options.handles){if(A(this.options.handles[K])[0]==L.target){return true}}return false}})};A.extend(A.ui.resizable.prototype,{plugins:{},ui:function(){return{instance:this,axis:this.options.axis,options:this.options}},propagate:function(C,B){A.ui.plugin.call(this,C,[B,this.ui()]);this.element.triggerHandler(C=="resize"?C:"resize"+C,[B,this.ui()],this.options[C])},destroy:function(){this.element.removeClass("ui-resizable ui-resizable-disabled").removeMouseInteraction()},enable:function(){this.element.removeClass("ui-resizable-disabled");this.disabled=false},disable:function(){this.element.addClass("ui-resizable-disabled");this.disabled=true},start:function(D){if(this.options.proxy){this.offset=this.element.offset();this.helper=A("<div></div>").css({width:A(this.element).width(),height:A(this.element).height(),position:"absolute",left:this.offset.left+"px",top:this.offset.top+"px"}).addClass(this.options.proxy).appendTo("body")}else{this.helper=this.element}var C=D.target.className.split(" ");for(var B=0;B<C.length;B++){if(C[B]!="ui-resizable-handle"){this.options.axis=C[B].split("-")[2]}}A.extend(this.options,{currentSize:{width:this.element.width(),height:this.element.height()},startPosition:{left:D.pageX,top:D.pageY},currentPosition:{left:parseInt(this.helper.css("left"))||0,top:parseInt(this.helper.css("top"))||0}});this.propagate("start",D);return false},stop:function(B){var C=this.options;this.propagate("stop",B);if(C.proxy){this.element.css({width:this.helper.css("width"),height:this.helper.css("height")});this.element.css({top:(parseInt(this.element.css("top"))||0)+(parseInt(this.helper.css("top"))-this.offset.top),left:(parseInt(this.element.css("left"))||0)+(parseInt(this.helper.css("left"))-this.offset.left)});this.helper.remove()}return false},drag:function(F){var D=this.helper,G=this.options;var I=function(K,J){var L=(F["page"+(/(top|height)/.test(K)?"Y":"X")]-G.startPosition[(/(top|height)/.test(K)?"top":"left")])*(J?-1:1);D.css(K,G["current"+(/(height|width)/.test(K)?"Size":"Position")][K]-L)};if(/(n|ne|nw)/.test(G.axis)){I("height")}if(/(s|se|sw)/.test(G.axis)){I("height",1)}var C=parseInt(D.css("height"));if(G.minHeight&&C<=G.minHeight){D.css("height",G.minHeight)}if(G.maxHeight&&C>=G.maxHeight){D.css("height",G.maxHeight)}if(/(n|ne|nw)/.test(G.axis)){I("top",1)}var E=parseInt(D.css("top"));if(G.minHeight&&E>=(G.currentPosition.top+(G.currentSize.height-G.minHeight))){D.css("top",(G.currentPosition.top+(G.currentSize.height-G.minHeight)))}if(G.maxHeight&&E<=(G.currentPosition.top+(G.currentSize.height-G.maxHeight))){D.css("top",(G.currentPosition.top+(G.currentSize.height-G.maxHeight)))}if(/(e|se|ne)/.test(G.axis)){I("width",1)}if(/(sw|w|nw)/.test(G.axis)){I("width")}var B=parseInt(D.css("width"));if(G.minWidth&&B<=G.minWidth){D.css("width",G.minWidth)}if(G.maxWidth&&B>=G.maxWidth){D.css("width",G.maxWidth)}if(/(sw|w|nw)/.test(G.axis)){I("left",1)}var H=parseInt(D.css("left"));if(G.minWidth&&H>=(G.currentPosition.left+(G.currentSize.width-G.minWidth))){D.css("left",(G.currentPosition.left+(G.currentSize.width-G.minWidth)))}if(G.maxWidth&&H<=(G.currentPosition.left+(G.currentSize.width-G.maxWidth))){D.css("left",(G.currentPosition.left+(G.currentSize.width-G.maxWidth)))}this.propagate("resize",F);return false}})})(jQuery);