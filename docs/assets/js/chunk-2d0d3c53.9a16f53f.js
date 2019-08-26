(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d3c53"],{"5dd2":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page",attrs:{id:"components-notification"}},[e("PageHeader",[e("h1",[t._v("Notification")])]),e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[e("CodeExample",{staticClass:"darker",attrs:{"show-code":!1,title:"What is a Notification",url:"/snippets/components/notification/what.html"}}),e("div",{staticClass:"panel"},[t._m(0),e("div",{staticClass:"panel-body"},[e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.showMinimal}},[e("span",[t._v("Show notification")])])]),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/notification/minimal.snippet"}})],1)]),e("div",{staticClass:"panel"},[t._m(1),e("div",{staticClass:"panel-body"},[e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.showAvatar}},[e("span",[t._v("Show notification")])])]),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/notification/avatar.snippet"}})],1)]),e("div",{staticClass:"panel"},[t._m(2),e("div",{staticClass:"panel-body"},[e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.showIcon}},[e("span",[t._v("Show notification")])])]),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/notification/icon.snippet"}})],1)]),e("div",{staticClass:"panel"},[t._m(3),e("div",{staticClass:"panel-body"},[e("button",{staticClass:"btn btn-contained btn-primary",on:{click:t.showButtons}},[e("span",[t._v("Show notification")])])]),e("div",{staticClass:"panel-body"},[e("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/notification/buttons.snippet"}})],1)])],1),e("div",{staticClass:"col-12 col-lg-3"},[e("TableOfContents")],1)])])],1)},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title"},[t._v("Minimal")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title"},[t._v("Avatar")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title"},[t._v("Icon")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"panel-header"},[e("h2",{staticClass:"panel-title"},[t._v("Buttons")])])}],s=(e("df26"),e("c8ff")),o=e("2d1a"),r=e("c8e6"),c=e("36ad"),l=e("9f6c"),p=e("a287"),u={name:"Notification",components:{CodeExample:r["a"],CodeSnippet:o["a"],PageHeader:c["a"],TableOfContents:l["a"]},methods:{showAvatar:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].ui.notification.create({avatar:"//latte.dev-preview.nl/module/@bas/website/resource/image/photos/2.jpg",title:"Example",message:"Lorem ipsum dolor sit amet..."});case 2:case"end":return t.stop()}},t)}));function n(){return t.apply(this,arguments)}return n}(),showButtons:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].ui.notification.create({duration:0,icon:"package",title:"Update available!",message:"Would you like to update now?",buttons:[{id:1,label:"Update now",color:"primary"},{id:2,label:"Later"}]});case 2:n=t.sent,console.log("Button ID: ".concat(n));case 4:case"end":return t.stop()}},t)}));function n(){return t.apply(this,arguments)}return n}(),showIcon:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].ui.notification.create({color:"warning",icon:"map-marker-outline",message:"<strong>Maps</strong> is using your device's location"});case 2:case"end":return t.stop()}},t)}));function n(){return t.apply(this,arguments)}return n}(),showMinimal:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].ui.notification.create({title:"Hello world",message:"I'm a fancy notification!"});case 2:case"end":return t.stop()}},t)}));function n(){return t.apply(this,arguments)}return n}()}},d=u,m=e("2be6"),v=Object(m["a"])(d,a,i,!1,null,null,null);n["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2d0d3c53.9a16f53f.js.map