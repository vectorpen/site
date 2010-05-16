(function(B){B.fn.ajaxSubmit=function(M){if(typeof M=="function"){M={success:M}}M=B.extend({url:this.attr("action")||window.location.toString(),type:this.attr("method")||"GET"},M||{});var O={};B.event.trigger("form.pre.serialize",[this,M,O]);if(O.veto){return this}var I=this.formToArray(M.semantic);if(M.data){for(var F in M.data){I.push({name:F,value:M.data[F]})}}if(M.beforeSubmit&&M.beforeSubmit(I,this,M)===false){return this}B.event.trigger("form.submit.validate",[I,this,M,O]);if(O.veto){return this}var E=B.param(I);if(M.type.toUpperCase()=="GET"){M.url+=(M.url.indexOf("?")>=0?"&":"?")+E;M.data=null}else{M.data=E}var N=this,H=[];if(M.resetForm){H.push(function(){N.resetForm()})}if(M.clearForm){H.push(function(){N.clearForm()})}if(!M.dataType&&M.target){var K=M.success||function(){};H.push(function(P){if(this.evalScripts){B(M.target).attr("innerHTML",P).evalScripts().each(K,arguments)}else{B(M.target).html(P).each(K,arguments)}})}else{if(M.success){H.push(M.success)}}M.success=function(S,Q){for(var R=0,P=H.length;R<P;R++){H[R](S,Q,N)}};var D=B("input:file",this).fieldValue();var L=false;for(var G=0;G<D.length;G++){if(D[G]){L=true}}if(M.iframe||L){if(B.browser.safari&&M.closeKeepAlive){B.get(M.closeKeepAlive,J)}else{J()}}else{B.ajax(M)}B.event.trigger("form.submit.notify",[this,M]);return this;function J(){var S=N[0];var Q=B.extend({},B.ajaxSettings,M);var R="jqFormIO"+B.fn.ajaxSubmit.counter++;var W=B('<iframe id="'+R+'" name="'+R+'" />');var Y=W[0];var Z=B.browser.opera&&window.opera.version()<9;if(B.browser.msie||Z){Y.src='javascript:false;document.write("");'}W.css({position:"absolute",top:"-1000px",left:"-1000px"});var a={responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){}};var X=Q.global;if(X&&!B.active++){B.event.trigger("ajaxStart")}if(X){B.event.trigger("ajaxSend",[a,Q])}var P=0;var T=0;setTimeout(function(){var d=S.encoding?"encoding":"enctype";var c=N.attr("target"),b=N.attr("action");N.attr({target:R,method:"POST",action:Q.url});S[d]="multipart/form-data";if(Q.timeout){setTimeout(function(){T=true;U()},Q.timeout)}W.appendTo("body");Y.attachEvent?Y.attachEvent("onload",U):Y.addEventListener("load",U,false);S.submit();N.attr({action:b,target:c})},10);function U(){if(P++){return }Y.detachEvent?Y.detachEvent("onload",U):Y.removeEventListener("load",U,false);var c=true;try{if(T){throw"timeout"}var d,g;g=Y.contentWindow?Y.contentWindow.document:Y.contentDocument?Y.contentDocument:Y.document;a.responseText=g.body?g.body.innerHTML:null;a.responseXML=g.XMLDocument?g.XMLDocument:g;a.getResponseHeader=function(h){var e={"content-type":Q.dataType};return e[h]};if(Q.dataType=="json"||Q.dataType=="script"){var b=g.getElementsByTagName("textarea")[0];a.responseText=b?b.value:a.responseText}else{if(Q.dataType=="xml"&&!a.responseXML&&a.responseText!=null){a.responseXML=V(a.responseText)}}d=B.httpData(a,Q.dataType)}catch(f){c=false;B.handleError(Q,a,"error",f)}if(c){Q.success(d,"success");if(X){B.event.trigger("ajaxSuccess",[a,Q])}}if(X){B.event.trigger("ajaxComplete",[a,Q])}if(X&&!--B.active){B.event.trigger("ajaxStop")}if(Q.complete){Q.complete(a,c?"success":"error")}setTimeout(function(){W.remove();a.responseXML=null},100)}function V(b,c){if(window.ActiveXObject){c=new ActiveXObject("Microsoft.XMLDOM");c.async="false";c.loadXML(b)}else{c=(new DOMParser()).parseFromString(b,"text/xml")}return(c&&c.documentElement&&c.documentElement.tagName!="parsererror")?c:null}}};B.fn.ajaxSubmit.counter=0;B.fn.ajaxForm=function(D){return this.ajaxFormUnbind().submit(A).each(function(){this.formPluginId=B.fn.ajaxForm.counter++;B.fn.ajaxForm.optionHash[this.formPluginId]=D;B(":submit,input:image",this).click(C)})};B.fn.ajaxForm.counter=1;B.fn.ajaxForm.optionHash={};function C(E){var D=this.form;D.clk=this;if(this.type=="image"){if(E.offsetX!=undefined){D.clk_x=E.offsetX;D.clk_y=E.offsetY}else{if(typeof B.fn.offset=="function"){var F=B(this).offset();D.clk_x=E.pageX-F.left;D.clk_y=E.pageY-F.top}else{D.clk_x=E.pageX-this.offsetLeft;D.clk_y=E.pageY-this.offsetTop}}}setTimeout(function(){D.clk=D.clk_x=D.clk_y=null},10)}function A(){var E=this.formPluginId;var D=B.fn.ajaxForm.optionHash[E];B(this).ajaxSubmit(D);return false}B.fn.ajaxFormUnbind=function(){this.unbind("submit",A);return this.each(function(){B(":submit,input:image",this).unbind("click",C)})};B.fn.formToArray=function(O){var N=[];if(this.length==0){return N}var E=this[0];var I=O?E.getElementsByTagName("*"):E.elements;if(!I){return N}for(var J=0,L=I.length;J<L;J++){var F=I[J];var G=F.name;if(!G){continue}if(O&&E.clk&&F.type=="image"){if(!F.disabled&&E.clk==F){N.push({name:G+".x",value:E.clk_x},{name:G+".y",value:E.clk_y})}continue}var P=B.fieldValue(F,true);if(P&&P.constructor==Array){for(var H=0,D=P.length;H<D;H++){N.push({name:G,value:P[H]})}}else{if(P!==null&&typeof P!="undefined"){N.push({name:G,value:P})}}}if(!O&&E.clk){var K=E.getElementsByTagName("input");for(var J=0,L=K.length;J<L;J++){var M=K[J];var G=M.name;if(G&&!M.disabled&&M.type=="image"&&E.clk==M){N.push({name:G+".x",value:E.clk_x},{name:G+".y",value:E.clk_y})}}}return N};B.fn.formSerialize=function(D){return B.param(this.formToArray(D))};B.fn.fieldSerialize=function(E){var D=[];this.each(function(){var I=this.name;if(!I){return }var G=B.fieldValue(this,E);if(G&&G.constructor==Array){for(var H=0,F=G.length;H<F;H++){D.push({name:I,value:G[H]})}}else{if(G!==null&&typeof G!="undefined"){D.push({name:this.name,value:G})}}});return B.param(D)};B.fn.fieldValue=function(I){for(var H=[],F=0,D=this.length;F<D;F++){var G=this[F];var E=B.fieldValue(G,I);if(E===null||typeof E=="undefined"||(E.constructor==Array&&!E.length)){continue}E.constructor==Array?B.merge(H,E):H.push(E)}return H};B.fieldValue=function(D,J){var F=D.name,O=D.type,P=D.tagName.toLowerCase();if(typeof J=="undefined"){J=true}if(J&&(!F||D.disabled||O=="reset"||O=="button"||(O=="checkbox"||O=="radio")&&!D.checked||(O=="submit"||O=="image")&&D.form&&D.form.clk!=D||P=="select"&&D.selectedIndex==-1)){return null}if(P=="select"){var K=D.selectedIndex;if(K<0){return null}var M=[],E=D.options;var H=(O=="select-one");var L=(H?K+1:E.length);for(var G=(H?K:0);G<L;G++){var I=E[G];if(I.selected){var N=B.browser.msie&&!(I.attributes.value.specified)?I.text:I.value;if(H){return N}M.push(N)}}return M}return D.value};B.fn.clearForm=function(){return this.each(function(){B("input,select,textarea",this).clearFields()})};B.fn.clearFields=B.fn.clearInputs=function(){return this.each(function(){var E=this.type,D=this.tagName.toLowerCase();if(E=="text"||E=="password"||D=="textarea"){this.value=""}else{if(E=="checkbox"||E=="radio"){this.checked=false}else{if(D=="select"){this.selectedIndex=-1}}}})};B.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()}})};B.fn.enable=function(D){if(D==undefined){D=true}return this.each(function(){this.disabled=!D})};B.fn.select=function(D){if(D==undefined){D=true}return this.each(function(){var E=this.type;if(E=="checkbox"||E=="radio"){this.checked=D}else{if(this.tagName.toLowerCase()=="option"){var F=B(this).parent("select");if(D&&F[0]&&F[0].type=="select-one"){F.find("option").select(false)}this.selected=D}}})}})(jQuery);