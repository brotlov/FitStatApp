!function(e){e.fn.multiple_emails=function(a){var t={checkDupEmail:!0,theme:"Bootstrap",position:"top"},i=e.extend({},t,a),u="";return i.theme.toLowerCase()=="Bootstrap".toLowerCase()?u='<a href="#" class="multiple_emails-close" title="Remove"><span class="fa fa-remove"></span></a>':i.theme.toLowerCase()=="SemanticUI".toLowerCase()||i.theme.toLowerCase()=="Semantic-UI".toLowerCase()||i.theme.toLowerCase()=="Semantic UI".toLowerCase()?u='<a href="#" class="multiple_emails-close" title="Remove"><i class="remove icon"></i></a>':i.theme.toLowerCase()=="Basic".toLowerCase()&&(u='<a href="#" class="multiple_emails-close" title="Remove"><i class="basicdeleteicon">Remove</i></a>'),this.each(function(){function a(a,i){var F=a.val().trim().replace(/^,|,$/g,"").replace(/^;|;$/g,"");F=F.replace(/"/g,""),F=F.split(/[\s,;]+/);for(var n=new Array,o=new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i),r=0;r<F.length;r++)i===!0&&-1!=l.val().indexOf(F[r])?F[r]&&F[r].length>0&&!new function(){var e=s.find(".email_name[data-email="+F[r].toLowerCase().replace(".","\\.").replace("@","\\@")+"]");e.css("font-weight","bold"),setTimeout(function(){e.css("font-weight","")},1500)}:1==o.test(F[r])?s.append(e('<li class="multiple_emails-email"><span class="email_name" data-email="'+F[r].toLowerCase()+'">'+F[r]+"</span></li>").prepend(e(u).click(function(a){e(this).parent().remove(),t(),a.preventDefault()}))):n.push(F[r]);n.length>0?a.val(n.join("; ")).addClass("multiple_emails-error"):a.val(""),t()}function t(){var a=new Array,t=l.siblings(".multiple_emails-container");t.find(".multiple_emails-email span.email_name").each(function(){a.push(e(this).html())}),l.val(JSON.stringify(a)).trigger("change")}function F(e){try{JSON.parse(e)}catch(a){return!1}return!0}var l=e(this),s=e('<ul class="multiple_emails-ul" />');""!=e(this).val()&&F(e(this).val())&&e.each(jQuery.parseJSON(e(this).val()),function(a,i){s.append(e('<li class="multiple_emails-email"><span class="email_name" data-email="'+i.toLowerCase()+'">'+i+"</span></li>").prepend(e(u).click(function(a){e(this).parent().remove(),t(),a.preventDefault()})))});var n=e('<input type="text" class="multiple_emails-input text-left" />').on("keyup",function(t){e(this).removeClass("multiple_emails-error");var u;e(this).val().length;window.event?u=t.keyCode:t.which&&(u=t.which),9==u||32==u||188==u?a(e(this),i.checkDupEmail):13==u&&(a(e(this),i.checkDupEmail),t.preventDefault())}).on("blur",function(t){""!=e(this).val()&&a(e(this),i.checkDupEmail)}),o=e('<div class="multiple_emails-container" />').click(function(){n.focus()});return"top"===i.position.toLowerCase()?o.append(s).append(n).insertAfter(e(this)):o.append(n).append(s).insertBefore(e(this)),e(this).hide()})}}(jQuery);


$('.emailBS').multiple_emails({position: "bottom"});