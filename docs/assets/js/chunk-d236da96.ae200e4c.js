(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d236da96"],{"064d":function(t,e,a){},"1e14":function(t,e,a){},3663:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-tab-container",{staticClass:"panel"},[""!==t.title?a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title m-0"},[t._v(t._s(t.title))])]):t._e(),a("latte-tab-bar"),t.properties?a("latte-tab",{attrs:{label:"Properties"}},[a("table",{staticClass:"table"},[t._l(t.properties,function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?a("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default value")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]})],2)]):t._e(),t.variables?a("latte-tab",{attrs:{label:"CSS-vars"}},[a("table",{staticClass:"table"},[t._l(t.variables,function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default value")]),null===e.default?a("em",[t._v("NULL")]):"rgb"===e.type?a("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]})],2)]):t._e(),t.events?a("latte-tab",{attrs:{label:"Events"}},[a("table",{staticClass:"table"},[t._l(t.events,function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Signature")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]})],2)]):t._e(),t.slots?a("latte-tab",{attrs:{label:"Slots"}},[t._v("\n\t\t"+t._s(t.slots)+"\n\t")]):t._e()],1)},n=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rgb-display",style:t.styles},[a("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},i=[],r={name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}},o=r,p=(a("9f49"),a("2be6")),c=Object(p["a"])(o,l,i,!1,null,"0c42f358",null),d=c.exports,u={name:"ApiExplorer",components:{RgbDisplay:d},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array},title:{default:"API",type:String}}},m=u,v=Object(p["a"])(m,s,n,!1,null,null,null);e["a"]=v.exports},"5f1a":function(t,e,a){"use strict";var s=a("064d"),n=a.n(s);n.a},"73d1":function(t,e,a){"use strict";var s=a("8311"),n=a.n(s);n.a},8311:function(t,e,a){},"9f49":function(t,e,a){"use strict";var s=a("1e14"),n=a.n(s);n.a},"9f6c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel mb-panel-gutter"},[a("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(e){return[e.isSeparator?a("div",{staticClass:"divider divider-horizontal"}):a("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(a){return t.goToElement(e.el)}}},[a("span",[t._v(t._s(e.title))])])]})],2)])},n=[],l=a("a287"),i={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var e=l["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var a=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:a.top+document.scrollingElement.scrollTop-84})}}},r=i,o=(a("5f1a"),a("2be6")),p=Object(o["a"])(r,s,n,!1,null,"76e53672",null);e["a"]=p.exports},a536:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"components-app-bar"}},[a("PageHeader",[a("h1",[t._v("App bar")])]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[a("CodeExample",{staticClass:"darker",attrs:{title:"Basic",url:"/snippets/components/app-bar/basic.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Auto height",url:"/snippets/components/app-bar/auto-height.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Flat & transparent",url:"/snippets/components/app-bar/flat-transparent.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Action buttons",url:"/snippets/components/app-bar/action-buttons.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Search",url:"/snippets/components/app-bar/search.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Multiple rows",url:"/snippets/components/app-bar/rows.html"}}),a("CodeExample",{staticClass:"darker",attrs:{title:"Main app bar",url:"/snippets/components/app-bar/main.html"}},[t._v("\n\t\t\t\t\tTo make an app bar the primary one on your page, simply apply the "),a("code",[t._v("app-bar-main")]),t._v(" class to it. The app bar will\n\t\t\t\t\tbecome sticky and gets a higher z-index.\n\t\t\t\t")]),a("CodeExample",{staticClass:"darker",attrs:{title:"Panel",url:"/snippets/components/app-bar/panel.html"}}),a("div",{staticClass:"divider divider-horizontal docs-separator"}),a("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1),a("div",{staticClass:"col-12 col-lg-3"},[a("TableOfContents")],1)])])],1)},n=[],l=(a("4fb0"),a("3663")),i=a("c8e6"),r=a("36ad"),o=a("9f6c"),p={name:"AppBar",components:{ApiExplorer:l["a"],CodeExample:i["a"],PageHeader:r["a"],TableOfContents:o["a"]},data:function(){var t=window.getComputedStyle(document.body);return{api:{variables:[{name:"--app-bar-alpha",description:"App bar alpha.",type:"number",default:1},{name:"--app-bar-background",description:"Background color.",type:"rgb",default:t.getPropertyValue("--app-bar-background").split(",").map(function(t){return parseInt(t)})},{name:"--app-bar-foreground",description:"Foreground color.",type:"rgb",default:t.getPropertyValue("--app-bar-foreground").split(",").map(function(t){return parseInt(t)})},{name:"--app-bar-elevation",description:"Elevation shadow.",type:"string",default:t.getPropertyValue("--app-bar-elevation")},{name:"--app-bar-gutter",description:"Gutters",type:"string",default:t.getPropertyValue("--app-bar-gutter")},{name:"--app-bar-height",description:"App bar height",type:"string",default:t.getPropertyValue("--app-bar-height")}]}}}},c=p,d=a("2be6"),u=Object(d["a"])(c,s,n,!1,null,null,null);e["default"]=u.exports},c8e6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel code-example-panel",class:{"is-loading":t.isLoading}},[a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v(t._s(t.title))]),a("div",{staticClass:"ml-auto"}),t._t("header")],2),t.$slots.default?a("div",{staticClass:"panel-body"},[t._t("default")],2):t._e(),a("div",{staticClass:"code-example-preview"},[null!==t.component?a(t.component,{tag:"component"}):t._e()],1),t.showCode?a("div",{staticClass:"code-example-code"},[t.code?a("CodeSnippet",{attrs:{lang:"html"}},[t._v(t._s(t.code))]):t._e()],1):t._e(),t._t("root"),a("span",{staticClass:"spinner spinner-primary"})],2)},n=[],l=(a("04f7"),a("ae66"),a("a287")),i=a("4f2b"),r=a("2d1a"),o={name:"CodeExample",components:{CodeSnippet:r["a"]},props:{previewClasses:{default:"",type:String},showCode:{default:!0,type:Boolean},title:{default:"Example",type:String},url:{default:"Example",required:!0,type:String}},data:function(){return{code:null,component:null,isLoading:!0}},mounted:function(){this.loadSnippet()},methods:{loadSnippet:function(){var t=this;this.isLoading=!0,l["a"].api.request(this.url).then(function(t){return t.text()}).then(function(e){return t.onSnippetLoaded(e)}).catch(function(t){return l["a"].core.handleError(t)})},onSnippetLoaded:function(t){this.code=t.replace(new RegExp('\n<div class="ce-gutter"></div>\n',"g"),"").replace(new RegExp('\n<div class="ce-gutter-w"></div>\n',"g"),""),this.component=i["a"].extend({template:'<div class="'.concat(this.previewClasses,'">').concat(t,"</div>")}),this.isLoading=!1}},watch:{url:function(){this.loadSnippet()}}},p=o,c=(a("73d1"),a("2be6")),d=Object(c["a"])(p,s,n,!1,null,null,null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-d236da96.ae200e4c.js.map