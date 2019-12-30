(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b491d51"],{"1e7b":function(t,e,a){"use strict";a.r(e),e["default"]='<span class="badge badge-primary">Badge</span>\n<span class="badge badge-error preview:ml-2">Badge</span>\n<span class="badge badge-info preview:ml-2">Badge</span>\n<span class="badge badge-success preview:ml-2">Badge</span>\n<span class="badge badge-warning preview:ml-2">Badge</span>\n'},"27d8":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 mb-4"},[a("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),a("div",{staticClass:"row"},[t._t("default")],2)])},n=[],l={name:"TitledRow",props:{title:{default:"Title",type:String}}},i=l,r=a("d802"),c=Object(r["a"])(i,s,n,!1,null,null,null);e["a"]=c.exports},3663:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-tab-container",{staticClass:"panel",staticStyle:{"z-index":"0"}},[a("latte-tab-bar"),t.properties?a("latte-tab",{attrs:{label:"Properties"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th"),a("th"),a("th")])]),a("tbody",[t._l(t.properties,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?a("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("strong",{staticClass:"text-monospace"},[t._v("NULL")]):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?a("latte-tab",{attrs:{label:"CSS-vars"}},[a("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("em",[t._v("NULL")]):"rgb"===e.type?a("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?a("latte-tab",{attrs:{label:"Events"}},[a("table",{staticClass:"table"},[t._l(t.events,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Signature")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?a("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},n=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rgb-display",style:t.styles},[a("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},i=[],r=(a("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),c=r,o=(a("a1c0"),a("d802")),d=Object(o["a"])(c,l,i,!1,null,"6ba614da",null),p=d.exports,u={name:"ApiExplorer",components:{RgbDisplay:p},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},b=u,g=Object(o["a"])(b,s,n,!1,null,null,null);e["a"]=g.exports},"36ad":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[a("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 py-3"},[a("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return a("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(a){return t.navigate(e.selector)}}},[a("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},n=[],l=(a("2d6d"),a("cfce"),a("28eb"),a("b506"),a("a287")),i={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var a=e.getBoundingClientRect();window.scrollTo({top:a.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return l["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,a){return Math.abs(e.rect.top-t)<Math.abs(a.rect.top-t)?e:a}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var a=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:a})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},r=i,c=a("d802"),o=Object(c["a"])(r,s,n,!1,null,null,null);e["a"]=o.exports},"6ceb":function(t,e,a){"use strict";a.r(e),e["default"]='<span class="badge badge-primary">Badge<button class="btn"><latte-icon>close</latte-icon></button></span>\n<span class="badge badge-error preview:ml-2">Badge<button class="btn"><latte-icon>close</latte-icon></button></span>\n<span class="badge badge-info preview:ml-2">Badge<button class="btn"><latte-icon>close</latte-icon></button></span>\n<span class="badge badge-success preview:ml-2">Badge<button class="btn"><latte-icon>close</latte-icon></button></span>\n<span class="badge badge-warning preview:ml-2">Badge<button class="btn"><latte-icon>close</latte-icon></button></span>\n'},8701:function(t,e,a){},a1c0:function(t,e,a){"use strict";var s=a("8701"),n=a.n(s);n.a},b9ee:function(t,e,a){"use strict";a.r(e),e["default"]='<span class="badge badge-primary"><span class="spinner"></span>Badge</span>\n<span class="badge badge-error preview:ml-2"><span class="spinner"></span>Badge</span>\n<span class="badge badge-info preview:ml-2"><span class="spinner"></span>Badge</span>\n<span class="badge badge-success preview:ml-2"><span class="spinner"></span>Badge</span>\n<span class="badge badge-warning preview:ml-2"><span class="spinner"></span>Badge</span>\n'},c8e6:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel overflow-hidden"},[a("div",{staticClass:"panel-header"},[a("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?a(t.preview,{tag:"component"}):t._e(),a("div",{staticClass:"panel-body"},[a("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},n=[],l=(a("d86f"),a("2aa5"),a("32f5"),a("b55a"),a("4f2b")),i=a("2d1a"),r={name:"CodeExample",components:{CodeSnippet:i["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,a=this.previewCode;return l["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(a,"</div>"),data:function(){return t}})}}},c=r,o=a("d802"),d=Object(o["a"])(c,s,n,!1,null,null,null);e["a"]=d.exports},e5bd:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"component-app-bar"}},[a("PageHeader",{attrs:{title:"Badge",tabs:t.tabs}}),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[a("div",{staticClass:"col-12 col-lg-6"},[a("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[a("div",{staticClass:"col-12"},[a("CodeExample",{attrs:{code:t.previews.standard,title:"Standard",classes:"bg-panel d-flex justify-content-center"}}),a("CodeExample",{attrs:{code:t.previews.clickable,title:"Clickable",classes:"bg-panel d-flex justify-content-center"}}),a("CodeExample",{attrs:{code:t.previews.closable,title:"Closable",classes:"bg-panel d-flex justify-content-center"}}),a("CodeExample",{attrs:{code:t.previews.spinner,title:"With a spinner",classes:"bg-panel d-flex justify-content-center"}})],1)]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[a("div",{staticClass:"col-12"},[a("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1)])],1)},n=[],l=(a("cfce"),a("0659"),a("2aa5"),a("62c8"),a("36ad")),i=a("27d8"),r=a("c8e6"),c=a("3663"),o={name:"Badge",components:{ApiExplorer:c["a"],CodeExample:r["a"],TitledRow:i["a"],PageHeader:l["a"]},data:function(){var t=window.getComputedStyle(document.body);return{api:{variables:[{name:"--badgeColor",description:"Sets the badge color.",type:"rgb",default:t.getPropertyValue("--badgeColor").split(",").map((function(t){return parseInt(t)}))}]},previews:{standard:a("1e7b").default,clickable:a("fc56").default,closable:a("6ceb").default,spinner:a("b9ee").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},d=o,p=a("d802"),u=Object(p["a"])(d,s,n,!1,null,null,null);e["default"]=u.exports},fc56:function(t,e,a){"use strict";a.r(e),e["default"]='<a class="badge badge-primary">Badge</a>\n<a class="badge badge-error preview:ml-2">Badge</a>\n<a class="badge badge-info preview:ml-2">Badge</a>\n<a class="badge badge-success preview:ml-2">Badge</a>\n<a class="badge badge-warning preview:ml-2">Badge</a>\n'}}]);
//# sourceMappingURL=chunk-0b491d51.4dd288fa.js.map