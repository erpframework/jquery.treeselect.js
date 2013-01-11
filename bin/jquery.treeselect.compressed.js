(function(b){b.fn.treeselect=function(c){c=b.extend({colwidth:18,default_value:{},selected:null,treeloaded:null,load:null,searcher:null,deepLoad:!1,onbuild:null,postbuild:null,inputName:"treeselect",showRoot:!1,selectAll:!1,selectAllText:"Select All"},c);var l={},d=function(a,e){this.root=!!e;a.title=a.title||"anonymous";b.extend(this,{id:0,nodeloaded:!1,allLoaded:!1,value:0,title:"",url:"",has_children:!0,children:[],data:{},level:0,odd:!1,checked:!1,busy:!1,display:b(),input:b(),link:b(),span:b(),
childlist:b(),exclude:{}},a);this.isTreeNode=!0;this.loading=!1;this.loadqueue=[]};d.prototype.setBusy=function(a){a!=this.span.hasClass("treebusy")&&((this.busy=a)?this.span.addClass("treebusy"):this.span.removeClass("treebusy"))};d.prototype.isLoaded=function(){var a=this.nodeloaded,a=a|l.hasOwnProperty(this.id),a=a|!this.has_children;return a|=this.has_children&&0<this.children.length};d.prototype.loadNode=function(a,e){this.loading?a&&this.loadqueue.push(a):(this.loading=!0,c.load&&!this.isLoaded()?
(e||this.setBusy(!0),c.load(this,function(b){return function(c){b.nodeloaded||(b=jQuery.extend(b,c),b.nodeloaded=!0,l[b.id]=b.id,b.build());a&&a(b);for(var d in b.loadqueue)b.loadqueue[d](b);b.loadqueue.length=0;e||b.setBusy(!1)}}(this))):a&&a(this),this.loading=!1)};d.prototype.loadAll=function(a,e,b,c){c=c||{};this.loadNode(function(d){e&&e(d);var f=d.children.length,j=f;if(!f||c.hasOwnProperty(d.id))a&&a(d);else{c[d.id]=d.id;for(b||d.setBusy(!0);f--;)d.children[f].loadAll(function(){j--;j||(a&&
a(d),b||d.setBusy(!1))},e,b,c)}})};d.prototype.expand=function(a){this.checked=this.input.is(":checked");a?(this.link.removeClass("collapsed").addClass("expanded"),this.span.removeClass("collapsed").addClass("expanded"),this.childlist.show("fast")):0<this.span.length&&(this.link.removeClass("expanded").addClass("collapsed"),this.span.removeClass("expanded").addClass("collapsed"),this.childlist.hide("fast"));a&&!this.isLoaded()&&this.loadNode(function(a){a.checked&&a.select(a.checked);a.expand(!0)})};
d.prototype.selectChildren=function(a){for(var b=this.children.length;b--;)this.children[b].select(a,!0)};d.prototype.check=function(a){this.checked=a;this.input.attr("checked",a);c.selected&&c.selected(this,!0)};d.prototype.select=function(a,b){this.input.hasClass("treenode-no-select")||(this.checked=a,this.input.attr("checked",a));a&&c.deepLoad?this.loadAll(function(d){d.selectChildren(a);c.selected&&c.selected(d,!b)}):(this.selectChildren(a),c.selected&&c.selected(this,!b))};d.prototype.build_treenode=
function(){var a=b(),a=b(document.createElement(this.root?"div":"li"));a.addClass("treenode");a.addClass(this.odd?"odd":"even");return a};d.prototype.build_input=function(a){if(c.inputName){if("undefined"!==typeof this.exclude[this.id])this.input=b(document.createElement("div")),this.input.addClass("treenode-no-select");else{this.input=b(document.createElement("input"));var e=this.value||this.id;this.input.attr({type:"checkbox",value:e,name:c.inputName+"-"+e,checked:this.checked}).addClass("treenode-input");
this.input.bind("click",function(a){return function(e){e=b(e.target).is(":checked");a.expand(e);a.select(e)}}(this));this.root&&!c.showRoot&&this.input.hide()}this.input.css("left",a+"px")}return this.input};d.prototype.build_link=function(a){a.css("cursor","pointer").addClass("collapsed");a.bind("click",{node:this},function(a){a.preventDefault();a.data.node.expand(b(a.target).hasClass("collapsed"))});return a};d.prototype.build_span=function(a){if((!this.root||this.showRoot)&&this.has_children)this.span=
this.build_link(b(document.createElement("span")).attr({"class":"treeselect-expand"})),this.span.css("left",a+"px");return this.span};d.prototype.build_title=function(a){if((!this.root||this.showRoot)&&this.title)this.nodeLink=b(document.createElement("a")).attr({"class":"treeselect-title",href:this.url,target:"_blank"}).css("marginLeft",a+"px").text(this.title),this.link=this.has_children?this.build_link(this.nodeLink.clone()):b(document.createElement("div")).attr({"class":"treeselect-title"}).css("marginLeft",
a+"px").text(this.title);return this.link};d.prototype.build_children=function(){this.childlist=b();if(0<this.children.length){this.childlist=b(document.createElement("ul"));var a=this.odd,e;for(e in this.children)this.children.hasOwnProperty(e)&&(a=!a,this.children[e]=new d(b.extend(this.children[e],{level:this.level+1,odd:a,checked:this.checked,exclude:this.exclude})),this.childlist.append(this.children[e].build()))}return this.childlist};d.prototype.build=function(){var a=5,e=null;if(0==this.display.length)this.display=
this.build_treenode();else if(this.root){var d=this.build_treenode();this.display.append(d);this.display=d}if(0==this.input.length&&(e=this.build_input(a))&&0<e.length)this.display.append(e),a+=c.colwidth;0==this.span.length&&(this.display.append(this.build_span(a)),a+=c.colwidth);0==this.link.length&&this.display.append(this.build_title(a));0==this.childlist.length&&this.display.append(this.build_children());if(c.onbuild)c.onbuild(this);this.searchItem=this.display.clone();b(".treeselect-expand",
this.searchItem).remove();a=b("div.treeselect-title",this.searchItem);0<a.length&&a.replaceWith(this.nodeLink);c.postbuild&&c.postbuild(this);"undefined"!==typeof this.exclude[this.id]&&0==b(".treenode-input",this.display).length&&this.display.hide();return this.display};d.prototype.getSelectAll=function(){return this.root&&this.selectAll?this.selectAllText:!1};d.prototype.setDefault=function(a,b){jQuery.isEmptyObject(a)?b&&b(this):this.loadAll(function(a){b&&b(a)},function(b){(a.hasOwnProperty(b.value)||
a.hasOwnProperty(b.id))&&b.check(!0)})};d.prototype.search=function(a,b){if(a){var g={};a=a.toLowerCase();c.searcher?c.searcher(this,a,function(a,c){var f=null,j;for(j in a)f=new d(c?c(a[j]):a[j]),f.nodeloaded=!0,l[f.id]=f.id,f.build(),g[j]=f;b(g,!0)}):this.loadAll(function(){b&&b(g,!0)},function(b){!b.root&&-1!==b.title.toLowerCase().search(a)&&(g[b.id]=b)},!0)}else b&&b(this.children,!1)};return b(this).each(function(){var a=b.extend(c,{display:b(this)}),a=this.treenode=new d(a,!0),e=a.getSelectAll();
!1!==e&&!a.showRoot&&(a.display.append(b(document.createElement("input")).attr({type:"checkbox"}).bind("click",function(a){return function(d){a.selectChildren(b(d.target).is(":checked"));c.selected&&c.selected(a,!0)}}(a))),e&&(e=b(document.createElement("span")).attr({"class":"treeselect-select-all"}).html(e),a.display.append(e)));var g=b(document.createElement("span")).addClass("treebusy");a.display.append(g);a.loadNode(function(a){g.remove();0==a.children.length&&a.display.hide();a.checked&&a.select(a.checked);
a.expand(!0);a.setDefault(c.default_value,function(a){c.treeloaded&&c.treeloaded(a)})});a.has_children||(this.parentElement.style.display="none")})}})(jQuery);
(function(b){b.fn.chosentree=function(c){c=b.extend({inputId:"chosentree-select",label:"",description:"",input_placeholder:"Select Item",input_type:"text",autosearch:!1,search_text:"Search",no_results_text:"No results found",min_height:100,more_text:"+%num% more",loaded:null,collapsed:!0,showtree:!1},c);return b(this).each(function(){var l=null,d=null,a=null,e=null,g=null,h=null,p=null,f=null,j=h=null,k=null,n=function(a){a&&(null==k||k.has_children)?j.addClass("treevisible").show("fast"):j.removeClass("treevisible").hide("fast")},
l=b(document.createElement("div"));l.addClass("chzntree-container");"search"==c.input_type?(l.addClass("chzntree-container-single"),a=b(document.createElement("div")),a.addClass("chzntree-search")):(l.addClass("chzntree-container-multi"),d=b(document.createElement("ul")),d.addClass("chzntree-choices chosentree-choices"),a=b(document.createElement("li")),a.addClass("search-field"));h=b(document.createElement("label"));h.attr({"for":c.inputId});h.text(c.label);f=b(document.createElement("div"));f.attr({"class":"description"});
f.text(c.description);if(c.input_placeholder){e=b(document.createElement("input"));e.attr({type:"text",placeholder:c.input_placeholder,autocomplete:"off"});!c.showtree&&c.collapsed&&e.focus(function(){n(!0)});if("search"==c.input_type){e.addClass("chosentree-search");var q=function(a){return!e.hasClass("searching")&&1!==a.length&&k?(e.addClass("searching"),k.search(a,function(a,b){e.removeClass("searching");var d=0;k.childlist.children().detach();b?k.childlist.addClass("chzntree-search-results"):
k.childlist.removeClass("chzntree-search-results");for(var f in a)d++,b?k.childlist.append(a[f].searchItem):k.childlist.append(a[f].display);d||k.childlist.append("<li>"+c.no_results_text+"</li>")}),!0):!1};if(c.autosearch){var s=0;e.bind("input",function t(){q(e.val())||(clearTimeout(s),s=setTimeout(t,1E3))});a.addClass("autosearch")}else g=b(document.createElement("input")),g.attr({type:"button",value:c.search_text}),g.addClass("chosentree-search-btn"),g.bind("click",function(a){a.preventDefault();
q(e.val())}),jQuery(document).bind("keydown",function(a){13==a.keyCode&&e.is(":focus")&&(a.preventDefault(),q(e.val()))}),a.addClass("manualsearch")}else e.addClass("chosentree-results");a.append(e);g&&a.append(g)}d?l.append(h).append(d.append(a)):l.append(h).append(a);j=b(document.createElement("div"));j.addClass("treewrapper");j.hide();p=b(document.createElement("span")).attr({"class":"tree-loading treebusy"}).css("display","block");h=b(document.createElement("div"));h.addClass("treeselect");b(this).keyup(function(a){27==
a.which&&n(!1)});j.append(h.append(p));b(this).append(l.append(j));b(this).append(f);var m=c,r=this;m.selected=function(f,j){var g=b("li#choice_"+f.id,d);if(f.id)if(f.checked&&0==g.length){g=b(document.createElement("li"));g.addClass("search-choice");g.attr("id","choice_"+f.id);g.eq(0)[0].nodeData=f;var l=b(document.createElement("span"));l.text(f.title);if(!f.root||f.showRoot&&f.has_children){var h=b(document.createElement("a"));h.addClass("search-choice-close");h.attr("href","javascript:void(0)");
h.bind("click",function(a){a.preventDefault();b("li#choice_"+f.id,d).remove();f.select(!1)})}a.before(g.append(l).append(h))}else f.checked||g.remove();if(j){var k=[];r.value={};d.show();e&&0==f.children.length&&e.attr({value:""});b("li.search-choice",d).each(function(){r.value[this.nodeData.id]=this.nodeData.value;k.push(this.nodeData)});jQuery.fn.moreorless&&(h=c.more_text.replace("%num%",k.length),d.moreorless(c.min_height,h),d.div_expanded||n(!0,null));m.loaded&&m.loaded(k);b(r).trigger("treeloaded")}};
m.treeloaded=function(){p.remove()};h.treeselect(m);k=h.eq(0)[0].treenode;(m.showtree||!m.collapsed)&&n(!0,null)})}})(jQuery);
