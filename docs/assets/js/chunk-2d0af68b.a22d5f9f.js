(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af68b"],{"0dcd":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page",attrs:{id:"component-message"}},[s("PageHeader",[s("h1",[e._v("Message")])]),s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-lg-9 mb-panel-gutter"},[s("CodeExample",{staticClass:"darker",attrs:{"show-code":!1,title:"What is a Message",url:"/snippets/components/message/what.html"}}),s("div",{staticClass:"panel"},[e._m(0),s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-contained btn-primary",on:{click:e.showAlert}},[s("span",[e._v("Show alert")])])]),s("div",{staticClass:"panel-body"},[s("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/message/alert.snippet"}})],1)]),s("div",{staticClass:"panel"},[e._m(1),s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-contained btn-primary",on:{click:e.showConfirm}},[s("span",[e._v("Show confirm")])])]),s("div",{staticClass:"panel-body"},[s("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/message/confirm.snippet"}})],1)]),s("div",{staticClass:"panel"},[e._m(2),s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-contained btn-primary",on:{click:e.showPrompt}},[s("span",[e._v("Show prompt")])])]),s("div",{staticClass:"panel-body"},[s("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/message/prompt.snippet"}})],1)]),s("div",{staticClass:"panel"},[e._m(3),s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-contained btn-primary",on:{click:e.showCustom}},[s("span",[e._v("Show custom")])])]),s("div",{staticClass:"panel-body"},[s("CodeSnippet",{attrs:{lang:"js",url:"/snippets/components/message/custom.snippet"}})],1)])],1),s("div",{staticClass:"col-12 col-lg-3"},[s("TableOfContents")],1)])])],1)},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-header"},[s("h2",{staticClass:"panel-title"},[e._v("Alert")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-header"},[s("h2",{staticClass:"panel-title"},[e._v("Confirm")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-header"},[s("h2",{staticClass:"panel-title"},[e._v("Prompt")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"panel-header"},[s("h2",{staticClass:"panel-title"},[e._v("Custom")])])}],r=(s("df26"),s("c8ff")),i=s("c8e6"),o=s("2d1a"),c=s("36ad"),u=s("9f6c"),l=s("a287"),p={name:"Message",components:{CodeExample:i["a"],CodeSnippet:o["a"],PageHeader:c["a"],TableOfContents:u["a"]},methods:{showAlert:function(){l["a"].ui.message.alert("Alert","This is an alert message with a single button.")},showConfirm:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["a"].ui.message.confirm("Confirm","This is a confirm message with two buttons.");case 2:t=e.sent,s=t.button,e.t0=s,e.next=e.t0===l["a"].ui.message.Buttons.CANCEL?7:e.t0===l["a"].ui.message.Buttons.OK?9:11;break;case 7:return l["a"].ui.message.alert("Result","You clicked Cancel!"),e.abrupt("break",11);case 9:return l["a"].ui.message.alert("Result","You clicked OK!"),e.abrupt("break",11);case 11:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),showCustom:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,s,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=l["a"].ui.message.Buttons.CANCEL|l["a"].ui.message.Buttons.NO|l["a"].ui.message.Buttons.YES,e.next=3,l["a"].ui.message.create("Custom","This is a message with three custom buttons defined in Latte.ui.message.Buttons",t);case 3:s=e.sent,a=s.button,e.t0=a,e.next=e.t0===l["a"].ui.message.Buttons.CANCEL?8:e.t0===l["a"].ui.message.Buttons.NO?10:e.t0===l["a"].ui.message.Buttons.YES?12:14;break;case 8:return l["a"].ui.message.alert("Result","You clicked Cancel!"),e.abrupt("break",14);case 10:return l["a"].ui.message.alert("Result","You clicked No!"),e.abrupt("break",14);case 12:return l["a"].ui.message.alert("Result","You clicked Yes!"),e.abrupt("break",14);case 14:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),showPrompt:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t,s,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["a"].ui.message.prompt("Prompt","This is a prompt message where you can enter something. What is your name?");case 2:t=e.sent,s=t.button,a=t.input,e.t0=s,e.next=e.t0===l["a"].ui.message.Buttons.CANCEL?8:e.t0===l["a"].ui.message.Buttons.OK?10:12;break;case 8:return l["a"].ui.message.alert("Result","You clicked Cancel!"),e.abrupt("break",12);case 10:return l["a"].ui.message.alert("Result","You clicked OK and entered ".concat(a,"!")),e.abrupt("break",12);case 12:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}()}},m=p,d=s("2be6"),b=Object(d["a"])(m,a,n,!1,null,null,null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-2d0af68b.a22d5f9f.js.map