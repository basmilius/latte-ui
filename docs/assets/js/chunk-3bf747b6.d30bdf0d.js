(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bf747b6"],{"0bef":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page",attrs:{id:"getting-started"}},[i("PageHeader",{attrs:{title:"Getting Started",tabs:t.tabs}}),i("TitledRow",{staticClass:"py-5",attrs:{title:"Introduction",id:"gs-introduction"}},[i("div",{staticClass:"col-12 col-lg-6"},[i("p",{staticClass:"lead"},[t._v("Hi")])])]),i("TitledRow",{staticClass:"py-5",attrs:{title:"Yarn & NPM",id:"gs-yarn-npm"}},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"panel"},[i("div",{staticClass:"panel-body"},[t._v(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, asperiores aut autem beatae blanditiis consectetur corporis dicta enim ipsam minima nam, nesciunt odio, officia optio porro provident repudiandae sit unde? ")])])])]),i("TitledRow",{staticClass:"py-5",attrs:{title:"Vue.js",id:"gs-vuejs"}},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"panel"},[i("div",{staticClass:"panel-body"},[t._v(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci architecto aspernatur aut corporis, dicta distinctio dolorem eaque eligendi esse inventore iusto magni maiores nisi possimus, quia ratione veritatis voluptates. ")])])])]),i("TitledRow",{staticClass:"py-5",attrs:{title:"CDN",id:"gs-cdn"}},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"panel"},[i("div",{staticClass:"panel-body"},[t._v(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam atque ea incidunt iure iusto nostrum possimus repellat veritatis. Beatae blanditiis consectetur, officia officiis pariatur recusandae repellendus sit ullam vero voluptatibus. ")])])])]),i("TitledRow",{staticClass:"py-5",attrs:{title:"CSS",id:"gs-css"}},[i("div",{staticClass:"col-12"},[i("div",{staticClass:"panel"},[i("div",{staticClass:"panel-body"},[t._v(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque cupiditate ex labore libero natus quia quo rerum! Consectetur laboriosam molestiae nam nihil non obcaecati odio porro quibusdam sequi veniam! ")])])])])],1)},a=[],n=i("36ad"),l=i("27d8"),r={name:"GettingStartedIndex",components:{TitledRow:l["a"],PageHeader:n["a"]},data:function(){return{tabs:[{label:"Introduction",selector:"#gs-introduction"},{label:"Yarn & NPM",selector:"#gs-yarn-npm"},{label:"Vue.js",selector:"#gs-vuejs"},{label:"CDN",selector:"#gs-cdn"},{label:"CSS",selector:"#gs-css"}]}}},o=r,c=i("d802"),u=Object(c["a"])(o,s,a,!1,null,null,null);e["default"]=u.exports},"27d8":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12 mb-4"},[i("h4",{staticClass:"font-weight-normal m-0"},[t._v(t._s(t.title))])])]),i("div",{staticClass:"row"},[t._t("default")],2)])},a=[],n={name:"TitledRow",props:{title:{default:"Title",type:String}}},l=n,r=i("d802"),o=Object(r["a"])(l,s,a,!1,null,null,null);e["a"]=o.exports},"36ad":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-header",class:{"is-sticky":t.tabsWithElement.length>0}},[i("div",{staticClass:"container pt-5",class:{"pb-5":0===t.tabsWithElement.length}},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-12 py-3"},[i("h1",{staticClass:"m-0 text-center text-lg-left"},[t._v(t._s(t.title))])])]),t.tabsWithElement.length>0?i("div",{staticClass:"row"},[i("div",{staticClass:"col-12"},[i("nav",{staticClass:"nav nav-tabs mt-3 justify-content-center justify-content-lg-start"},t._l(t.tabsWithElement,(function(e){return i("a",{staticClass:"nav-link",class:{"is-active":t.currentTab&&t.currentTab.selector===e.selector},on:{click:function(i){return t.navigate(e.selector)}}},[i("span",[t._v(t._s(e.label))])])})),0)])]):t._e()])])},a=[],n=(i("2d6d"),i("cfce"),i("28eb"),i("b506"),i("a287")),l={name:"PageHeader",props:{tabs:{default:function(){return[]},type:Array},title:{default:"Title",type:String}},created:function(){window.addEventListener("scroll",this.onScroll,{passive:!0})},data:function(){return{currentTab:null,tabsWithElement:[]}},destroyed:function(){window.addEventListener("scroll",this.onScroll)},methods:{navigate:function(t){var e=document.querySelector(t);if(e){var i=e.getBoundingClientRect();window.scrollTo({top:i.top+document.scrollingElement.scrollTop-100,behavior:"smooth"})}},onScroll:function(){if(0===this.tabsWithElement.length)return this.currentTab=null;var t=document.scrollingElement.scrollTop;this.currentTab=this.tabsWithElement.sort((function(t,e){return n["a"].operators.spaceship(t.rect.top,e.rect.top)})).filter((function(e){return e.rect.top<=t+window.innerHeight})).reduce((function(e,i){return Math.abs(e.rect.top-t)<Math.abs(i.rect.top-t)?e:i}))},updateTabs:function(){this.tabsWithElement=this.tabs.map((function(t){var e=document.querySelector(t.selector);if(e){var i=e.getBoundingClientRect();return Object.assign({},t,{elm:e,rect:i})}})).filter((function(t){return!!t}))}},watch:{tabs:{immediate:!0,handler:function(){var t=this;this.$nextTick((function(){t.updateTabs(),t.onScroll()}))}}}},r=l,o=i("d802"),c=Object(o["a"])(r,s,a,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-3bf747b6.d30bdf0d.js.map