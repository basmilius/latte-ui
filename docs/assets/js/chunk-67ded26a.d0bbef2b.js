(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67ded26a"],{"0f29":function(t,e,a){"use strict";a.r(e),e["default"]='<latte-expandable class="nav nav-list p-0">\n\t<template #header="{isOpen}">\n\t\t<button class="nav-link"><span>Toggle</span><latte-icon class="ml-auto" :name="isOpen ? \'chevron-up\' : \'chevron-down\'"></latte-icon></button>\n\t</template>\n\n\t<div class="p-3 bg-primary text-white">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam consequatur consequuntur, corporis debitis, et expedita fugiat fugit, harum ipsum magni molestiae nobis nostrum obcaecati perferendis porro ut vel voluptatem.\n\t</div>\n</latte-expandable>\n'},2062:function(t,e,a){"use strict";a.r(e),e["default"]='<latte-expandable class="nav nav-list p-0">\n\t<template #header>\n\t\t<button class="nav-link"><span>Toggle</span><latte-icon class="ml-auto">chevron-down</latte-icon></button>\n\t</template>\n\n\t<div class="p-3 bg-primary text-white">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam consequatur consequuntur, corporis debitis, et expedita fugiat fugit, harum ipsum magni molestiae nobis nostrum obcaecati perferendis porro ut vel voluptatem.\n\t</div>\n</latte-expandable>\n'},"27d8":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 mb-4"},[a("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),a("div",{staticClass:"row"},[t._t("default")],2)])},s=[],i={name:"TitledRow",props:{title:{default:"Title",type:String}}},l=i,o=a("d802"),r=Object(o["a"])(l,n,s,!1,null,null,null);e["a"]=r.exports},3663:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-tab-container",{staticClass:"panel overflow-auto text-left",staticStyle:{"z-index":"0"}},[a("latte-tab-bar",{staticStyle:{position:"sticky",left:"0"}}),t.properties?a("latte-tab",{attrs:{label:"Properties"}},[a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th"),a("th"),a("th")])]),a("tbody",[t._l(t.properties,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name)+" "),e.required?a("span",{staticClass:"badge badge-info",staticStyle:{"font-size":".6rem"}},[t._v("required")]):t._e()]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("strong",{staticClass:"text-monospace"},[t._v("NULL")]):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])])])])]}))],2)])]):t._e(),t.variables?a("latte-tab",{attrs:{label:"CSS-vars"}},[a("table",{staticClass:"table"},[t._l(t.variables,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Type")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.type))])])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Default")]),null===e.default?a("em",[t._v("NULL")]):"rgb"===e.type?a("RgbDisplay",{staticClass:"font-weight-bold text-monospace",attrs:{rgb:e.default}}):a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.default))])],1)])])]}))],2)]):t._e(),t.events?a("latte-tab",{attrs:{label:"Events"}},[a("table",{staticClass:"table"},[t._l(t.events,(function(e){return[a("tr",[a("td",{staticStyle:{"min-width":"300px"}},[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Name")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.name))]),e.description?a("span",{staticClass:"text-muted"},[t._v(t._s(e.description))]):t._e()])]),a("td",[a("div",{staticClass:"column-content justify-content-start"},[a("small",{staticClass:"text-muted"},[t._v("Signature")]),a("strong",{staticClass:"text-monospace"},[t._v(t._s(e.signature))])])])])]}))],2)]):t._e(),t.slots?a("latte-tab",{attrs:{label:"Slots"}},[t._v(" "+t._s(t.slots)+" ")]):t._e()],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rgb-display",style:t.styles},[a("span",[t._v(t._s(t.rgb[0])+", "+t._s(t.rgb[1])+", "+t._s(t.rgb[2]))])])},l=[],o=(a("d86f"),{name:"RgbDisplay",props:{rgb:{default:function(){return[0,0,0]},required:!0,type:Array}},computed:{styles:function(){return{"--color":"rgb(".concat(this.rgb[0],", ").concat(this.rgb[1],", ").concat(this.rgb[2],")")}}}}),r=o,c=(a("a1c0"),a("d802")),p=Object(c["a"])(r,i,l,!1,null,"6ba614da",null),u=p.exports,d={name:"ApiExplorer",components:{RgbDisplay:u},props:{events:{default:void 0,type:Array},properties:{default:void 0,type:Array},slots:{default:void 0,type:Array},variables:{default:void 0,type:Array}}},m=d,v=Object(c["a"])(m,n,s,!1,null,null,null);e["a"]=v.exports},"36ad":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[a("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 py-3"},[a("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return a("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(a){return t.navigate(e.selector)}}},[a("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},s=[],i=(a("2d6d"),a("cfce"),a("28eb"),a("b506"),a("a287")),l={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var a=e.getBoundingClientRect();window.scrollTo({top:a.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return i["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,a){return Math.abs(e.rect.top-t)<Math.abs(a.rect.top-t)?e:a}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var a=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:a})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},o=l,r=a("d802"),c=Object(r["a"])(o,n,s,!1,null,null,null);e["a"]=c.exports},5147:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"component-expandable"}},[a("PageHeader",{attrs:{title:"Expandable",tabs:t.tabs}}),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Introduction",id:"introduction"}},[a("div",{staticClass:"col-12 col-lg-6"},[a("p",{staticClass:"lead"},[t._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?")])])]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"Examples",id:"examples"}},[a("div",{staticClass:"col-12"},[a("CodeExample",{attrs:{code:t.previews.standard,title:"Standard",classes:"bg-panel"}}),a("CodeExample",{attrs:{code:t.previews.group,title:"Group",classes:"bg-panel"}}),a("CodeExample",{attrs:{code:t.previews.advanced,title:"With a custom header",classes:"bg-panel"}}),a("CodeExample",{attrs:{code:t.previews.nav,title:"Navigation",classes:"bg-panel"}})],1)]),a("TitledRow",{staticClass:"py-5 text-center text-lg-left",attrs:{title:"API",id:"api"}},[a("div",{staticClass:"col-12"},[a("ApiExplorer",t._b({},"ApiExplorer",t.api,!1))],1)])],1)},s=[],i=a("36ad"),l=a("27d8"),o=a("c8e6"),r=a("3663"),c={name:"Expandable",components:{ApiExplorer:r["a"],CodeExample:o["a"],TitledRow:l["a"],PageHeader:i["a"]},data:function(){return{api:{events:[{name:"close",description:"Invoked when the expandable is closed.",signature:"()"},{name:"open",description:"Invoked when the expandable is opened.",signature:"()"}],properties:[{name:"close-when-open",description:"The expandable should close when it's already open.",default:!0,type:"boolean"},{name:"group",description:"When you give the expandable a group, others are closed when one is opened.",default:null,type:"string, null"},{name:"opened",description:"The expandable should be open when mounted.",default:!1,type:"boolean"}]},previews:{standard:a("2062").default,advanced:a("0f29").default,group:a("944d").default,nav:a("cd77").default},tabs:[{label:"Introduction",selector:"#introduction"},{label:"Examples",selector:"#examples"},{label:"API",selector:"#api"}]}}},p=c,u=a("d802"),d=Object(u["a"])(p,n,s,!1,null,null,null);e["default"]=d.exports},8701:function(t,e,a){},"944d":function(t,e,a){"use strict";a.r(e),e["default"]='<latte-expandable group="example" opened class="nav nav-list p-0">\n\t<template #header>\n\t\t<button class="nav-link"><span>Toggle</span><latte-icon class="ml-auto">chevron-down</latte-icon></button>\n\t</template>\n\n\t<div class="p-3 bg-primary text-white">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam consequatur consequuntur, corporis debitis, et expedita fugiat fugit, harum ipsum magni molestiae nobis nostrum obcaecati perferendis porro ut vel voluptatem.\n\t</div>\n</latte-expandable>\n\n<latte-expandable group="example" class="nav nav-list p-0">\n\t<template #header>\n\t\t<button class="nav-link"><span>Toggle</span><latte-icon class="ml-auto">chevron-down</latte-icon></button>\n\t</template>\n\n\t<div class="p-3 bg-primary text-white">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam consequatur consequuntur, corporis debitis, et expedita fugiat fugit, harum ipsum magni molestiae nobis nostrum obcaecati perferendis porro ut vel voluptatem.\n\t</div>\n</latte-expandable>\n\n<latte-expandable group="example" class="nav nav-list p-0">\n\t<template #header>\n\t\t<button class="nav-link"><span>Toggle</span><latte-icon class="ml-auto">chevron-down</latte-icon></button>\n\t</template>\n\n\t<div class="p-3 bg-primary text-white">\n\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam consequatur consequuntur, corporis debitis, et expedita fugiat fugit, harum ipsum magni molestiae nobis nostrum obcaecati perferendis porro ut vel voluptatem.\n\t</div>\n</latte-expandable>\n'},a1c0:function(t,e,a){"use strict";var n=a("8701"),s=a.n(n);s.a},c8e6:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel overflow-hidden"},[a("div",{staticClass:"panel-header"},[a("span",{staticClass:"panel-title"},[t._v(t._s(t.title))])]),t.preview?a(t.preview,{tag:"component"}):t._e(),a("div",{staticClass:"panel-body"},[a("CodeSnippet",{attrs:{"code-string":t.cleanCode,lang:"html"}})],1)],1)},s=[],i=(a("d86f"),a("2aa5"),a("32f5"),a("b55a"),a("4f2b")),l=a("2d1a"),o={name:"CodeExample",components:{CodeSnippet:l["a"]},props:{bindings:{default:function(){return{}},type:Object},classes:{default:"",type:String},code:{required:!0,type:String},title:{required:!0,type:String}},computed:{cleanCode:function(){return this.code.trim().replace(/<[^>]*class="[^"]*\bpreview-code\b[^"]*"[^>]*><\/[^>]*>/gm,"").replace(/\s(preview:[^("\s)]*)/gm,"").replace(/\sclass=""/gm,"").replace(/(\r?\n){2,}/gm,"\n\n")},previewCode:function(){return this.code.trim().replace(/(preview:)/gm,"")},preview:function(){var t=this.bindings,e=this.classes,a=this.previewCode;return i["a"].extend({template:'<div class="panel-body bg-main '.concat(e,'">').concat(a,"</div>"),data:function(){return t}})}}},r=o,c=a("d802"),p=Object(c["a"])(r,n,s,!1,null,null,null);e["a"]=p.exports},cd77:function(t,e,a){"use strict";a.r(e),e["default"]='<nav class="nav nav-list">\n\t<a class="nav-link"><latte-icon>home</latte-icon><span>Home</span></a>\n\n\t<latte-expandable group="example-nav">\n\t\t<template #header="{isOpen}">\n\t\t\t<a class="nav-link">\n\t\t\t\t<latte-icon>view-grid</latte-icon>\n\t\t\t\t<span>Components</span>\n\t\t\t\t<latte-icon class="ml-auto" :name="isOpen ? \'chevron-up\' : \'chevron-down\'"></latte-icon>\n\t\t\t</a>\n\t\t</template>\n\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>App bar</span></a>\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Avatar</span></a>\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Badge</span></a>\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Bottom nav</span></a>\n\t</latte-expandable>\n\n\t<latte-expandable group="example-nav">\n\t\t<template #header="{isOpen}">\n\t\t\t<a class="nav-link">\n\t\t\t\t<latte-icon>eye</latte-icon>\n\t\t\t\t<span>Examples</span>\n\t\t\t\t<latte-icon class="ml-auto" :name="isOpen ? \'chevron-up\' : \'chevron-down\'"></latte-icon>\n\t\t\t</a>\n\t\t</template>\n\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Admin dashboard</span></a>\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Blog</span></a>\n\t\t<a class="nav-link"><latte-icon></latte-icon><span>Website</span></a>\n\t</latte-expandable>\n</nav>\n'}}]);
//# sourceMappingURL=chunk-67ded26a.d0bbef2b.js.map