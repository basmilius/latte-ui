(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e759fb"],{"44c1":function(t,e,a){},"5f1a":function(t,e,a){"use strict";var s=a("44c1"),n=a.n(s);n.a},6619:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page",attrs:{id:"getting-started"}},[a("PageHeader",[a("h1",[t._v("Getting started")])]),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[a("div",{staticClass:"panel"},[t._m(0),a("div",{staticClass:"panel-body"},[t._v("\n\t\t\t\t\t\t\tThe most recommended way to add latte-ui to your project is to install it using yarn or npm. Latte-ui\n\t\t\t\t\t\t\trecommends using yarn above npm.\n\t\t\t\t\t\t")]),a("div",{staticClass:"panel-body border-top-0 pt-0"},[a("CodeSnippet",{attrs:{lang:"shell"}},[t._v("\nyarn add @bybas/latte-ui\n\n--- or ---\n\nnpm i @bybas/latte-ui\n\t\t\t\t\t\t\t")])],1)]),a("div",{staticClass:"panel"},[t._m(1),t._m(2),a("div",{staticClass:"panel-body border-top-0 pt-0"},[a("CodeSnippet",{attrs:{lang:"html"}},[t._v('\n<link href="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.css" type="text/css"/>\n<script src="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.js" type="text/javascript"><\/script>\n\t\t\t\t\t\t\t')])],1)]),a("div",{staticClass:"panel"},[t._m(3),a("div",{staticClass:"panel-body"},[t._v("\n\t\t\t\t\t\t\tLatte-ui has several Vue components that you can use in your existing Vue project. Just add latte-ui as a\n\t\t\t\t\t\t\tVue plugin to get started!\n\t\t\t\t\t\t")]),a("div",{staticClass:"panel-body border-top-0 pt-0"},[a("CodeSnippet",{attrs:{lang:"js"}},[t._v('\n// Import LatteUI, ommit the next line if you\'re running in a browser.\nimport LatteUI from "@bybas/latte-ui";\n\n// Register LatteUI with Vue.\nVue.use(LatteUI);\n\n// Create your Vue instance.\nnew Vue({\n\tel: "#app"\n});\n\t\t\t\t\t\t\t')])],1)]),a("div",{staticClass:"panel"},[t._m(4),a("div",{staticClass:"panel-body"},[t._v("\n\t\t\t\t\t\t\tLatte-ui works best with Vue, but you can also just use latte-ui's CSS. Please note that a few features\n\t\t\t\t\t\t\trequire your own custom implementation to work.\n\t\t\t\t\t\t")]),a("div",{staticClass:"panel-body border-top-0 pt-0"},[a("CodeSnippet",{attrs:{lang:"html"}},[t._v('\n\t\t\t\t\t\t\t\t<link href="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.css" type="text/css"/>\n\t\t\t\t\t\t\t')])],1)])]),a("div",{staticClass:"col-12 col-lg-3"},[a("TableOfContents")],1)])])],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v("Install using Yarn or NPM")]),a("span",{staticClass:"badge badge-success ml-auto"},[t._v("Recommended")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v("Install using CDN")]),a("a",{staticClass:"btn btn-outline btn-primary ml-auto d-none d-lg-flex",attrs:{href:"/download/starter-template.html",download:"starter-template.html"}},[a("i",{staticClass:"mdi mdi-download"}),a("span",[t._v("Starter template")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-body"},[a("p",[t._v("\n\t\t\t\t\t\t\t\tYou can also add latte-ui to your project by using a CDN. Latte-ui is available on unpkg.com the popular\n\t\t\t\t\t\t\t\tfree to use CDN service that hosts almost every NPM package.\n\t\t\t\t\t\t\t")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v("Setup for Vue")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-header"},[a("h2",{staticClass:"panel-title mb-0"},[t._v("Only CSS")])])}],l=a("36ad"),i=a("9f6c"),o=a("2d1a"),r={name:"GettingStarted",components:{CodeSnippet:o["a"],PageHeader:l["a"],TableOfContents:i["a"]}},c=r,u=a("2be6"),p=Object(u["a"])(c,s,n,!1,null,null,null);e["default"]=p.exports},"9f6c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel mb-panel-gutter"},[a("nav",{staticClass:"nav nav-list"},[t._l(t.elements,function(e){return[e.isSeparator?a("div",{staticClass:"divider divider-horizontal"}):a("latte-ripple",{staticClass:"nav-link",class:{"pl-5":"h3"===e.type},attrs:{as:"a"},on:{click:function(a){return t.goToElement(e.el)}}},[a("span",[t._v(t._s(e.title))])])]})],2)])},n=[],l=a("a287"),i={name:"TableOfContents",data:function(){return{elements:[]}},mounted:function(){var t=document.querySelector("div.page"),e=Array.prototype.slice.call(t.querySelectorAll("h2,h3,.docs-separator"));this.elements=e.map(function(t){return{el:t,title:t.textContent,type:t.tagName.toLowerCase(),isSeparator:t.classList.contains("docs-separator")}})},methods:{goToElement:function(t){var e=l["a"].util.dom.closest(t,"div.panel");null!==e&&(t=e);var a=t.getBoundingClientRect();window.scrollTo({behavior:"smooth",top:a.top+document.scrollingElement.scrollTop-84})}}},o=i,r=(a("5f1a"),a("2be6")),c=Object(r["a"])(o,s,n,!1,null,"76e53672",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-01e759fb.48ab4497.js.map