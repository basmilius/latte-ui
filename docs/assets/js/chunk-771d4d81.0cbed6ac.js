(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-771d4d81"],{"1bb7":function(e,t,n){},"56ef":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page",attrs:{id:"components-swiper"}},[n("PageHeader",[n("h1",[e._v("Swiper")])]),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[n("CodeExample",{staticClass:"darker",attrs:{title:"Basic",url:"/snippets/components/swiper/basic.html"}})],1),n("div",{staticClass:"col-12 col-lg-3"},[n("TableOfContents")],1)])])],1)},s=[],i=n("c8e6"),l=n("36ad"),o=n("9f6c"),c={name:"Swiper",components:{CodeExample:i["a"],PageHeader:l["a"],TableOfContents:o["a"]}},r=c,p=n("2be6"),d=Object(p["a"])(r,a,s,!1,null,null,null);t["default"]=d.exports},"641f":function(e,t,n){},"73d1":function(e,t,n){"use strict";var a=n("641f"),s=n.n(a);s.a},"9f6c":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel mb-panel-gutter"},[n("nav",{staticClass:"nav nav-list"},[e._l(e.elements,function(t){return[t.isSeparator?n("div",{staticClass:"divider divider-horizontal"}):n("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===t.type},attrs:{as:"a"},on:{click:function(n){return e.goToElement(t.el)}}},[n("span",[e._v(e._s(t.title))])])]})],2)])},s=[],i=n("a287"),l={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var e=document.querySelector("div.page"),t=Array.prototype.slice.call(e.querySelectorAll("h2,h3,.docs-separator"));this.elements=t.map(function(e){return{el:e,title:e.textContent,type:e.tagName.toLowerCase(),isSeparator:e.classList.contains("docs-separator")}})},methods:{goToElement:function(e){var t=i["a"].util.dom.closest(e,"div.panel");null!==t&&(e=t);var n=e.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:n.top+document.scrollingElement.scrollTop-84})}}},o=l,c=(n("b313"),n("2be6")),r=Object(c["a"])(o,a,s,!1,null,"24566663",null);t["a"]=r.exports},b313:function(e,t,n){"use strict";var a=n("1bb7"),s=n.n(a);s.a},c8e6:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel code-example-panel",class:{"is-loading":e.isLoading}},[n("div",{staticClass:"panel-header"},[n("h2",{staticClass:"panel-title mb-0"},[e._v(e._s(e.title))]),n("div",{staticClass:"ml-auto"}),e._t("header")],2),e.$slots.default?n("div",{staticClass:"panel-body"},[e._t("default")],2):e._e(),n("div",{staticClass:"code-example-preview"},[null!==e.component?n(e.component,{tag:"component"}):e._e()],1),e.showCode?n("div",{staticClass:"code-example-code"},[e.code?n("CodeSnippet",{attrs:{lang:"html"}},[e._v(e._s(e.code))]):e._e()],1):e._e(),e._t("root"),n("span",{staticClass:"spinner spinner-primary"})],2)},s=[],i=(n("04f7"),n("ae66"),n("a287")),l=n("4f2b"),o=n("2d1a"),c={name:"CodeExample",components:{CodeSnippet:o["a"]},props:{previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var e=this;this.isLoading=!0,i["a"].api.request(this.url).then(function(e){return e.text()}).then(function(t){return e.onSnippetLoaded(t)}).catch(function(e){return i["a"].core.handleError(e)})},onSnippetLoaded:function(e){this.code=e.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),""),this.component=l["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(e,"</div>")}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},r=c,p=(n("73d1"),n("2be6")),d=Object(p["a"])(r,a,s,!1,null,null,null);t["a"]=d.exports}}]);
//# sourceMappingURL=chunk-771d4d81.0cbed6ac.js.map