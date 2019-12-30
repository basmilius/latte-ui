(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dae99bc6"],{"27d8":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 mb-4"},[a("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),a("div",{staticClass:"row"},[t._t("default")],2)])},s=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},l=i,o=a("d802"),c=Object(o["a"])(l,n,s,!1,null,null,null);e["a"]=c.exports},3663:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-tab-container",{staticClass:"panel",staticStyle:{"z-index":"0"}},[a("latte-tab-bar"),t.properties?a("latte-tab",{attrs:{label:"Properties"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th"),a("th"),a("th")])]),a("tbody",[t._l(t.properties,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?a("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("strong",{staticClass:"text-monospace"},[t._v("NULL")]):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?a("latte-tab",{attrs:{label:"CSS-vars"}},[a("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("em",[t._v("NULL")]):"rgb"===e.type?a("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?a("latte-tab",{attrs:{label:"Events"}},[a("table",{staticClass:"table"},[t._l(t.events,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Signature")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?a("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rgb-display",style:t.styles},[a("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},l=[],o=(a("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),c=o,r=(a("a1c0"),a("d802")),p=Object(r["a"])(c,i,l,!1,null,"6ba614da",null),d=p.exports,u={name:"ApiExplorer",components:{RgbDisplay:d},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},m=u,b=Object(r["a"])(m,n,s,!1,null,null,null);e["a"]=b.exports},"36ad":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[a("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 py-3"},[a("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return a("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(a){return t.navigate(e.selector)}}},[a("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},s=[],i=(a("2d6d"),a("cfce"),a("28eb"),a("b506"),a("a287")),l={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var a=e.getBoundingClientRect();window.scrollTo({top:a.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return i["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,a){return Math.abs(e.rect.top-t)<Math.abs(a.rect.top-t)?e:a}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var a=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:a})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},o=l,c=a("d802"),r=Object(c["a"])(o,n,s,!1,null,null,null);e["a"]=r.exports},"425c":function(t,e,a){"use strict";a.r(e),e["default"]='<latte-bottom-nav is-shifting>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav is-shifting class="bottom-nav-primary preview:mt-3">\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav is-shifting class="bottom-nav-success preview:mt-3">\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n'},"4d79":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"component-app-bar"}},[a("PageHeader",{attrs:{title:"Bottom nav",tabs:t.tabs}}),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[a("div",{staticClass:"col-12 col-lg-6"},[a("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[a("div",{staticClass:"col-12"},[a("CodeExample",{attrs:{code:t.previews.standard,title:"Standard"}}),a("CodeExample",{attrs:{code:t.previews.shifting,title:"Shifting"}}),a("CodeExample",{attrs:{code:t.previews.side,title:"Side",classes:"d-flex flex-row justify-content-center"}})],1)]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[a("div",{staticClass:"col-12"},[a("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1)])],1)},s=[],i=(a("cfce"),a("0659"),a("2aa5"),a("62c8"),a("36ad")),l=a("27d8"),o=a("c8e6"),c=a("3663"),r={name:"BottomNav",components:{ApiExplorer:c["a"],CodeExample:o["a"],TitledRow:l["a"],PageHeader:i["a"]},data:function(){var t=window.getComputedStyle(document.body);return{api:{events:[{name:"input",description:"Invoked when the active item changes.",signature:"(index: number)"}],properties:[{name:"is-shifting",description:"Items should only show labels when they're active.",default:!1,type:"boolean"},{name:"is-side",description:"Bottom nav should actually be a side-nav.",default:!1,type:"boolean"},{name:"value",description:"Control the active item by index.",default:0,type:"number"}],variables:[{name:"--bottomNavAlpha",description:"Botton nav alpha.",type:"int",default:1},{name:"--bottomNavBackground",description:"Background color.",type:"rgb",default:t.getPropertyValue("--bottomNavBackground").split(",").map((function(t){return parseInt(t)}))},{name:"--bottomNavForeground",description:"Foreground color.",type:"rgb",default:t.getPropertyValue("--bottomNavForeground").split(",").map((function(t){return parseInt(t)}))},{name:"--bottomNavElevation",description:"Bottom nav elevation shadow.",type:"string",default:t.getPropertyValue("--bottomNavElevation")}]},previews:{standard:a("c164").default,shifting:a("425c").default,side:a("b276").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},p=r,d=a("d802"),u=Object(d["a"])(p,n,s,!1,null,null,null);e["default"]=u.exports},8701:function(t,e,a){},a1c0:function(t,e,a){"use strict";var n=a("8701"),s=a.n(n);s.a},b276:function(t,e,a){"use strict";a.r(e),e["default"]='<latte-bottom-nav is-side>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav is-side class="bottom-nav-primary preview:ml-5">\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav is-side class="bottom-nav-success preview:ml-5">\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>music-note</latte-icon><span>My music</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>radio-tower</latte-icon><span>Radio</span></latte-ripple>\n\t<latte-ripple as="a" class="btn btn-action"><latte-icon>shopping-music</latte-icon><span>Store</span></latte-ripple>\n</latte-bottom-nav>\n'},c164:function(t,e,a){"use strict";a.r(e),e["default"]='<latte-bottom-nav>\n\t<latte-ripple class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>music-note</latte-icon><span>My library</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav class="bottom-nav-primary preview:mt-3">\n\t<latte-ripple class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>music-note</latte-icon><span>My library</span></latte-ripple>\n</latte-bottom-nav>\n\n<latte-bottom-nav class="bottom-nav-success preview:mt-3">\n\t<latte-ripple class="btn btn-action"><latte-icon>home</latte-icon><span>Home</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>compass</latte-icon><span>Discover</span></latte-ripple>\n\t<latte-ripple class="btn btn-action"><latte-icon>music-note</latte-icon><span>My library</span></latte-ripple>\n</latte-bottom-nav>\n'},c8e6:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel overflow-hidden"},[a("div",{staticClass:"panel-header"},[a("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?a(t.preview,{tag:"component"}):t._e(),a("div",{staticClass:"panel-body"},[a("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},s=[],i=(a("d86f"),a("2aa5"),a("32f5"),a("b55a"),a("4f2b")),l=a("2d1a"),o={name:"CodeExample",components:{CodeSnippet:l["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,a=this.previewCode;return i["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(a,"</div>"),data:function(){return t}})}}},c=o,r=a("d802"),p=Object(r["a"])(c,n,s,!1,null,null,null);e["a"]=p.exports}}]);
//# sourceMappingURL=chunk-dae99bc6.8e6e09b2.js.map