
/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("undefined"!=typeof jQuery?jQuery:window.Zepto)}(function(e){"use strict";function t(t){var r=t.data;t.isDefaultPrevented()||(t.preventDefault(),e(t.target).ajaxSubmit(r))}function r(t){var r=t.target,a=e(r);if(!a.is("[type=submit],[type=image]")){var n=a.closest("[type=submit]");if(0===n.length)return;r=n[0]}var i=this;if(i.clk=r,"image"==r.type)if(void 0!==t.offsetX)i.clk_x=t.offsetX,i.clk_y=t.offsetY;else if("function"==typeof e.fn.offset){var o=a.offset();i.clk_x=t.pageX-o.left,i.clk_y=t.pageY-o.top}else i.clk_x=t.pageX-r.offsetLeft,i.clk_y=t.pageY-r.offsetTop;setTimeout(function(){i.clk=i.clk_x=i.clk_y=null},100)}function a(){if(e.fn.ajaxSubmit.debug){var t="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(t):window.opera&&window.opera.postError&&window.opera.postError(t)}}var n={};n.fileapi=void 0!==e("<input type='file'/>").get(0).files,n.formdata=void 0!==window.FormData;var i=!!e.fn.prop;e.fn.attr2=function(){if(!i)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},e.fn.ajaxSubmit=function(t){function r(r){var a,n,i=e.param(r,t.traditional).split("&"),o=i.length,s=[];for(a=0;o>a;a++)i[a]=i[a].replace(/\+/g," "),n=i[a].split("="),s.push([decodeURIComponent(n[0]),decodeURIComponent(n[1])]);return s}function o(a){for(var n=new FormData,i=0;i<a.length;i++)n.append(a[i].name,a[i].value);if(t.extraData){var o=r(t.extraData);for(i=0;i<o.length;i++)o[i]&&n.append(o[i][0],o[i][1])}t.data=null;var s=e.extend(!0,{},e.ajaxSettings,t,{contentType:!1,processData:!1,cache:!1,type:u||"POST"});t.uploadProgress&&(s.xhr=function(){var r=e.ajaxSettings.xhr();return r.upload&&r.upload.addEventListener("progress",function(e){var r=0,a=e.loaded||e.position,n=e.total;e.lengthComputable&&(r=Math.ceil(a/n*100)),t.uploadProgress(e,a,n,r)},!1),r}),s.data=null;var c=s.beforeSend;return s.beforeSend=function(e,r){r.data=t.formData?t.formData:n,c&&c.call(this,e,r)},e.ajax(s)}function s(r){function n(e){var t=null;try{e.contentWindow&&(t=e.contentWindow.document)}catch(r){a("cannot get iframe.contentWindow document: "+r)}if(t)return t;try{t=e.contentDocument?e.contentDocument:e.document}catch(r){a("cannot get iframe.contentDocument: "+r),t=e.document}return t}function o(){function t(){try{var e=n(g).readyState;a("state = "+e),e&&"uninitialized"==e.toLowerCase()&&setTimeout(t,50)}catch(r){a("Server abort: ",r," (",r.name,")"),s(k),j&&clearTimeout(j),j=void 0}}var r=f.attr2("target"),i=f.attr2("action"),o="multipart/form-data",c=f.attr("enctype")||f.attr("encoding")||o;w.setAttribute("target",p),(!u||/post/i.test(u))&&w.setAttribute("method","POST"),i!=m.url&&w.setAttribute("action",m.url),m.skipEncodingOverride||u&&!/post/i.test(u)||f.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),m.timeout&&(j=setTimeout(function(){T=!0,s(D)},m.timeout));var l=[];try{if(m.extraData)for(var d in m.extraData)m.extraData.hasOwnProperty(d)&&l.push(e.isPlainObject(m.extraData[d])&&m.extraData[d].hasOwnProperty("name")&&m.extraData[d].hasOwnProperty("value")?e('<input type="hidden" name="'+m.extraData[d].name+'">').val(m.extraData[d].value).appendTo(w)[0]:e('<input type="hidden" name="'+d+'">').val(m.extraData[d]).appendTo(w)[0]);m.iframeTarget||v.appendTo("body"),g.attachEvent?g.attachEvent("onload",s):g.addEventListener("load",s,!1),setTimeout(t,15);try{w.submit()}catch(h){var x=document.createElement("form").submit;x.apply(w)}}finally{w.setAttribute("action",i),w.setAttribute("enctype",c),r?w.setAttribute("target",r):f.removeAttr("target"),e(l).remove()}}function s(t){if(!x.aborted&&!F){if(M=n(g),M||(a("cannot access response document"),t=k),t===D&&x)return x.abort("timeout"),void S.reject(x,"timeout");if(t==k&&x)return x.abort("server abort"),void S.reject(x,"error","server abort");if(M&&M.location.href!=m.iframeSrc||T){g.detachEvent?g.detachEvent("onload",s):g.removeEventListener("load",s,!1);var r,i="success";try{if(T)throw"timeout";var o="xml"==m.dataType||M.XMLDocument||e.isXMLDoc(M);if(a("isXml="+o),!o&&window.opera&&(null===M.body||!M.body.innerHTML)&&--O)return a("requeing onLoad callback, DOM not available"),void setTimeout(s,250);var u=M.body?M.body:M.documentElement;x.responseText=u?u.innerHTML:null,x.responseXML=M.XMLDocument?M.XMLDocument:M,o&&(m.dataType="xml"),x.getResponseHeader=function(e){var t={"content-type":m.dataType};return t[e.toLowerCase()]},u&&(x.status=Number(u.getAttribute("status"))||x.status,x.statusText=u.getAttribute("statusText")||x.statusText);var c=(m.dataType||"").toLowerCase(),l=/(json|script|text)/.test(c);if(l||m.textarea){var f=M.getElementsByTagName("textarea")[0];if(f)x.responseText=f.value,x.status=Number(f.getAttribute("status"))||x.status,x.statusText=f.getAttribute("statusText")||x.statusText;else if(l){var p=M.getElementsByTagName("pre")[0],h=M.getElementsByTagName("body")[0];p?x.responseText=p.textContent?p.textContent:p.innerText:h&&(x.responseText=h.textContent?h.textContent:h.innerText)}}else"xml"==c&&!x.responseXML&&x.responseText&&(x.responseXML=X(x.responseText));try{E=_(x,c,m)}catch(y){i="parsererror",x.error=r=y||i}}catch(y){a("error caught: ",y),i="error",x.error=r=y||i}x.aborted&&(a("upload aborted"),i=null),x.status&&(i=x.status>=200&&x.status<300||304===x.status?"success":"error"),"success"===i?(m.success&&m.success.call(m.context,E,"success",x),S.resolve(x.responseText,"success",x),d&&e.event.trigger("ajaxSuccess",[x,m])):i&&(void 0===r&&(r=x.statusText),m.error&&m.error.call(m.context,x,i,r),S.reject(x,"error",r),d&&e.event.trigger("ajaxError",[x,m,r])),d&&e.event.trigger("ajaxComplete",[x,m]),d&&!--e.active&&e.event.trigger("ajaxStop"),m.complete&&m.complete.call(m.context,x,i),F=!0,m.timeout&&clearTimeout(j),setTimeout(function(){m.iframeTarget?v.attr("src",m.iframeSrc):v.remove(),x.responseXML=null},100)}}}var c,l,m,d,p,v,g,x,y,b,T,j,w=f[0],S=e.Deferred();if(S.abort=function(e){x.abort(e)},r)for(l=0;l<h.length;l++)c=e(h[l]),i?c.prop("disabled",!1):c.removeAttr("disabled");if(m=e.extend(!0,{},e.ajaxSettings,t),m.context=m.context||m,p="jqFormIO"+(new Date).getTime(),m.iframeTarget?(v=e(m.iframeTarget),b=v.attr2("name"),b?p=b:v.attr2("name",p)):(v=e('<iframe name="'+p+'" src="'+m.iframeSrc+'" />'),v.css({position:"absolute",top:"-1000px",left:"-1000px"})),g=v[0],x={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(t){var r="timeout"===t?"timeout":"aborted";a("aborting upload... "+r),this.aborted=1;try{g.contentWindow.document.execCommand&&g.contentWindow.document.execCommand("Stop")}catch(n){}v.attr("src",m.iframeSrc),x.error=r,m.error&&m.error.call(m.context,x,r,t),d&&e.event.trigger("ajaxError",[x,m,r]),m.complete&&m.complete.call(m.context,x,r)}},d=m.global,d&&0===e.active++&&e.event.trigger("ajaxStart"),d&&e.event.trigger("ajaxSend",[x,m]),m.beforeSend&&m.beforeSend.call(m.context,x,m)===!1)return m.global&&e.active--,S.reject(),S;if(x.aborted)return S.reject(),S;y=w.clk,y&&(b=y.name,b&&!y.disabled&&(m.extraData=m.extraData||{},m.extraData[b]=y.value,"image"==y.type&&(m.extraData[b+".x"]=w.clk_x,m.extraData[b+".y"]=w.clk_y)));var D=1,k=2,A=e("meta[name=csrf-token]").attr("content"),L=e("meta[name=csrf-param]").attr("content");L&&A&&(m.extraData=m.extraData||{},m.extraData[L]=A),m.forceSync?o():setTimeout(o,10);var E,M,F,O=50,X=e.parseXML||function(e,t){return window.ActiveXObject?(t=new ActiveXObject("Microsoft.XMLDOM"),t.async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!=t.documentElement.nodeName?t:null},C=e.parseJSON||function(e){return window.eval("("+e+")")},_=function(t,r,a){var n=t.getResponseHeader("content-type")||"",i="xml"===r||!r&&n.indexOf("xml")>=0,o=i?t.responseXML:t.responseText;return i&&"parsererror"===o.documentElement.nodeName&&e.error&&e.error("parsererror"),a&&a.dataFilter&&(o=a.dataFilter(o,r)),"string"==typeof o&&("json"===r||!r&&n.indexOf("json")>=0?o=C(o):("script"===r||!r&&n.indexOf("javascript")>=0)&&e.globalEval(o)),o};return S}if(!this.length)return a("ajaxSubmit: skipping submit process - no element selected"),this;var u,c,l,f=this;"function"==typeof t?t={success:t}:void 0===t&&(t={}),u=t.type||this.attr2("method"),c=t.url||this.attr2("action"),l="string"==typeof c?e.trim(c):"",l=l||window.location.href||"",l&&(l=(l.match(/^([^#]+)/)||[])[1]),t=e.extend(!0,{url:l,success:e.ajaxSettings.success,type:u||e.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},t);var m={};if(this.trigger("form-pre-serialize",[this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(t.beforeSerialize&&t.beforeSerialize(this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var d=t.traditional;void 0===d&&(d=e.ajaxSettings.traditional);var p,h=[],v=this.formToArray(t.semantic,h);if(t.data&&(t.extraData=t.data,p=e.param(t.data,d)),t.beforeSubmit&&t.beforeSubmit(v,this,t)===!1)return a("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[v,this,t,m]),m.veto)return a("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var g=e.param(v,d);p&&(g=g?g+"&"+p:p),"GET"==t.type.toUpperCase()?(t.url+=(t.url.indexOf("?")>=0?"&":"?")+g,t.data=null):t.data=g;var x=[];if(t.resetForm&&x.push(function(){f.resetForm()}),t.clearForm&&x.push(function(){f.clearForm(t.includeHidden)}),!t.dataType&&t.target){var y=t.success||function(){};x.push(function(r){var a=t.replaceTarget?"replaceWith":"html";e(t.target)[a](r).each(y,arguments)})}else t.success&&x.push(t.success);if(t.success=function(e,r,a){for(var n=t.context||this,i=0,o=x.length;o>i;i++)x[i].apply(n,[e,r,a||f,f])},t.error){var b=t.error;t.error=function(e,r,a){var n=t.context||this;b.apply(n,[e,r,a,f])}}if(t.complete){var T=t.complete;t.complete=function(e,r){var a=t.context||this;T.apply(a,[e,r,f])}}var j=e("input[type=file]:enabled",this).filter(function(){return""!==e(this).val()}),w=j.length>0,S="multipart/form-data",D=f.attr("enctype")==S||f.attr("encoding")==S,k=n.fileapi&&n.formdata;a("fileAPI :"+k);var A,L=(w||D)&&!k;t.iframe!==!1&&(t.iframe||L)?t.closeKeepAlive?e.get(t.closeKeepAlive,function(){A=s(v)}):A=s(v):A=(w||D)&&k?o(v):e.ajax(t),f.removeData("jqxhr").data("jqxhr",A);for(var E=0;E<h.length;E++)h[E]=null;return this.trigger("form-submit-notify",[this,t]),this},e.fn.ajaxForm=function(n){if(n=n||{},n.delegation=n.delegation&&e.isFunction(e.fn.on),!n.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!e.isReady&&i.s?(a("DOM not ready, queuing ajaxForm"),e(function(){e(i.s,i.c).ajaxForm(n)}),this):(a("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)")),this)}return n.delegation?(e(document).off("submit.form-plugin",this.selector,t).off("click.form-plugin",this.selector,r).on("submit.form-plugin",this.selector,n,t).on("click.form-plugin",this.selector,n,r),this):this.ajaxFormUnbind().bind("submit.form-plugin",n,t).bind("click.form-plugin",n,r)},e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")},e.fn.formToArray=function(t,r){var a=[];if(0===this.length)return a;var i,o=this[0],s=this.attr("id"),u=t?o.getElementsByTagName("*"):o.elements;if(u&&!/MSIE [678]/.test(navigator.userAgent)&&(u=e(u).get()),s&&(i=e(':input[form="'+s+'"]').get(),i.length&&(u=(u||[]).concat(i))),!u||!u.length)return a;var c,l,f,m,d,p,h;for(c=0,p=u.length;p>c;c++)if(d=u[c],f=d.name,f&&!d.disabled)if(t&&o.clk&&"image"==d.type)o.clk==d&&(a.push({name:f,value:e(d).val(),type:d.type}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}));else if(m=e.fieldValue(d,!0),m&&m.constructor==Array)for(r&&r.push(d),l=0,h=m.length;h>l;l++)a.push({name:f,value:m[l]});else if(n.fileapi&&"file"==d.type){r&&r.push(d);var v=d.files;if(v.length)for(l=0;l<v.length;l++)a.push({name:f,value:v[l],type:d.type});else a.push({name:f,value:"",type:d.type})}else null!==m&&"undefined"!=typeof m&&(r&&r.push(d),a.push({name:f,value:m,type:d.type,required:d.required}));if(!t&&o.clk){var g=e(o.clk),x=g[0];f=x.name,f&&!x.disabled&&"image"==x.type&&(a.push({name:f,value:g.val()}),a.push({name:f+".x",value:o.clk_x},{name:f+".y",value:o.clk_y}))}return a},e.fn.formSerialize=function(t){return e.param(this.formToArray(t))},e.fn.fieldSerialize=function(t){var r=[];return this.each(function(){var a=this.name;if(a){var n=e.fieldValue(this,t);if(n&&n.constructor==Array)for(var i=0,o=n.length;o>i;i++)r.push({name:a,value:n[i]});else null!==n&&"undefined"!=typeof n&&r.push({name:this.name,value:n})}}),e.param(r)},e.fn.fieldValue=function(t){for(var r=[],a=0,n=this.length;n>a;a++){var i=this[a],o=e.fieldValue(i,t);null===o||"undefined"==typeof o||o.constructor==Array&&!o.length||(o.constructor==Array?e.merge(r,o):r.push(o))}return r},e.fieldValue=function(t,r){var a=t.name,n=t.type,i=t.tagName.toLowerCase();if(void 0===r&&(r=!0),r&&(!a||t.disabled||"reset"==n||"button"==n||("checkbox"==n||"radio"==n)&&!t.checked||("submit"==n||"image"==n)&&t.form&&t.form.clk!=t||"select"==i&&-1==t.selectedIndex))return null;if("select"==i){var o=t.selectedIndex;if(0>o)return null;for(var s=[],u=t.options,c="select-one"==n,l=c?o+1:u.length,f=c?o:0;l>f;f++){var m=u[f];if(m.selected){var d=m.value;if(d||(d=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),c)return d;s.push(d)}}return s}return e(t).val()},e.fn.clearForm=function(t){return this.each(function(){e("input,select,textarea",this).clearFields(t)})},e.fn.clearFields=e.fn.clearInputs=function(t){var r=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var a=this.type,n=this.tagName.toLowerCase();r.test(a)||"textarea"==n?this.value="":"checkbox"==a||"radio"==a?this.checked=!1:"select"==n?this.selectedIndex=-1:"file"==a?/MSIE/.test(navigator.userAgent)?e(this).replaceWith(e(this).clone(!0)):e(this).val(""):t&&(t===!0&&/hidden/.test(a)||"string"==typeof t&&e(this).is(t))&&(this.value="")})},e.fn.resetForm=function(){return this.each(function(){("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset()})},e.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},e.fn.selected=function(t){return void 0===t&&(t=!0),this.each(function(){var r=this.type;if("checkbox"==r||"radio"==r)this.checked=t;else if("option"==this.tagName.toLowerCase()){var a=e(this).parent("select");t&&a[0]&&"select-one"==a[0].type&&a.find("option").selected(!1),this.selected=t}})},e.fn.ajaxSubmit.debug=!1});



(function($, document, window){
    'use strict';

    function EasyEditor( element, options ){
        this.elem = element;
        options = options || {};
        this.className = options.className || 'easyeditor';

        // 'bold', 'italic', 'link', 'h2', 'h3', 'h4', 'alignleft', 'aligncenter', 'alignright', 'quote', 'code', 'list', 'x', 'source'
        var defaultButtons = ['bold', 'italic', 'link', 'h2', 'h3', 'h4', 'alignleft', 'aligncenter', 'alignright'];
        this.buttons = options.buttons || defaultButtons;
        this.buttonsHtml = options.buttonsHtml || null;
        this.overwriteButtonSettings = options.overwriteButtonSettings || null;
        this.css = options.css || null;
        this.onLoaded = typeof options.onLoaded === 'function' ? options.onLoaded : null;
        this.randomString = Math.random().toString(36).substring(7);
        this.theme = options.theme || null;
        this.dropdown = options.dropdown || {};

        this.attachEvents();
    }

    // initialize
    EasyEditor.prototype.attachEvents = function() {
        this.bootstrap();
        this.addToolbar();
        this.handleKeypress();
        this.handleResizeImage();
        this.utils();

        if(this.onLoaded !== null) {
            this.onLoaded.call(this);
        }
    };

    // destory editor
    EasyEditor.prototype.detachEvents = function() {
        var _this = this;
        var $container = $(_this.elem).closest('.' + _this.className +'-wrapper');
        var $toolbar = $container.find('.' + _this.className +'-toolbar');

        $toolbar.remove();
        $(_this.elem).removeClass(_this.className).removeAttr('contenteditable').unwrap();
    };

    // Adding necessary classes and attributes in editor
    EasyEditor.prototype.bootstrap = function() {
        var _this = this;
        var tag = $(_this.elem).prop('tagName').toLowerCase();

        if(tag === 'textarea' || tag === 'input') {
            var placeholderText = $(_this.elem).attr('placeholder') || '';

            var marginTop = $(_this.elem).css('marginTop') || 0;
            var marginBottom = $(_this.elem).css('marginBottom') || 0;
            var style = '';
            if(marginTop.length > 0 || marginBottom.length > 0) {
                style = ' style="margin-top: ' + marginTop + '; margin-bottom: ' + marginBottom + '" ';
            }

            $(_this.elem).after('<div id="' + _this.randomString + '-editor" placeholder="' + placeholderText + '">' + $(_this.elem).val() + '</div>');
            $(_this.elem).hide().addClass(_this.randomString + '-bind');

            _this.elem = document.getElementById(_this.randomString + '-editor');
            $(_this.elem).attr('contentEditable', true).addClass(_this.className).wrap('<div class="'+ _this.className +'-wrapper"' + style + '></div>');
        }
        else {
            $(_this.elem).attr('contentEditable', true).addClass(_this.className).wrap('<div class="'+ _this.className +'-wrapper"></div>');
        }

        this.$wrapperElem = $(_this.elem).parent();

        if(_this.css !== null) {
            $(_this.elem).css(_this.css);
        }

        this.containerClass = '.' + _this.className +'-wrapper';

        if(typeof _this.elem === 'string') {
            _this.elem = $(_this.elem).get(0);
        }

        if(_this.theme !== null) {
            $(_this.elem).closest(_this.containerClass).addClass(_this.theme);
        }
    };

    // enter and paste key handler
    EasyEditor.prototype.handleKeypress = function(){
        var _this = this;

        $(_this.elem).keydown(function(e) {
            if(e.keyCode === 13 && _this.isSelectionInsideElement('li') === false) {
                e.preventDefault();

                if(e.shiftKey === true) {
                    document.execCommand('insertHTML', false, '<br>');
                }
                else {
                    document.execCommand('insertHTML', false, '<br><br>');
                }

                return false;
            }
        });

        _this.elem.addEventListener('paste', function(e) {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain').replace(/\n/ig, '<br>');
            document.execCommand('insertHTML', false, text);
        });

    };

    EasyEditor.prototype.isSelectionInsideElement = function(tagName) {
        var sel, containerNode;
        tagName = tagName.toUpperCase();
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount > 0) {
                containerNode = sel.getRangeAt(0).commonAncestorContainer;
            }
        } else if ( (sel = document.selection) && sel.type != "Control" ) {
            containerNode = sel.createRange().parentElement();
        }
        while (containerNode) {
            if (containerNode.nodeType == 1 && containerNode.tagName == tagName) {
                return true;
            }
            containerNode = containerNode.parentNode;
        }
        return false;
    };

    // adding toolbar
    EasyEditor.prototype.addToolbar = function(){
        var _this = this;

        $(_this.elem).before('<div class="'+ _this.className +'-toolbar"><ul></ul></div>');
        this.$toolbarContainer = this.$wrapperElem.find('.' + _this.className +'-toolbar');

        this.populateButtons();
    };

    // inejct button events
    EasyEditor.prototype.injectButton = function(settings){
        var _this = this;

        // overwritting default button settings
        if(_this.overwriteButtonSettings !== null && _this.overwriteButtonSettings[settings.buttonIdentifier] !== undefined) {
            var newSettings = $.extend({}, settings, _this.overwriteButtonSettings[settings.buttonIdentifier]);
            settings = newSettings;
        }

        // if button html exists overwrite default button html
        if(_this.buttonsHtml !== null && _this.buttonsHtml[settings.buttonIdentifier] !== undefined) {
            settings.buttonHtml = _this.buttonsHtml[settings.buttonIdentifier];
        }

        // if buttonTitle parameter exists
        var buttonTitle;
        if(settings.buttonTitle) {
            buttonTitle = settings.buttonTitle;
        }
        else {
            buttonTitle = settings.buttonIdentifier.replace(/\W/g, ' ');
        }

        // adding button html
        if(settings.buttonHtml) {
            if(settings.childOf !== undefined) {
                var $parentContainer = _this.$toolbarContainer.find('.toolbar-' + settings.childOf).parent('li');

                if($parentContainer.find('ul').length === 0) {
                    $parentContainer.append('<ul></ul>');
                }

                $parentContainer = $parentContainer.find('ul');
                $parentContainer.append('<li><button type="button" class="toolbar-'+ settings.buttonIdentifier +'" title="'+ buttonTitle +'">'+ settings.buttonHtml +'</button></li>');
            }
            else {
                _this.$toolbarContainer.children('ul').append('<li><button type="button" class="toolbar-'+ settings.buttonIdentifier +'" title="'+ buttonTitle +'">'+ settings.buttonHtml +'</button></li>');
            }
        }

        // bind click event
        if(typeof settings.clickHandler === 'function') {
            $('html').find(_this.elem).closest(_this.containerClass).delegate('.toolbar-'+ settings.buttonIdentifier, 'click', function(event){
                if(typeof settings.hasChild !== undefined && settings.hasChild === true) {
                    event.stopPropagation();
                }
                else {
                    event.preventDefault();
                }

                settings.clickHandler.call(this, this);
                $(_this.elem).trigger('keyup');
            });
        }
    };

    // open dropdown
    EasyEditor.prototype.openDropdownOf = function(identifier){
        var _this = this;
        $(_this.elem).closest(_this.containerClass).find('.toolbar-' + identifier).parent().children('ul').show();
    };

    // bidning all buttons
    EasyEditor.prototype.populateButtons = function(){
        var _this = this;

        $.each(_this.buttons, function(index, button) {
            if(typeof _this[button] === 'function'){
                _this[button]();
            }
        });

    };

    // allowing resizing image
    EasyEditor.prototype.handleResizeImage = function(){
        var _this = this;

        $('html').delegate(_this.containerClass + ' figure', 'click', function(event) {
            event.stopPropagation();
            $(this).addClass('is-resizable');
        });

        $('html').delegate(_this.containerClass + ' figure.is-resizable', 'mousemove', function(event) {
            $(this).find('img').css({ 'width' : $(this).width() + 'px' });
        });

        $(document).click(function() {
            $(_this.elem).find('figure').removeClass('is-resizable');
        });
    };

    // get selection
    EasyEditor.prototype.getSelection = function(){
        if (window.getSelection) {
            var selection = window.getSelection();

            if (selection.rangeCount) {
                return selection;
            }
        }

        return false;
    };

    // remove formatting
    EasyEditor.prototype.removeFormatting = function(arg){
        var _this = this;
        var inFullArea = arg.inFullArea;

        if(_this.isSelectionOutsideOfEditor() === true) {
            return false;
        }

        if(inFullArea === false) {
            var selection = _this.getSelection();
            var selectedText = selection.toString();

            if(selection && selectedText.length > 0) {

                var range = selection.getRangeAt(0);
                var $parent = $(range.commonAncestorContainer.parentNode);

                if($parent.attr('class') === _this.className || $parent.attr('class') === _this.className + '-wrapper') {
                    var node = document.createElement('span');
                    $(node).attr('data-value', 'temp').html(selectedText.replace(/\n/ig, '<br>'));
                    range.deleteContents();
                    range.insertNode(node);

                    $('[data-value="temp"]').contents().unwrap();
                }
                else {

                    var topMostParent;
                    var hasParentNode = false;
                    $.each($parent.parentsUntil(_this.elem), function(index, el) {
                        topMostParent = el;
                        hasParentNode = true;
                    });

                    if(hasParentNode === true) {
                        $(topMostParent).html($(topMostParent).text().replace(/\n/ig, '<br>')).contents().unwrap();
                    }
                    else {
                        $parent.contents().unwrap();
                    }

                }

            }
        }
        else {
            $(_this.elem).html($(_this.elem).text().replace(/\n/ig, '<br>'));
        }

        // _this.removeEmptyTags();
    };

    // removing empty tags
    EasyEditor.prototype.removeEmptyTags = function(){
        var _this = this;
        $(_this.elem).html( $(_this.elem).html().replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/, '') );
    };

    // remove block elemenet from selection
    EasyEditor.prototype.removeBlockElementFromSelection = function(selection, removeBr){
        var _this = this;
        var result;

        removeBr = removeBr === undefined ? false : removeBr;
        var removeBrNode = '';
        if(removeBr === true) {
            removeBrNode = ', br';
        }

        var range = selection.getRangeAt(0);
        var selectedHtml = range.cloneContents();
        var temp = document.createElement('temp');
        $(temp).html(selectedHtml);
        $(temp).find('h1, h2, h3, h4, h5, h6, p, div' + removeBrNode).each(function() { $(this).replaceWith(this.childNodes); });
        result = $(temp).html();

        return result;
    };

    // wrap selction with a tag
    EasyEditor.prototype.wrapSelectionWithNodeName = function(arg){
        var _this = this;
        if(_this.isSelectionOutsideOfEditor() === true) {
            return false;
        }

        var node = {
            name: 'span',
            blockElement: false,
            style: null,
            class: null,
            attribute: null,
            keepHtml: false
        };

        if(typeof arg === 'string') {
            node.name = arg;
        }
        else {
            node.name = arg.nodeName || node.name;
            node.blockElement = arg.blockElement || node.blockElement;
            node.style = arg.style || node.style;
            node.class = arg.class || node.class;
            node.attribute = arg.attribute || node.attribute;
            node.keepHtml = arg.keepHtml || node.keepHtml;
        }

        var selection = _this.getSelection();

        if(selection && selection.toString().length > 0 && selection.rangeCount) {
            // checking if already wrapped
            var isWrapped = _this.isAlreadyWrapped(selection, node);

            // wrap node
            var range = selection.getRangeAt(0).cloneRange();
            var tag = document.createElement(node.name);

                // adding necessary attribute to tag
                if(node.style !== null || node.class !== null || node.attribute !== null) {
                    tag = _this.addAttribute(tag, node);
                }

            // if selection contains html, surround contents has some problem with pre html tag and raw text selection
            if(_this.selectionContainsHtml(range)) {
                range = selection.getRangeAt(0);

                if(node.keepHtml === true) {
                    var clonedSelection = range.cloneContents();
                    var div = document.createElement('div');
                    div.appendChild(clonedSelection);
                    $(tag).html(div.innerHTML);
                }
                else {
                    tag.textContent = selection.toString();
                }

                range.deleteContents();
                range.insertNode(tag);

                if(range.commonAncestorContainer.localName === node.name) {
                    $(range.commonAncestorContainer).contents().unwrap();
                    _this.removeEmptyTags();
                }
            }
            else {
                range.surroundContents(tag);
                selection.removeAllRanges();
                selection.addRange(range);
            }

            if(isWrapped === true) {
                _this.removeWrappedDuplicateTag(tag);
            }

            _this.removeEmptyTags();
            selection.removeAllRanges();
        }
    };

    // wrap selection with unordered list
    EasyEditor.prototype.wrapSelectionWithList = function(tagname){
        var _this = this;
        tagname = tagname || 'ul';

        // preventing outside selection
        if(_this.isSelectionOutsideOfEditor() === true) {
            return false;
        }

        // if text selected
        var selection = _this.getSelection();
        if(selection && selection.toString().length > 0 && selection.rangeCount) {
            var selectedHtml = _this.removeBlockElementFromSelection(selection, true);
            var listArray = selectedHtml.split('\n').filter(function(v){return v!=='';});
            var wrappedListHtml = $.map(listArray, function(item) {
                return '<li>' + $.trim(item) + '</li>';
            });

            var node = document.createElement(tagname);
            $(node).html(wrappedListHtml);

            var range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(node);

            selection.removeAllRanges();
        }

    };

    // if selection contains html tag, surround content fails if selection contains html
    EasyEditor.prototype.selectionContainsHtml = function(range){
        var _this = this;
        if(range.startContainer.parentNode.className === _this.className + '-wrapper') return false;
        else return true;
    };

    // if already wrapped with same tag
    EasyEditor.prototype.isAlreadyWrapped = function(selection, node){
        var _this = this;
        var range = selection.getRangeAt(0);
        var el = $(range.commonAncestorContainer);
        var result = false;

        if( el.parent().prop('tagName').toLowerCase() === node.name && el.parent().hasClass(_this.className) === false ) {
            result = true;
        }
        else if(node.blockElement === true) {
            $.each(el.parentsUntil(_this.elem), function(index, el) {
                var tag = el.tagName.toLowerCase();
                if( $.inArray(tag, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) !== -1 ) {
                    result = true;
                }
            });
        }
        else {
            $.each(el.parentsUntil(_this.elem), function(index, el) {
                var tag = el.tagName.toLowerCase();
                if( tag === node.name ) {
                    result = true;
                }
            });
        }

        return result;
    };

    // remove wrap if already wrapped with same tag
    EasyEditor.prototype.removeWrappedDuplicateTag = function(tag){
        var _this = this;
        var tagName = tag.tagName;

        $(tag).unwrap();

        if($(tag).prop('tagName') === tagName && $(tag).parent().hasClass(_this.className) === false && $(tag).parent().hasClass(_this.className + '-wrapper')) {
            $(tag).unwrap();
        }
    };

    // adding attribute in tag
    EasyEditor.prototype.addAttribute = function(tag, node){
        if(node.style !== null) {
            $(tag).attr('style', node.style);
        }

        if(node.class !== null) {
            $(tag).addClass(node.class);
        }

        if(node.attribute !== null) {
            if($.isArray(node.attribute) === true) {
                $(tag).attr(node.attribute[0], node.attribute[1]);
            }
            else {
                $(tag).attr(node.attribute);
            }
        }

        return tag;
    };

    // insert a node into cursor point in editor
    EasyEditor.prototype.insertAtCaret = function(node){
        var _this = this;
        if(_this.isSelectionOutsideOfEditor() === true) {
            return false;
        }

        if(_this.getSelection()) {
            var range = _this.getSelection().getRangeAt(0);
            range.insertNode(node);
        }
        else {
            $(node).appendTo(_this.elem);
        }
    };

    // checking if selection outside of editor or not
    EasyEditor.prototype.isSelectionOutsideOfEditor = function(){
        return !this.elementContainsSelection(this.elem);
    };

    // node contains in containers or not
    EasyEditor.prototype.isOrContains = function(node, container) {
        while (node) {
            if (node === container) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };

    // selected text is inside container
    EasyEditor.prototype.elementContainsSelection = function(el) {
        var _this = this;
        var sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount > 0) {
                for (var i = 0; i < sel.rangeCount; ++i) {
                    if (!_this.isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
                        return false;
                    }
                }
                return true;
            }
        } else if ( (sel = document.selection) && sel.type !== "Control") {
            return _this.isOrContains(sel.createRange().parentElement(), el);
        }
        return false;
    };

    // insert html chunk into editor's temp tag
    EasyEditor.prototype.insertHtml = function(html){
        var _this = this;
        $(_this.elem).find('temp').html(html);
    };

    // utility of editor
    EasyEditor.prototype.utils = function(){
        var _this = this;

        $('html').delegate('.'+ _this.className +'-modal-close', 'click', function(event) {
            event.preventDefault();
            _this.closeModal('#' + $(this).closest('.'+ _this.className + '-modal').attr('id'));
        });

        if( $('.' + _this.randomString + '-bind').length > 0 ) {
            var bindData;
            $('html').delegate(_this.elem, 'click keyup', function() {
                var el = _this.elem;
                clearTimeout(bindData);
                bindData = setTimeout(function(){ $('.' + _this.randomString + '-bind').html( $(el).html() ); }, 250);
            });
        }

        $(document).click(function(event) {
            $('.' + _this.className).closest('.' + _this.className + '-wrapper').find('.' + _this.className + '-toolbar > ul > li > ul').hide();
        });
    };

    // youtube video id from url
    EasyEditor.prototype.getYoutubeVideoIdFromUrl = function(url){
        if(url.length === 0) return false;
        var videoId = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            videoId = url[2].split(/[^0-9a-z_\-]/i);
            videoId = videoId[0];
        }
        else {
            videoId = url;
        }
        return videoId;
    };

    // opening modal window
    EasyEditor.prototype.openModal = function(selector){
        var temp = document.createElement('temp');
        temp.textContent = '.';
        this.insertAtCaret(temp);

        $(selector).removeClass('is-hidden');
    };

    // closing modal window
    EasyEditor.prototype.closeModal = function(selector){
        var _this = this;

        $(selector).addClass('is-hidden').find('input').val('');
        $(selector).find('.' + _this.className + '-modal-content-body-loader').css('width', '0');
        var $temp = $(this.elem).find('temp');

        if($temp.html() === '.') {
            $temp.remove();
        }
        else {
            $temp.contents().unwrap();
        }

        $(this.elem).focus();
    };

    EasyEditor.prototype.bold = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'bold',
            buttonHtml: 'B',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'strong', keepHtml: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.italic = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'italic',
            buttonHtml: 'I',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'em', keepHtml: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.h2 = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'header-2',
            buttonHtml: 'H2',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'h2', blockElement: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.h3 = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'header-3',
            buttonHtml: 'H3',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'h3', blockElement: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.h4 = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'header-4',
            buttonHtml: 'H4',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'h4', blockElement: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.x = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'remove-formatting',
            buttonHtml: 'x',
            clickHandler: function(){
                _this.removeFormatting({ inFullArea: false });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.alignleft = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'align-left',
            buttonHtml: 'Align left',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'p', style: 'text-align: left', class: 'text-left', keepHtml: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.aligncenter = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'align-center',
            buttonHtml: 'Align center',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'p', style: 'text-align: center', class: 'text-center', keepHtml: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.alignright = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'align-right',
            buttonHtml: 'Align right',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'p', style: 'text-align: right', class: 'text-right', keepHtml: true });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.quote = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'quote',
            buttonHtml: 'Quote',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'blockquote' });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.code = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'code',
            buttonHtml: 'Code',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'pre' });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.link = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'link',
            buttonHtml: 'Link',
            clickHandler: function(){
                _this.wrapSelectionWithNodeName({ nodeName: 'a', attribute: ['href', prompt('Insert link', '')] });
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.list = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'list',
            buttonHtml: 'List',
            clickHandler: function(){
                _this.wrapSelectionWithList();
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.source = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'source',
            buttonHtml: 'Source',
            clickHandler: function(thisButton){
                var $elemContainer = $(thisButton).closest('.' + _this.className + '-wrapper');
                var $elem = $elemContainer.find('.' + _this.className);
                var $tempTextarea;

                if($(thisButton).hasClass('is-view-source-mode')) {
                    $tempTextarea = $('body > textarea.' + _this.className + '-temp');
                    $elem.css('visibility', 'visible');
                    $tempTextarea.remove();
                    $(thisButton).removeClass('is-view-source-mode');
                }
                else {
                    $('body').append('<textarea class="' + _this.className + '-temp" style="position: absolute; margin: 0;"></textarea>');
                    $tempTextarea = $('body > textarea.' + _this.className + '-temp');

                    $tempTextarea.css({
                        'top' : $elem.offset().top,
                        'left' : $elem.offset().left,
                        'width' : $elem.outerWidth(),
                        'height' : $elem.outerHeight()
                    }).html( $elem.html() );

                    if( $elem.css('border') !== undefined ) {
                        $tempTextarea.css('border', $elem.css('border'));
                    }

                    $elem.css('visibility', 'hidden');
                    $(thisButton).addClass('is-view-source-mode');

                    $tempTextarea.on('keyup click change keypress', function() {
                        $elem.html( $(this).val() );
                    });
                }
            }
        };

        _this.injectButton(settings);
    };

    window.EasyEditor = EasyEditor;

    $.fn.easyEditor = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_easyEditor')) {
                $.data(this, 'plugin_easyEditor',
                new EasyEditor( this, options ));
            }
        });
    };

})(jQuery, document, window);




    EasyEditor.prototype.image = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'insert-image',
            buttonHtml: 'Insert image',
            clickHandler: function(){
                _this.openModal('#easyeditor-modal-1');
            }
        };

        _this.injectButton(settings);
    };

    EasyEditor.prototype.youtube = function(){
        var _this = this;
        var settings = {
            buttonIdentifier: 'insert-youtube-video',
            buttonHtml: 'Insert youtube video',
            clickHandler: function(){
                var youttibeVideoLink = prompt('Insert youtube video link', '');
                var videoId = _this.getYoutubeVideoIdFromUrl(youttibeVideoLink);

                if(videoId.length > 0) {
                    var iframe = document.createElement('iframe');
                    $(iframe).attr({ width: '560', height: '315', frameborder: 0, allowfullscreen: true, src: 'https://www.youtube.com/embed/' + videoId });
                    _this.insertAtCaret(iframe);
                }
                else {
                    alert('Invalid YouTube URL!');
                }

            }
        };

        _this.injectButton(settings);
    };


    jQuery(document).ready(function($) {
        var easyEditor = new EasyEditor('#editor', {
            buttons: ['bold', 'italic', 'link', 'h2', 'h3', 'h4', 'alignleft', 'aligncenter', 'alignright', 'quote', 'code', 'image', 'youtube', 'list', 'x']
        });

        // form uploader starts
        $loader = $('.easyeditor-modal-content-body-loader');
        $('.easyeditor-modal-content-body').find('form').ajaxForm({
            beforeSend: function() {
                $loader.css('width', '0%');
            },
            uploadProgress: function(event, position, total, percentComplete) {
                $loader.css('width', percentComplete + '%');
            },
            success: function() {
                $loader.css('width', '100%');
            },
            complete: function(get) {
                if(get.responseText != 'null') {
                    easyEditor.insertHtml('<figure><img src="uploader_sdk/images/'+ get.responseText +'" alt=""></figure>');
                    easyEditor.closeModal('#easyeditor-modal-1');
                }
            }
        });
        // form uploader ends


        // sticky toolbar
        var $cache = $('.easyeditor-toolbar');
        var width = $cache.width();
        var vTop = $cache.offset().top - parseFloat($cache.css('marginTop').replace(/auto/, 0));
        $(window).scroll(function (event) {
            var y = $(this).scrollTop();

            if (y >= vTop) {
                $cache.addClass('is-fixed').css('width', width + 'px');
            } else {
                $cache.removeClass('is-fixed').css('width', 'auto');
            }
        });

    });
