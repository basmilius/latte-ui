(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d557a22"],{"9c15":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",{staticClass:"scaffolding sheet-below-app-bar"},[a("latte-sheet",{ref:"drawer",staticClass:"drawer-container",attrs:{"touch-enabled":t.isDrawerTouchEnabled}},[a("DrawerMenu",{on:{click:function(e){return t.$refs.drawer.close()}}})],1),a("MainMenu",{on:{"toggle-drawer":function(e){return t.$refs.drawer.toggle()}}}),a("div",{staticClass:"content p-0"},[a("RouterView"),a("Footer")],1)],1)},s=[],r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("latte-focus-zone",{attrs:{"is-vertical":""}},[a("nav",{staticClass:"nav nav-list py-4"},[a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:"/"===t.$route.path},scopedSlots:t._u([{key:"header",fn:function(){return[a("DrawerMenuItem",{attrs:{to:"/"}},[a("span",[t._v("Home")])])]},proxy:!0}])}),a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:t.$route.path.startsWith("/getting-started")},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.isOpen;return[a("DrawerMenuItem",{attrs:{to:"/getting-started"}},[a("span",[t._v("Getting Started")]),a("latte-icon",{staticClass:"ml-auto"},[t._v(t._s(n?"chevron-down":"chevron-right"))])],1)]}}])},[[a("DrawerMenuItem",{attrs:{to:"/getting-started/about"}},[a("span",[t._v("About Latte UI")])]),a("DrawerMenuItem",{attrs:{to:"/getting-started/roadmap"}},[a("span",[t._v("Roadmap")])]),a("DrawerMenuItem",{attrs:{to:"/getting-started/news-and-updates"}},[a("span",[t._v("News & Updates")])])]],2),a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:t.$route.path.startsWith("/layout")},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.isOpen;return[a("DrawerMenuItem",{attrs:{to:"/layout"}},[a("span",[t._v("Layout")]),a("latte-icon",{staticClass:"ml-auto"},[t._v(t._s(n?"chevron-down":"chevron-right"))])],1)]}}])},[[a("DrawerMenuItem",{attrs:{to:"/layout/color"}},[a("span",[t._v("Color")])]),a("DrawerMenuItem",{attrs:{to:"/layout/grid"}},[a("span",[t._v("Grid")])]),a("DrawerMenuItem",{attrs:{to:"/layout/icons"}},[a("span",[t._v("Icons")])]),a("DrawerMenuItem",{attrs:{to:"/layout/scaffolding"}},[a("span",[t._v("Scaffolding")])]),a("DrawerMenuItem",{attrs:{to:"/layout/spacing"}},[a("span",[t._v("Spacing")])]),a("DrawerMenuItem",{attrs:{to:"/layout/typography"}},[a("span",[t._v("Typography")])]),a("DrawerMenuItem",{attrs:{to:"/layout/themes"}},[a("span",[t._v("Themes")])]),a("DrawerMenuItem",{attrs:{to:"/layout/utilities"}},[a("span",[t._v("Utilities")])])]],2),a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:t.$route.path.startsWith("/components")},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.isOpen;return[a("DrawerMenuItem",{attrs:{to:"/components"}},[a("span",[t._v("Components")]),a("latte-icon",{staticClass:"ml-auto"},[t._v(t._s(n?"chevron-down":"chevron-right"))])],1)]}}])},[[a("DrawerMenuItem",{attrs:{to:"/components/app-bar"}},[a("span",[t._v("App Bar")])]),a("DrawerMenuItem",{attrs:{to:"/components/avatar"}},[a("span",[t._v("Avatar")])]),a("DrawerMenuItem",{attrs:{to:"/components/badge"}},[a("span",[t._v("Badge")])]),a("DrawerMenuItem",{attrs:{to:"/components/bottom-nav"}},[a("span",[t._v("Bottom Nav")])]),a("DrawerMenuItem",{attrs:{to:"/components/button"}},[a("span",[t._v("Button")])]),a("DrawerMenuItem",{attrs:{to:"/components/chat"}},[a("span",[t._v("Chat")])]),a("DrawerMenuItem",{attrs:{to:"/components/datatable"}},[a("span",[t._v("Datatable")])]),a("DrawerMenuItem",{attrs:{to:"/components/expandable"}},[a("span",[t._v("Expandable")])]),a("DrawerMenuItem",{attrs:{to:"/components/form-elements"}},[a("span",[t._v("Form elements")])]),a("DrawerMenuItem",{attrs:{to:"/components/list"}},[a("span",[t._v("List")])]),a("DrawerMenuItem",{attrs:{to:"/components/nav"}},[a("span",[t._v("Nav")])]),a("DrawerMenuItem",{attrs:{to:"/components/notice"}},[a("span",[t._v("Notice")])]),a("DrawerMenuItem",{attrs:{to:"/components/overlay"}},[a("span",[t._v("Overlay")])]),a("DrawerMenuItem",{attrs:{to:"/components/pagination"}},[a("span",[t._v("Pagination")])]),a("DrawerMenuItem",{attrs:{to:"/components/panel"}},[a("span",[t._v("Panel")])]),a("DrawerMenuItem",{attrs:{to:"/components/popup"}},[a("span",[t._v("Popup")])]),a("DrawerMenuItem",{attrs:{to:"/components/portal"}},[a("span",[t._v("Portal")])]),a("DrawerMenuItem",{attrs:{to:"/components/progress"}},[a("span",[t._v("Progress")])]),a("DrawerMenuItem",{attrs:{to:"/components/ripple"}},[a("span",[t._v("Ripple")])]),a("DrawerMenuItem",{attrs:{to:"/components/sheet"}},[a("span",[t._v("Sheet")])]),a("DrawerMenuItem",{attrs:{to:"/components/spinner"}},[a("span",[t._v("Spinner")])]),a("DrawerMenuItem",{attrs:{to:"/components/tabs"}},[a("span",[t._v("Tabs")])]),a("DrawerMenuItem",{attrs:{to:"/components/window"}},[a("span",[t._v("Window")])])]],2),a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:t.$route.path.startsWith("/javascript-api")},scopedSlots:t._u([{key:"header",fn:function(e){var n=e.isOpen;return[a("DrawerMenuItem",{attrs:{to:"/javascript-api"}},[a("span",[t._v("JavaScript API")]),a("latte-icon",{staticClass:"ml-auto"},[t._v(t._s(n?"chevron-down":"chevron-right"))])],1)]}}])},[[a("DrawerMenuItem",{attrs:{to:"/javascript-api/actions"}},[a("span",[t._v("Actions")])]),a("DrawerMenuItem",{attrs:{to:"/javascript-api/message"}},[a("span",[t._v("Message")])]),a("DrawerMenuItem",{attrs:{to:"/javascript-api/notification"}},[a("span",[t._v("Notification")])]),a("DrawerMenuItem",{attrs:{to:"/javascript-api/question"}},[a("span",[t._v("Question")])]),a("DrawerMenuItem",{attrs:{to:"/javascript-api/snackbar"}},[a("span",[t._v("Snackbar")])])]],2),a("latte-expandable",{attrs:{"close-when-open":!1,group:"main",opened:"/tests"===t.$route.path},scopedSlots:t._u([{key:"header",fn:function(){return[a("DrawerMenuItem",{attrs:{to:"/tests"}},[a("span",[t._v("Tests")])])]},proxy:!0}])})],1)])},o=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"divider divider-horizontal"})},l=[],c={name:"DrawerMenuDivider"},p=c,u=a("d802"),v=Object(u["a"])(p,i,l,!1,null,null,null),m=v.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("router-link",{attrs:{to:t.to},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,s=e.isExactActive,r=e.navigate;return[a("latte-ripple",{staticClass:"nav-link",class:{"is-active":s},attrs:{as:"a",href:n,tabindex:s?0:-1},on:{click:r}},[t._t("default")],2)]}}],null,!0)})},_=[],w={name:"DrawerMenuItem",props:{to:{default:"/",type:String}}},g=w,h=Object(u["a"])(g,d,_,!1,null,null,null),b=h.exports,f={name:"DrawerMenu",components:{DrawerMenuDivider:m,DrawerMenuItem:b}},D=f,M=Object(u["a"])(D,r,o,!1,null,null,null),I=M.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"footer bg-panel py-5"},[a("div",{staticClass:"content"},[a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-12 col-lg-2 d-none d-lg-block"}),a("div",{staticClass:"col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left"},[a("strong",[t._v("Develop")]),a("nav",{staticClass:"nav nav-links mt-3 align-items-center align-items-lg-start"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/docs"}},[t._v("Documentation")]),a("a",{staticClass:"nav-link",attrs:{href:"//github.com/basmilius/latte-ui/issues#bug",target:"_blank"}},[t._v("Report a bug")]),a("a",{staticClass:"nav-link",attrs:{href:"//github.com/basmilius/latte-ui/issues#feature",target:"_blank"}},[t._v("Request a feature")])],1)]),a("div",{staticClass:"col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left"},[a("strong",[t._v("Packages (Coming soon)")]),a("nav",{staticClass:"nav nav-links mt-3 align-items-center align-items-lg-start"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/packages/blocks"}},[t._v("Blocks")]),a("router-link",{staticClass:"nav-link",attrs:{to:"/packages/layouts"}},[t._v("Layouts")])],1)])])])])])},C=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 col-lg-4 text-center text-lg-left"},[n("img",{staticClass:"mx-auto mx-lg-0 mb-3",attrs:{src:a("de39"),alt:"Bas' logo",height:"54"}}),n("p",[n("strong",[t._v("By Bas")])]),n("p",[t._v(" Designed and developed with "),n("img",{staticClass:"emoji",attrs:{src:"https://g.s3.bmcdn.nl/assets/joypixels/v5/svg/2764.svg",alt:"Heart"}}),t._v(" by "),n("a",{attrs:{href:"https://bas.dev",target:"_blank",rel:"noopener"}},[t._v("Bas Milius")]),t._v(" and other contributors. ")])])}],y={name:"Footer"},x=y,S=Object(u["a"])(x,k,C,!1,null,null,null),$=S.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-bar app-bar-main app-bar-primary",attrs:{role:"toolbar"}},[a("div",{staticClass:"app-bar-row"},[a("button",{staticClass:"btn btn-icon btn-text ml-lg-2 mr-lg-1 d-block d-lg-none",attrs:{"aria-label":"Toggle drawer"},on:{click:function(e){return t.$emit("toggle-drawer")}}},[a("latte-icon",[t._v("menu")])],1),a("span",{staticClass:"app-bar-title"},[t._v("Latte UI")]),a("div",{staticClass:"mx-auto"}),a("div",{staticClass:"d-flex align-items-center"},[a("span",{staticClass:"badge mx-2"},[t._v("v"+t._s(t.latteVersion))]),a("div",{staticClass:"divider divider-vertical"}),a("button",{ref:"dotsMenu",staticClass:"btn btn-icon btn-text",attrs:{"aria-label":"More..."}},[a("latte-icon",[t._v("dots-vertical")])],1),a("latte-popup",{attrs:{"associate-with":t.$refs.dotsMenu,"margin-x":-9}},[a("latte-focus-zone",{attrs:{"is-cycle":"","is-vertical":""}},[a("nav",{staticClass:"nav nav-list"},[a("latte-ripple",{staticClass:"nav-link",attrs:{tabindex:"0",as:"a",href:"//github.com/basmilius/latte-ui/releases",target:"_blank"}},[a("latte-icon",[t._v("download")]),a("span",[t._v("Download")])],1),a("latte-ripple",{staticClass:"nav-link",attrs:{tabindex:"-1",as:"a",href:"//github.com/basmilius/latte-ui",target:"_blank"}},[a("latte-icon",[t._v("github-circle")]),a("span",[t._v("Get Source")])],1),t._l([1,2,3,4,5,6,7],(function(e){return a("latte-ripple",{key:e,staticClass:"nav-link",attrs:{tabindex:"-1",as:"a",href:"#"}},[a("latte-icon",[t._v("dice-3")]),a("span",[t._v("A fancy menu item "+t._s(e))])],1)}))],2)])],1)],1)])])},E=[],O=a("a287"),W={refs:["dotsMenu"],computed:{latteVersion:function(){return O["a"].version}}},z=W,B=Object(u["a"])(z,j,E,!1,null,null,null),R=B.exports,T={name:"Skeleton",components:{DrawerMenu:I,Footer:$,MainMenu:R},data:function(){return{isDrawerTouchEnabled:!0}},destroyed:function(){window.removeEventListener("resize",this.onWindowResize)},mounted:function(){window.addEventListener("resize",this.onWindowResize,{passive:!0}),this.onWindowResize()},methods:{onWindowResize:function(){this.isDrawerTouchEnabled=window.innerWidth<=991}}},A=T,L=Object(u["a"])(A,n,s,!1,null,null,null);e["default"]=L.exports},de39:function(t,e,a){t.exports=a.p+"assets/img/bas.bf57d4d6.svg"}}]);
//# sourceMappingURL=chunk-4d557a22.b17121ce.js.map