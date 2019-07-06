(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6884ec08"],{"0cc5":function(t,a,e){},"2d9f":function(t,a,e){"use strict";var n=e("ca07"),s=e.n(n);s.a},"73d1":function(t,a,e){"use strict";var n=e("0cc5"),s=e.n(n);s.a},"86db":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page",attrs:{id:"component-snackbar"}},[e("PageHeader",[e("h1",[t._v("Snackbar")])]),e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[e("CodeExample",{staticClass:"darker",attrs:{"show-code":!1,title:"What is a Snackbar",url:"/snippets/components/snackbar/what.html"}}),e("div",{staticClass:"panel"},[t._m(0),e("div",{staticClass:"panel-body"},[e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.show}},[e("span",[t._v("Show")])]),e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.showWithAction}},[e("span",[t._v("Show with action")])]),e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.allLocations}},[e("span",[t._v("All locations")])])]),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/snackbar/api.snippet"}})],1)])],1),e("div",{staticClass:"col-12 col-lg-3"},[e("TableOfContents")],1)])])],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title"},[t._v("JavaScript API")])])}],i=(e("df26"),e("c8ff")),o=(e("2e73"),e("c8e6")),c=e("2d1a"),l=e("36ad"),r=e("9f6c"),d=e("a287"),u={name:"Snackbar",components:{CodeExample:o["a"],CodeSnippet:c["a"],PageHeader:l["a"],TableOfContents:r["a"]},methods:{allLocations:function(){var t=[d["a"].ui.snackbar.Locations.BOTTOM_LEFT,d["a"].ui.snackbar.Locations.BOTTOM,d["a"].ui.snackbar.Locations.BOTTOM_RIGHT,d["a"].ui.snackbar.Locations.TOP_LEFT,d["a"].ui.snackbar.Locations.TOP,d["a"].ui.snackbar.Locations.TOP_RIGHT];t.forEach(function(t){d["a"].ui.snackbar.create({duration:300,location:t,message:"Hey! I'm a snackbar!"})})},show:function(){d["a"].ui.snackbar.create({message:"Hello world!"})},showWithAction:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d["a"].ui.snackbar.create({action:{color:"success",label:"Undo"},message:"Folder has been removed."});case 2:a=t.sent,d["a"].ui.message.alert("Snackbar result",a?"You pressed Undo":"You did nothing!");case 4:case"end":return t.stop()}},t)}));function a(){return t.apply(this,arguments)}return a}()}},p=u,m=e("d802"),v=Object(m["a"])(p,n,s,!1,null,null,null);a["default"]=v.exports},"9f6c":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel"},[e("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(a){return[a.isSeparator?e("div",{staticClass:"divider divider-horizontal"}):e("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===a.type},attrs:{as:"a"},on:{click:function(e){return t.goToElement(a.el)}}},[e("span",[t._v(t._s(a.title))])])]})],2)])},s=[],i=e("a287"),o={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),a=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=a.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var a=i["a"].util.dom.closest(t,"div.panel");null!==a&&(t=a);var e=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:e.top+document.scrollingElement.scrollTop-84})}}},c=o,l=(e("2d9f"),e("d802")),r=Object(l["a"])(c,n,s,!1,null,"32381d47",null);a["a"]=r.exports},c8e6:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),e("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?e("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),e("div",{staticClass:"code-example-preview"},[null!==t.component?e(t.component,{tag:"component"}):t._e()],1),t.showCode?e("div",{staticClass:"code-example-code"},[t.code?e("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),e("span",{staticClass:"spinner spinner-primary"})])},s=[],i=(e("04f7"),e("ae66"),e("4f2b")),o=e("2d1a"),c=e("a287"),l={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{showCode:{default:!0,required:!1,type:Boolean},title:{default:"Example",required:!1,type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,c["a"].api.request(this.url).then(function(t){return t.text()}).then(function(a){return t.onSnippetLoaded(a)}).catch(function(t){return c["a"].core.handleError(t)})},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),""),this.component=i["a"].extend({template:"<div>".concat(t,"</div>")}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},r=l,d=(e("73d1"),e("d802")),u=Object(d["a"])(r,n,s,!1,null,null,null);a["a"]=u.exports},ca07:function(t,a,e){}}]);
//# sourceMappingURL=chunk-6884ec08.3857f93c.js.map