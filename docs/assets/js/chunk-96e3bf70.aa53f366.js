(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-96e3bf70"],{"07aa":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel"},[n("div",{staticClass:"panel-header"},[n("h2",{staticClass:"panel-title m-0"},[t._v(t._s(t.title))])]),n("table",{staticClass:"table"},[t._m(0),n("tbody",{staticClass:"text-monospace",staticStyle:{"font-size":".8rem"}},[t._l(t.vars,function(e){return[n("tr",[n("td",[n("div",{staticClass:"column-content"},[t._v(t._s(e.name))])]),n("td",[n("div",{staticClass:"column-content"},["int"===e.type||"string"===e.type?[t._v("\n\t\t\t\t\t\t\t"+t._s(e.default)+"\n\t\t\t\t\t\t")]:"rgb"===e.type?[n("RgbDisplay",{attrs:{rgb:e.default}})]:"none"===e.type?[n("i",[t._v("None")])]:t._e()],2)])])]})],2)])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",{staticStyle:{width:"270px"}},[n("div",{staticClass:"column-content"},[n("strong",[t._v("Property")])])]),n("th",[n("div",{staticClass:"column-content"},[n("strong",[t._v("Default value")])])])])])}],i=n("fbe3"),l={name:"Variables",components:{RgbDisplay:i["a"]},props:{title:{default:"Properties",required:!1,type:String},vars:{default:[],required:!0,type:Array}}},o=l,r=(n("91c9"),n("d802")),c=Object(r["a"])(o,a,s,!1,null,"05f9a7e4",null);e["a"]=c.exports},"0cc5":function(t,e,n){},"2d9f":function(t,e,n){"use strict";var a=n("ca07"),s=n.n(a);s.a},"2fb1":function(t,e,n){"use strict";var a=n("3db8"),s=n.n(a);s.a},"3db8":function(t,e,n){},5533:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page",attrs:{id:"components-notice"}},[n("PageHeader",[n("h1",[t._v("Notice")])]),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[n("CodeExample",{attrs:{title:"All notices",url:"/snippets/components/notice/all.html"}}),n("CodeExample",{attrs:{title:"With icon",url:"/snippets/components/notice/icon.html"}}),n("CodeExample",{attrs:{title:"With button",url:"/snippets/components/notice/button.html"}}),n("CodeExample",{staticClass:"darker",attrs:{title:"Inside a panel",url:"/snippets/components/notice/panel.html"}}),n("div",{staticClass:"divider divider-horizontal docs-separator"}),n("Variables",{attrs:{vars:t.noticeVars}})],1),n("div",{staticClass:"col-12 col-lg-3"},[n("TableOfContents")],1)])])],1)},s=[],i=n("c8e6"),l=n("36ad"),o=n("9f6c"),r=n("07aa"),c={name:"Notice",components:{CodeExample:i["a"],PageHeader:l["a"],TableOfContents:o["a"],Variables:r["a"]},data:function(){return{noticeVars:[{name:"--notice-background",type:"none"},{name:"--notice-foreground",type:"none"}]}}},d=c,u=n("d802"),p=Object(u["a"])(d,a,s,!1,null,null,null);e["default"]=p.exports},"73d1":function(t,e,n){"use strict";var a=n("0cc5"),s=n.n(a);s.a},"91c9":function(t,e,n){"use strict";var a=n("d586"),s=n.n(a);s.a},"9f6c":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel"},[n("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(e){return[e.isSeparator?n("div",{staticClass:"divider divider-horizontal"}):n("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(n){return t.goToElement(e.el)}}},[n("span",[t._v(t._s(e.title))])])]})],2)])},s=[],i=n("a287"),l={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var e=i["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var n=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:n.top+document.scrollingElement.scrollTop-84})}}},o=l,r=(n("2d9f"),n("d802")),c=Object(r["a"])(o,a,s,!1,null,"32381d47",null);e["a"]=c.exports},c8e6:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[n("div",{staticClass:"panel-header"},[n("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),n("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?n("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),n("div",{staticClass:"code-example-preview"},[null!==t.component?n(t.component,{tag:"component"}):t._e()],1),t.showCode?n("div",{staticClass:"code-example-code"},[t.code?n("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),n("span",{staticClass:"spinner spinner-primary"})])},s=[],i=(n("04f7"),n("ae66"),n("4f2b")),l=n("2d1a"),o=n("a287"),r={name:"CodeExample",components:{CodeSnippet:l["a"]},props:{showCode:{default:!0,required:!1,type:Boolean},title:{default:"Example",required:!1,type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,o["a"].api.request(this.url).then(function(t){return t.text()}).then(function(e){return t.onSnippetLoaded(e)}).catch(function(t){return o["a"].core.handleError(t)})},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),""),this.component=i["a"].extend({template:"<div>".concat(t,"</div>")}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},c=r,d=(n("73d1"),n("d802")),u=Object(d["a"])(c,a,s,!1,null,null,null);e["a"]=u.exports},ca07:function(t,e,n){},d586:function(t,e,n){},fbe3:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"rgb-display",style:t.styles},[n("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},s=[],i={name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!1,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}},l=i,o=(n("2fb1"),n("d802")),r=Object(o["a"])(l,a,s,!1,null,"52277d38",null);e["a"]=r.exports}}]);
//# sourceMappingURL=chunk-96e3bf70.aa53f366.js.map