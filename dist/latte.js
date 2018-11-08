(function () {
'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function closest(element, selector) {
  for (; element && element !== document; element = element.parentNode) {
    if (element === selector || typeof selector === "string" && element.matches(selector)) return element;
  }

  return null;
}
function createElement(element) {
  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var el = document.createElement(element);
  if (func !== undefined) func(el);
  return el;
}
function downloadFile$1(fileName, url) {
  createElement("a", function (a) {
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}
function live(root, selector, event, callback) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    passive: true
  };

  if (event.indexOf(" ") > -1) {
    var events = event.split(" ");
    events.forEach(function (event) {
      return live(root, selector, event, callback);
    });
    return;
  }

  root.addEventListener(event, function (evt) {
    var qs = root.querySelectorAll(selector);
    if (!qs) return;
    var el = evt.target,
        index;

    while (el && (index = Array.prototype.indexOf.call(qs, el)) === -1) {
      el = el.parentElement;
    }

    if (index > -1) callback(el, evt);
  }, options);
}
function printDocument$1(url) {
  var wnd = window.open(url);
  wnd.addEventListener("load", function () {
    wnd.print();
    wnd.addEventListener("focus", function () {
      return wnd.close();
    });
  });
}
function querySelectorAll(selector) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var elements = [];
  root.querySelectorAll(selector).forEach(function (r) {
    return elements.push(r);
  });
  return elements;
}
function relativeCoordsTo(element, evt) {
  if (!evt.clientX || !evt.clientY) return undefined;
  var rect = element.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
function toDOM(str) {
  var temp = document.createElement("div");
  var fragment = document.createDocumentFragment();
  var child;
  temp.innerHTML = str;

  while (child = temp.firstChild) {
    fragment.appendChild(child);
  }

  return fragment;
}
var dom = {
  closest: closest,
  createElement: createElement,
  downloadFile: downloadFile$1,
  live: live,
  printDocument: printDocument$1,
  querySelectorAll: querySelectorAll,
  relativeCoordsTo: relativeCoordsTo,
  toDOM: toDOM
};

var OutsideEvent =
/*#__PURE__*/
function () {
  function OutsideEvent(source) {
    _classCallCheck(this, OutsideEvent);

    this.listeners = {};
    this.source = source;
  }

  _createClass(OutsideEvent, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var fn = function fn(evt) {
        if (_this.isWithinSource(evt)) return;
        listener(evt);
      };

      document.addEventListener(type, fn, options);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var handler = this.listeners[listener];
      if (handler === undefined) return;
      document.removeEventListener(type, handler, options);
    }
  }, {
    key: "isWithinSource",
    value: function isWithinSource(evt) {
      if (evt.pageX === undefined) return false;
      var element = document.elementFromPoint(evt.pageX, evt.pageY);
      return closest(element, this.source) !== null;
    }
  }]);

  return OutsideEvent;
}();

EventTarget.prototype.addOutsideEventListener = function (type, listener) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (this.outsideEvent === undefined) this.outsideEvent = new OutsideEvent(this);
  this.outsideEvent.addEventListener(type, listener, options);
};

EventTarget.prototype.removeOutsideEventListener = function (type, listener) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (this.outsideEvent === undefined) this.outsideEvent = new OutsideEvent(this);
  this.outsideEvent.removeEventListener(type, listener, options);
};

function id$1() {
  var array = new Uint32Array(3);
  window.crypto.getRandomValues(array);
  return "latte-" + array.join("-");
}
function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var completeOptions = Object.assign({}, {
    credentials: "same-origin"
  }, options);
  return fetch(url, completeOptions);
}
var api = {
  id: id$1,
  request: request
};

//

function areArraysEqual(a, b) {
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

var script = {
  name: "latte-autocomplete",
  props: {
    defaultValue: {
      default: undefined,
      required: false
    },
    disabled: {
      default: false,
      required: false,
      type: Boolean
    },
    limit: {
      default: 5,
      required: false,
      type: Number
    },
    multiSelect: {
      default: false,
      required: false,
      type: Boolean
    },
    name: {
      default: id$1(),
      required: false,
      type: String
    },
    offset: {
      default: 0,
      required: false,
      type: Number
    },
    placeholder: {
      default: "Search...",
      required: false,
      type: String
    },
    url: {
      required: true,
      type: String
    },
    value: {
      default: function _default() {
        return [];
      },
      required: false,
      type: Array | Number
    }
  },
  data: function data() {
    return {
      abortController: null,
      canEmit: true,
      canOpen: false,
      isLoading: false,
      currentSuggestion: -1,
      searchTerm: "",
      suggestions: [],
      valueLast: [],
      values: []
    };
  },
  mounted: function mounted() {
    this.onValueChanged();
  },
  computed: {
    canSearch: function canSearch() {
      return this.multiSelect || this.values.length === 0;
    },
    shouldOpenSuggestions: function shouldOpenSuggestions() {
      return this.canOpen && this.suggestionsFiltered.length > 0;
    },
    suggestionsFiltered: function suggestionsFiltered() {
      var _this = this;

      return this.suggestions.filter(function (s) {
        return _this.values.filter(function (v) {
          return v.label === s.label && v.value === s.value;
        }).length === 0;
      });
    }
  },
  methods: {
    addValue: function addValue(label, value) {
      if (label === undefined || value === undefined) return;
      if (this.values.filter(function (v) {
        return v.value === value && v.label === label;
      }).length > 0) return;
      this.values.push({
        label: label,
        value: value
      });
    },
    removeValue: function removeValue(value) {
      this.values = this.values.filter(function (v) {
        return v.value !== value;
      });
    },
    onBlur: function onBlur() {
      this.canOpen = false;
    },
    onFocus: function onFocus() {
      this.suggestions = [];
      this.canOpen = true;
    },
    onSelectSuggestion: function onSelectSuggestion() {
      if (!this.suggestionsFiltered[this.currentSuggestion]) return;
      var _this$suggestionsFilt = this.suggestionsFiltered[this.currentSuggestion],
          label = _this$suggestionsFilt.label,
          value = _this$suggestionsFilt.value;
      this.addValue(label, value);
      this.canOpen = false;
      this.searchTerm = "";
    },
    onSelectFirstSuggestion: function onSelectFirstSuggestion(evt) {
      if (this.suggestions.length === 0 || !this.shouldOpenSuggestions) return;
      if (this.currentSuggestion === -1) this.onKeyPressDown();
      this.onSelectSuggestion();
      evt.preventDefault();
      evt.stopPropagation();
    },
    onKeyPressDelete: function onKeyPressDelete() {
      if (this.searchTerm !== "") return;
      this.values.pop();
    },
    onKeyPressDown: function onKeyPressDown() {
      if (this.currentSuggestion + 1 >= this.suggestions.length) this.currentSuggestion = -1;else this.currentSuggestion++;
    },
    onKeyPressUp: function onKeyPressUp() {
      if (this.currentSuggestion - 1 < -1) this.currentSuggestion = this.suggestions.length - 1;else this.currentSuggestion--;
    },
    onReceiveSuggestions: function onReceiveSuggestions(response) {
      this.abortController = null;
      this.canOpen = true;
      this.currentSuggestion = -1;
      this.suggestions = response.data;
    },
    onReceiveValues: function onReceiveValues(response) {
      this.values = response.data;
      this.isLoading = false;
    },
    onSearchTermChanged: function onSearchTermChanged() {
      var _this2 = this;

      if (this.searchTerm.trim() === "") {
        this.currentSuggestion = -1;
        this.canOpen = false;
        return;
      }

      if (this.abortController !== null) {
        this.abortController.abort();
        this.abortController = null;
      }

      this.abortController = new AbortController();
      request("".concat(this.url, "?q=").concat(encodeURIComponent(this.searchTerm.toLowerCase())), {
        cache: "no-cache",
        signal: this.signal
      }).then(function (r) {
        return r.json();
      }).then(function (r) {
        return _this2.onReceiveSuggestions(r);
      }).catch(function (err) {
        return console.error(err);
      });
    },
    onValueChanged: function onValueChanged() {
      var _this3 = this;

      var value = this.multiSelect ? this.value : [this.value];
      value = value.filter ? value.filter(function (v) {
        return v > 0;
      }) : value;

      if (value.length === 0) {
        this.values = [];
        this.valueLast = [];
        return;
      }

      if (areArraysEqual(value, this.valueLast)) return;
      if (this.isLoading) return;
      this.isLoading = true;
      request("".concat(this.url, "?ids=").concat(value.join(","))).then(function (r) {
        return r.json();
      }).then(function (r) {
        return _this3.onReceiveValues(r);
      }).catch(function (err) {
        return console.error(err);
      });
      this.valueLast = value;
    }
  },
  watch: {
    shouldOpenSuggestions: function shouldOpenSuggestions() {
      this.currentSuggestion = -1;
    },
    searchTerm: function searchTerm() {
      this.onSearchTermChanged();
    },
    value: function value() {
      this.canEmit = false;
      this.onValueChanged();
    },
    values: function values() {
      if (this.canEmit === false) return this.canEmit = true;
      var values = this.values.map(function (v) {
        return v.value;
      });
      this.$emit("input", (this.multiSelect ? values : values[0]) || this.defaultValue);
    }
  }
};

/* script */
            const __vue_script__ = script;
            
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-away",rawName:"v-click-away",value:(_vm.onBlur),expression:"onBlur"}],staticClass:"latte-autocomplete"},[_c('div',{staticClass:"form-control",attrs:{"disabled":_vm.disabled}},[_vm._l((_vm.values),function(val){return _c('span',{staticClass:"badge badge-primary"},[_c('span',[_vm._v(_vm._s(val.label))]),_c('button',{staticClass:"btn",on:{"click":function($event){_vm.removeValue(val.value);}}},[_c('i',{staticClass:"mdi mdi-window-close"})])])}),_vm._v(" "),(_vm.canSearch)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchTerm),expression:"searchTerm"}],ref:"field",staticClass:"form-control",attrs:{"type":"search","name":_vm.name,"placeholder":_vm.placeholder,"autocomplete":"false"},domProps:{"value":(_vm.searchTerm)},on:{"focus":_vm.onFocus,"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete"])){ return null; }return _vm.onKeyPressDelete($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.onSelectSuggestion($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onSelectFirstSuggestion($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onKeyPressDown($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onKeyPressUp($event)}],"input":function($event){if($event.target.composing){ return; }_vm.searchTerm=$event.target.value;}}}):_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"dropdown",class:{'is-open': _vm.shouldOpenSuggestions},attrs:{"role":"combobox"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._l((_vm.suggestionsFiltered),function(suggestion,index){return [_c('a',{staticClass:"nav-link",class:{'is-hover': _vm.currentSuggestion === index},attrs:{"role":"option"},on:{"&pointermove":function($event){_vm.currentSuggestion = index;},"click":_vm.onSelectSuggestion}},[_c('span',[_vm._v(_vm._s(suggestion.label)+" "),(suggestion.sub_label)?_c('span',{staticClass:"sub-label"},[_vm._v(_vm._s(suggestion.sub_label))]):_vm._e()]),_vm._v(" "),_c('i',{staticClass:"mdi mdi-chevron-right"})])]})],2)]),_vm._v(" "),(_vm.isLoading)?_c('span',{staticClass:"spinner spinner-primary"}):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* component normalizer */
  function __vue_normalize__(
    template, style, script$$1,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Autocomplete.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Autocomplete = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var main = undefined;
function deepMerge(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (sources.length === 0) return target;
  var source = sources.shift();
  if (!isObject(target) || !isObject(source)) return deepMerge.apply(void 0, [target].concat(sources));

  for (var key in source) {
    if (!source.hasOwnProperty(key)) continue;

    if (isObject(source[key])) {
      if (!target[key]) Object.assign(target, _defineProperty({}, key, source[key]));
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, _defineProperty({}, key, source[key]));
    }
  }

  return deepMerge.apply(void 0, [target].concat(sources));
}
function getMainElement() {
  return main || (main = document.querySelector("main#app"));
}
function handleError$1(err) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  Latte.messages.alert("Aw snap!", "<pre>".concat(err.stack, "</pre>"));
  if (fn) fn();
}
function isObject(obj) {
  return obj && _typeof(obj) === "object" && !Array.isArray(obj);
}
function interval(timeout, func) {
  func();
  return window.setInterval(func, timeout);
}
function isIterable(obj) {
  if (obj === null) return false;
  return typeof obj[Symbol.iterator] === "function";
}
function randomPassword() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;
  var availableSets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "luds";
  var sets = [];
  if (availableSets.indexOf("l") > -1) sets.push("abcdefghjkmnpqrstuvwxyz");
  if (availableSets.indexOf("u") > -1) sets.push("ABCDEFGHJKMNPQRSTUVWXYZ");
  if (availableSets.indexOf("d") > -1) sets.push("123456789");
  if (availableSets.indexOf("s") > -1) sets.push("!@#$%&*?");
  var all = "";
  var password = "";
  sets.forEach(function (set) {
    password += set[Math.floor(Math.random() * set.length)];
    all += set;
  });

  for (var i = 0; i < length - sets.length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return shuffleString(password);
}
function register(func) {
  func(window.Latte);
}
function timeout(timeout, func) {
  return window.setTimeout(func, timeout);
}
function updateURLHash(data) {
  var parts = [];

  for (var key in data) {
    if (!data.hasOwnProperty(key)) continue;
    var str = key;
    var d = data[key];
    if (d.value) str += "=".concat(d.value);

    for (var vk in d.vars) {
      if (d.vars.hasOwnProperty(vk)) str += "/".concat(vk, ":").concat(d.vars[vk]);
    }

    parts.push(str);
  }

  var hash = parts.join("&");
  if (hash.length > 0) location.hash = hash;else history.replaceState({}, document.title, location.pathname + location.search);
}

function shuffleString(str) {
  var a = str.split("");
  var n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }

  return a.join("");
}

var core = {
  deepMerge: deepMerge,
  getMainElement: getMainElement,
  handleError: handleError$1,
  interval: interval,
  isObject: isObject,
  isIterable: isIterable,
  randomPassword: randomPassword,
  register: register,
  timeout: timeout,
  updateURLHash: updateURLHash
};

/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */
var actions = {};
function dispatch(action) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var evt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  if (typeof actions[action] === "undefined") return;
  actions[action].forEach(function (callback) {
    return callback(data, el, evt);
  });
}
function on(action, callback) {
  if (typeof actions[action] === "undefined") actions[action] = [];
  actions[action].push(callback);
}

function onAction(element, evt) {
  var action = element.dataset.action;
  var actionData = element.dataset;
  if (typeof actions[action] === "undefined") return;
  actions[action].forEach(function (callback) {
    return callback(actionData, element, evt);
  });
}

var actions$1 = {
  dispatch: dispatch,
  on: on
};
live(document.body, "[data-action]", "click", function (element, evt) {
  return onAction(element, evt);
}, {
  passive: true
});
on("latte:hash-change", function (parameters) {
  var action = parameters.action;
  delete parameters.action;
  updateURLHash(parameters);
  if (action === undefined || action === null) return;
  dispatch(action.value, action.vars);
});

var script$1 = {
  name: "latte-button-dropdown",
  props: {
    ariaLabel: {
      default: "",
      required: false,
      type: String
    },
    autoClose: {
      default: true,
      required: false,
      type: Boolean
    },
    buttonClass: {
      default: "btn-text btn-icon btn-dark",
      required: false,
      type: String
    },
    icon: {
      default: "",
      required: false,
      type: String
    },
    iconAfter: {
      default: "",
      required: false,
      type: String
    },
    iconBefore: {
      default: "",
      required: false,
      type: String
    },
    isLoading: {
      default: false,
      required: false,
      type: Boolean
    },
    label: {
      default: "",
      required: false,
      type: String
    },
    openAtStart: {
      default: false,
      required: false,
      type: Boolean
    },
    small: {
      default: false,
      required: false,
      type: Boolean
    },
    tooltip: {
      default: "",
      required: false,
      type: String
    },
    type: {
      default: 'list',
      type: String,
      validator: function validator(value) {
        return ["grid", "list", "custom"].indexOf(value) > -1;
      }
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.popup) return;
    this.popup.removeOutsideEventListener("pointerdown", this.cb.onOutsideClick);
    this.popup.remove();
  },
  data: function data() {
    var _this = this;

    return {
      cb: {
        onOutsideClick: function onOutsideClick(evt) {
          return _this.onOutsideClick(evt);
        }
      },
      isOpen: this.openAtStart,
      popup: null,
      popupPosition: {
        x: 0,
        y: 0
      },
      x: 0,
      y: 0
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    var rect = this.$el.getBoundingClientRect();
    this.x = rect.left;
    this.y = rect.top;
    on("latte:context-menu", function () {
      return _this2.close();
    });
    on("latte:overlay", function () {
      return _this2.close();
    });
    this.popup = this.$el.querySelector(":scope > div.dropdown");
    this.popup.addOutsideEventListener("pointerdown", this.cb.onOutsideClick);
    live(this.popup, "[href],[data-close]", "click", function () {
      return _this2.close();
    });
    this.$nextTick(function () {
      _this2.$el.removeChild(_this2.popup);

      document.body.appendChild(_this2.popup);
      window.addEventListener("resize", function () {
        return _this2.shouldUpdate();
      }, {
        passive: true
      });
      window.addEventListener("scroll", function () {
        return _this2.shouldUpdate();
      }, {
        passive: true
      });

      _this2.calculatePosition();
    });
  },
  computed: {
    avatarUrl: function avatarUrl() {
      if (this.icon.substr(0, 6) === "avatar") return this.icon.substr(7);
      return null;
    },
    buttonClasses: function buttonClasses() {
      var classes = this.buttonClass.split(" ");
      if (this.small) classes.push("btn-sm");
      if (this.isOpen) classes.push("is-open", "tooltip-disabled");
      return classes;
    },
    dropdownClasses: function dropdownClasses() {
      var classes = ["dropdown", "dropdown-at-root"];
      var aboveUnder = this.y > window.innerHeight / 2 ? "above" : "under";
      var position = this.x > window.innerWidth / 2 ? "right" : "left";
      classes.push("dropdown-".concat(position, "-").concat(aboveUnder));
      classes.push("dropdown-".concat(this.type));
      if (this.isOpen === true) classes.push("is-open");
      return classes;
    },
    iconClasses: function iconClasses() {
      return ["mdi", "mdi-".concat(this.icon)];
    },
    iconAfterClasses: function iconAfterClasses() {
      return ["mdi", "mdi-".concat(this.iconAfter)];
    },
    iconBeforeClasses: function iconBeforeClasses() {
      return ["mdi", "mdi-".concat(this.iconBefore)];
    }
  },
  methods: {
    calculatePosition: function calculatePosition() {
      if (this.popup === null) return;
      var margin = this.buttonClasses.contains("btn-icon") ? this.small ? 22 : 18 : 13;
      var bcr = this.$el.getBoundingClientRect();
      var pcr = this.popup.getBoundingClientRect();
      var px = this.x > window.innerWidth / 2 ? "right" : "left";
      var py = this.y > window.innerHeight / 2 ? "above" : "under";
      var x = bcr.left - margin;
      var y = bcr.top + bcr.height;
      if (px === "right") x = bcr.left + bcr.width - (pcr.width - margin);
      if (py === "above") y = bcr.top - pcr.height;
      this.popupPosition.x = Math.round(x);
      this.popupPosition.y = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
    },
    shouldUpdate: function shouldUpdate() {
      var rect = this.$el.getBoundingClientRect();
      this.x = rect.left;
      this.y = rect.top;
      this.calculatePosition();
    },
    close: function close() {
      this.isOpen = false;
      this.$emit("close");
      this.calculatePosition();
      dispatch("latte:tooltip:hide");
    },
    open: function open(evt) {
      this.isOpen = true;

      if (evt) {
        this.x = evt.clientX;
        this.y = evt.clientY;
      }

      this.$emit("open");
      this.calculatePosition();
      dispatch("latte:tooltip:hide");
    },
    toggle: function toggle(evt) {
      if (this.isOpen) this.close();else this.open(evt);
    },
    onOutsideClick: function onOutsideClick() {
      var _this3 = this;

      if (!this.isOpen) return;
      this.$nextTick(function () {
        return _this3.close();
      });
    }
  },
  watch: {
    dropdownClasses: function dropdownClasses() {
      var _this$popup$classList, _this$popup$classList2;

      if (this.popup === null) return;
      var classes = [];
      this.popup.classList.forEach(function (className) {
        return classes.push(className);
      });

      (_this$popup$classList = this.popup.classList).remove.apply(_this$popup$classList, classes);

      (_this$popup$classList2 = this.popup.classList).add.apply(_this$popup$classList2, _toConsumableArray(this.dropdownClasses));
    },
    isOpen: function isOpen() {
      if (this.isOpen) getMainElement().classList.add("is-popup-opened");else getMainElement().classList.remove("is-popup-opened");
    },
    popupPosition: {
      deep: true,
      handler: function handler() {
        this.popup.style.transform = "translate3d(".concat(this.popupPosition.x, "px, ").concat(this.popupPosition.y, "px, 0)");
      }
    }
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"btn",class:_vm.buttonClasses,attrs:{"data-tooltip":_vm.tooltip,"data-tooltip-class":"tooltip-bottom tooltip-contain","aria-label":_vm.ariaLabel},on:{"&click":function($event){return _vm.toggle($event)}}},[(_vm.avatarUrl !== null)?_c('img',{staticClass:"avatar avatar-in-button",attrs:{"src":_vm.avatarUrl,"alt":_vm.ariaLabel}}):(_vm.icon !== '')?_c('i',{class:_vm.iconClasses}):_vm._e(),_vm._v(" "),(_vm.iconBefore !== '')?_c('i',{class:_vm.iconBeforeClasses}):_vm._e(),_vm._v(" "),(_vm.label !== '')?_c('span',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),(_vm.iconAfter !== '')?_c('i',{class:_vm.iconAfterClasses}):_vm._e(),_vm._v(" "),_c('div',{class:_vm.dropdownClasses},[_c('div',{staticClass:"dropdown-content"},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* component normalizer */
  function __vue_normalize__$1(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ButtonDropdown.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ButtonDropdown = __vue_normalize__$1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
var script$2 = {
  name: "latte-chart",
  props: {
    options: {
      default: function _default() {
        return {};
      },
      required: false,
      type: Object
    },
    title: {
      default: null,
      required: false,
      type: String | null
    },
    url: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      instance: null,
      is_loading: true,
      chartData: {},
      chartOptions: {}
    };
  },
  mounted: function mounted() {
    this.loadChart();
  },
  computed: {
    titleTransformed: function titleTransformed() {
      var _this = this;

      if (this.title === null) return null;
      return this.title.replace(new RegExp("\\${([a-zA-Z0-9_.\\[\\]]+)}"), function (match, contents) {
        return new Function("\n\t\t\t\t\ttry\n\t\t\t\t\t{\n\t\t\t\t\t\treturn new Intl.NumberFormat(navigator.language).format(this.".concat(contents, ");\n\t\t\t\t\t}\n\t\t\t\t\tcatch(err)\n\t\t\t\t\t{\n\t\t\t\t\t\treturn \"\";\n\t\t\t\t\t}\n\t\t\t\t")).call(_this);
      });
    }
  },
  methods: {
    loadChart: function loadChart() {
      var _this2 = this;

      this.is_loading = true;
      request(this.url).then(function (r) {
        return r.json();
      }).then(function (r) {
        return _this2.onReceivedChart(r);
      });
    },
    onReceivedChart: function onReceivedChart(response) {
      var _this3 = this;

      if (response.success !== true) return;
      var canvas = this.$refs["chart"];
      var chart = this.chartData = response.data;
      var tooltipOptions = {
        tooltips: {
          callbacks: {
            label: this.onTooltipLabel.bind(this)
          }
        }
      };
      this.$emit("change", chart);

      if (this.instance === null) {
        this.chartOptions = chart.options = deepMerge({}, tooltipOptions, chart.options, this.options);
        this.instance = new Chart(canvas, chart);
      } else {
        chart.data.datasets.forEach(function (dataset, index) {
          if (typeof _this3.instance.data.datasets[index] !== "undefined") {
            var remove = _this3.instance.data.datasets[index].data.length > dataset.data.length ? _this3.instance.data.datasets[index].data.length - dataset.data.length : 0;

            for (var i = 0; i < remove; i++) {
              _this3.instance.data.datasets[index].data.pop();
            }

            dataset.data.forEach(function (data, i) {
              return _this3.instance.data.datasets[index].data[i] = data;
            });
          } else {
            _this3.instance.data.datasets.push(dataset);
          }
        });
        this.instance.data.labels = chart.data.labels;
        this.instance.update();
      }

      this.is_loading = false;
    },
    onTooltipLabel: function onTooltipLabel(tooltip, data) {
      if (!this.chartData) return "";
      var dataset = data.datasets[tooltip.datasetIndex];
      var value = dataset.data[tooltip.index];
      var valueFormatted = Intl !== undefined && Intl.NumberFormat !== undefined ? new Intl.NumberFormat(navigator.language)["format"](value) : value;

      switch (this.chartOptions.tooltips.transform || "default") {
        case "percentage":
          return "".concat(dataset.label, ": ").concat(value, "%");

        default:
          return "".concat(dataset.label, ": ").concat(valueFormatted);
      }
    }
  },
  watch: {
    url: function url() {
      this.loadChart();
    }
  }
};

/* script */
            const __vue_script__$2 = script$2;
            
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"latte-charts latte-charts-line",class:{'is-loading':_vm.is_loading}},[_c('span',{staticClass:"spinner spinner-primary"}),_vm._v(" "),(_vm.title !== null)?_c('div',{staticClass:"latte-charts-title"},[_vm._v(_vm._s(_vm.titleTransformed))]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"latte-charts-chart",staticStyle:{"height":"calc(100% - 75px)"}},[_c('canvas',{ref:"chart"})])])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* component normalizer */
  function __vue_normalize__$2(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Chart.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Chart$1 = __vue_normalize__$2(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: "latte-chart-panel",
  props: {
    url: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      name: ""
    };
  },
  methods: {
    onChange: function onChange(data) {
      this.name = data.name;
    }
  }
};

/* script */
            const __vue_script__$3 = script$3;
            
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-header"},[_c('span',{staticClass:"panel-title"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('latte-button-dropdown',{staticClass:"ml-auto",attrs:{"icon":"dots-vertical","type":"list"}},[_c('nav',{staticClass:"nav nav-list"},[_c('a',{staticClass:"nav-link",on:{"click":function($event){_vm.$refs['chart'].loadChart();}}},[_c('i',{staticClass:"mdi mdi-refresh"}),_vm._v(" "),_c('span',[_vm._v("Refresh chart")])])])])],1),_vm._v(" "),_c('latte-chart',{ref:"chart",attrs:{"url":_vm.url},on:{"change":_vm.onChange}})],1)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* component normalizer */
  function __vue_normalize__$3(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ChartPanel.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ChartPanel = __vue_normalize__$3(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$4 = {
  name: "latte-combo-box",
  props: {
    value: {
      default: null,
      required: false
    }
  },
  data: function data() {
    return {
      initialIndex: -1,
      isDropdownOpened: false,
      options: [],
      selectedOptionIndex: -1
    };
  },
  computed: {
    selectedOption: function selectedOption() {
      var option = this.options[this.selectedOptionIndex];
      if (option !== undefined) return option;
      return null;
    },
    selectedOptionTemplate: function selectedOptionTemplate() {
      var option = this.selectedOption;
      if (option !== null) return option.$el.innerHTML;
      return null;
    }
  },
  methods: {
    close: function close() {
      this.initialIndex = -1;
      this.isDropdownOpened = false;
    },
    open: function open() {
      this.initialIndex = this.selectedOptionIndex;
      this.isDropdownOpened = true;
    },
    toggle: function toggle() {
      this.isDropdownOpened = !this.isDropdownOpened;
    },
    checkValue: function checkValue() {
      var _this = this;

      this.selectedOptionIndex = this.options.findIndex(function (option) {
        return option.value === _this.value;
      });
    },
    registerOption: function registerOption(option) {
      var _this2 = this;

      this.options.push(option);
      this.checkValue();
      option.$on("select", function (option) {
        return _this2.onOptionSelect(option);
      });
    },
    unregisterOption: function unregisterOption(option) {
      this.options.splice(this.options.findIndex(function (o) {
        return o === option;
      }), 1);
      this.checkValue();
    },
    onKeyPressDown: function onKeyPressDown() {
      this.open();
      if (this.selectedOptionIndex + 1 >= this.options.length) this.selectedOptionIndex = 0;else this.selectedOptionIndex++;
    },
    onKeyPressEnter: function onKeyPressEnter() {
      this.close();
    },
    onKeyPressEscape: function onKeyPressEscape(evt) {
      if (this.initialIndex !== -1) this.selectedOptionIndex = Math.min(Math.max(0, this.initialIndex), this.options.length - 1);
      this.close();
      evt.preventDefault();
    },
    onKeyPressUp: function onKeyPressUp() {
      this.open();
      if (this.selectedOptionIndex - 1 < 0) this.selectedOptionIndex = this.options.length - 1;else this.selectedOptionIndex--;
    },
    onOptionSelect: function onOptionSelect(option) {
      var _this3 = this;

      this.$nextTick(function () {
        return _this3.close();
      });
      this.selectedOptionIndex = this.options.findIndex(function (o) {
        return o === option;
      });
    }
  },
  watch: {
    selectedOptionIndex: function selectedOptionIndex() {
      var _this4 = this;

      this.options.forEach(function (option) {
        return _this4.$set(option, "active", false);
      });

      if (this.selectedOption !== null) {
        this.$emit("input", this.selectedOption.value);
        this.$set(this.selectedOption, "active", true);
      } else {
        this.$emit("input", null);
      }
    },
    value: function value() {
      this.checkValue();
    }
  }
};

/* script */
            const __vue_script__$4 = script$4;
            
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-control combo-box",attrs:{"tabindex":"0"},on:{"blur":_vm.close,"click":_vm.open,"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onKeyPressDown($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.onKeyPressEnter($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,"Escape")){ return null; }return _vm.onKeyPressEscape($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onKeyPressUp($event)}]}},[(_vm.selectedOptionTemplate !== null)?_c('a',{staticClass:"nav-link combo-box-selection",domProps:{"innerHTML":_vm._s(_vm.selectedOptionTemplate)}}):_c('div',{staticClass:"combo-box-empty"},[_vm._v("Select...")]),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark form-control-suffix",attrs:{"type":"button"},on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi mdi-chevron-down"})]),_vm._v(" "),_c('div',{staticClass:"dropdown",class:{'is-open': _vm.isDropdownOpened},attrs:{"role":"combobox"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-7922ca8b_0", { source: "\ndiv.combo-box[data-v-7922ca8b]{align-items:center;padding:0 16px 0 0;z-index:unset\n}\na.combo-box-selection[data-v-7922ca8b]{flex:1 1 auto;pointer-events:none\n}\nbutton.form-control-suffix[data-v-7922ca8b]{color:rgba(var(--color-dark),.5);pointer-events:none\n}\ndiv.dropdown[data-v-7922ca8b]{position:absolute;top:100%;left:0;right:0;transition:all 180ms var(--ease-swift-out);will-change:opacity,transform;z-index:10\n}\ndiv.dropdown[data-v-7922ca8b]:not(.is-open){opacity:0;pointer-events:none;transform:translate3d(0,1rem,0)\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-7922ca8b";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* component normalizer */
  function __vue_normalize__$4(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ComboBox.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__.styles || (__vue_create_injector__.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var ComboBox = __vue_normalize__$4(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    __vue_create_injector__,
    undefined
  );

//
//
//
//
//
//
//
//
var script$5 = {
  name: "latte-combo-box-item",
  props: {
    value: {
      required: true
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$parent.unregisterOption(this);
  },
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    this.$parent.registerOption(this);
  },
  methods: {
    click: function click() {
      this.$emit("select", this);
    }
  }
};

/* script */
            const __vue_script__$5 = script$5;
            
/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"nav-link",class:{'is-hover': _vm.active},attrs:{"role":"option"},on:{"click":_vm.click}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* component normalizer */
  function __vue_normalize__$5(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ComboBoxItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ComboBoxItem = __vue_normalize__$5(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Returns TRUE if {@see str} is undefined, NULL or contains only whitespace.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function isNullOrWhitespace(str) {
  if (typeof str === "undefined" || str === null) return true;
  return str.replace(/\s/g, '').length < 1;
}

var isInFrame = window.top !== window;
var translations = null;
function forObject(obj) {
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) obj[key] = translate(domain, obj[key]);
  }

  return obj;
}
function replace(string) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  for (var i = 0; i < params.length; i++) {
    string = string.replace(new RegExp("@".concat(i), 'g'), params[i]);
  }

  return string;
}
function translate(domain, string) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (translations === null || typeof translations[domain] === "undefined" || typeof translations[domain][string] === "undefined") return replace(string, params);
  return replace(translations[domain][string], params);
}

function onTranslationsLoaded(response) {
  if (typeof response !== "undefined") translations = response.data;
  dispatch("latte:i18n:translations-loaded", translations);
}

if (isInFrame) onTranslationsLoaded(undefined);else onTranslationsLoaded({
  data: window.LatteI18n || {}
});
var i18n = {
  forObject: forObject,
  replace: replace,
  translate: translate
};

//
var script$6 = {
  name: "latte-data-table",
  props: {
    limit: {
      default: 20,
      required: false,
      type: Number
    },
    name: {
      default: function _default() {
        return id$1();
      },
      required: false,
      type: String
    },
    selectMode: {
      default: "none",
      required: false,
      type: String,
      validator: function validator(value) {
        return ["none", "single", "multiple"].indexOf(value) > -1;
      }
    },
    showFooter: {
      default: false,
      required: false,
      type: Boolean
    },
    showHeader: {
      default: true,
      required: false,
      type: Boolean
    },
    showSearch: {
      default: true,
      required: false,
      type: Boolean
    },
    showSorting: {
      default: true,
      required: false,
      type: Boolean
    },
    url: {
      required: true,
      type: String
    },
    value: {
      default: function _default() {
        return [];
      },
      required: false,
      type: Array | Number
    }
  },
  created: function created() {
    this.i18n = forObject(this.i18n, "root");
  },
  data: function data() {
    return {
      defaults: {
        column: {
          is_searchable: false,
          is_sortable: false
        }
      },
      i18n: {
        more: "More options",
        sortOn: "Sort by @0"
      },
      isLoading: false,
      actions: [],
      columns: [],
      data: [],
      filters: [],
      page: 1,
      pagination: [],
      params: {},
      panel: null,
      selection: this.value,
      sort: {
        by: "",
        order: 'DESC'
      },
      show: {
        footer: this.showFooter,
        header: this.showHeader,
        search: this.showSearch,
        sorting: this.showSorting
      },
      uniqueId: id$1()
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.panel = closest(this.$el, "div.panel");
    Latte.actions.on("data-tables:refresh", function () {
      return _this.reload();
    });
    this.loadSpinner();
    this.loadSetup();
  },
  computed: {
    actionsWidth: function actionsWidth() {
      return 52;
    },
    showSelections: function showSelections() {
      return this.selectMode !== "none";
    }
  },
  methods: {
    addFilter: function addFilter(filter) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.filters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var f = _step.value;
          if (f["property"] === filter["property"] && f["value"] === filter["value"]) return;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.page = 1;
      filter.class = filter.class || "badge-info";
      this.filters.push(filter);
      this.loadFromUrl();
    },
    removeFilter: function removeFilter(evt, filterKey) {
      this.page = 1;
      this.filters.splice(filterKey, 1);
      this.loadFromUrl();
      evt.preventDefault();
      evt.stopPropagation();
    },
    createAction: function createAction(action, row) {
      return Vue.extend({
        template: action.template,
        data: function data() {
          return {
            action: action,
            row: row
          };
        }
      });
    },
    createRowColumn: function createRowColumn(row, column) {
      var $this = this;
      var badgesHTML = "\t<template v-for=\"badge of (row.badges || [])\">\n\t\t\t\t\t\t\t\t\t\t<a class=\"badge ml-2\" :class=\"['badge-' + badge.type]\" @click=\"applyFilter($event, badge.filter, badge.type)\" v-if=\"badge.filter !== null\">{{ badge.message }}</a>\n\t\t\t\t\t\t\t\t\t\t<span class=\"badge ml-2\" :class=\"['badge-' + badge.type]\" v-if=\"badge.filter === null\">{{ badge.message }}</span>\n\t\t\t\t\t\t\t\t\t</template>";
      column.template = column.template.replace("<slot name=\"badges\"></slot>", badgesHTML);
      return Vue.extend({
        template: column.template,
        data: function data() {
          return {
            column: column,
            row: row,
            uniqueId: $this.uniqueId
          };
        },
        methods: {
          addFilter: function addFilter(property, value) {
            var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
            var filterClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "primary";
            label = label || value;
            $this.addFilter({
              property: property,
              value: value,
              label: label,
              class: filterClass
            });
          },
          applyFilter: function applyFilter(evt, filter, filterClass) {
            filter.class = "badge-".concat(filterClass);
            $this.addFilter(filter);
            evt.preventDefault();
            evt.stopPropagation();
          },
          moment: function (_moment) {
            function moment() {
              return _moment.apply(this, arguments);
            }

            moment.toString = function () {
              return _moment.toString();
            };

            return moment;
          }(function () {
            return moment.apply(void 0, arguments);
          }),
          utc: function utc() {
            var _moment2;

            return (_moment2 = moment).utc.apply(_moment2, arguments);
          }
        }
      });
    },
    loadFromUrl: function loadFromUrl() {
      this.data = [];
      this.pagination = [];
      this.isLoading = true;
      var url = "".concat(this.url, "/data?offset=").concat((this.page - 1) * this.limit, "&limit=").concat(this.limit);
      if (this.sort.by.trim() !== "") url += "&sort=".concat(this.sort.order, "&by=").concat(this.sort.by);

      for (var key in this.params) {
        if (this.params.hasOwnProperty(key) && !isNullOrWhitespace(this.params[key])) url += "&".concat(key, "=").concat(encodeURIComponent(this.params[key]));
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.filters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var filter = _step2.value;
          if (!isNullOrWhitespace(filter.value.toString())) url += "&filter[".concat(filter["property"], "]=").concat(filter["value"]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      request(url).then(function (r) {
        return r.json();
      }).then(this.onReceivedData).catch(function (err) {
        return handleError$1(err);
      });
    },
    loadPage: function loadPage(page) {
      this.page = page;
      this.loadFromUrl();
    },
    loadSetup: function loadSetup() {
      request(this.url).then(function (r) {
        return r.json();
      }).then(this.onReceivedSetupResponse).catch(function (err) {
        return handleError$1(err);
      });
    },
    loadSpinner: function loadSpinner() {
      if (this.panel === null) return;
      if (this.panel.querySelectorAll("span.spinner").length > 0) return;
      var spinner = document.createElement("span");
      spinner.classList.add("spinner", "spinner-primary");
      this.panel.appendChild(spinner);
    },
    onReceivedData: function onReceivedData(response) {
      this.data = response.data.data;
      this.pagination = response.data.pagination;
      this.isLoading = false;
    },
    onReceivedSetupResponse: function onReceivedSetupResponse(response) {
      var _this2 = this;

      this.actions = response.data.actions;
      this.columns = response.data.columns.map(function (column) {
        return Object.assign({}, _this2.defaults.column, column);
      });

      if (typeof response.data.sorting !== "undefined") {
        this.sort.by = response.data.sorting.by;
        this.sort.order = response.data.sorting.order;
      }

      this.loadFromUrl();
    },
    reload: function reload() {
      this.loadFromUrl();
    },
    search: function search(evt) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.page = 1;
      this.loadFromUrl();
    },
    sortBy: function sortBy(field) {
      if (this.sort.by === field) this.sort.order = this.sort.order === "DESC" ? "ASC" : "DESC";
      this.sort.by = field;
      this.loadFromUrl();
    }
  },
  watch: {
    isLoading: function isLoading() {
      this.$emit("loading", this.isLoading);
      if (this.panel === null) return;
      if (this.isLoading) this.panel.classList.add("is-loading");else this.panel.classList.remove("is-loading");
    },
    selection: function selection() {
      this.$emit("input", this.selection);
    },
    value: function value() {
      this.selection = this.value;
    }
  }
};

/* script */
            const __vue_script__$6 = script$6;
            
/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table table-hover mb-0"},[_c('thead',[(_vm.show.header)?_c('tr',[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{style:({'min-width': (column.width && column.width !== null ? column.width + 'px' : 'auto'), 'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field}},[_c('div',{staticClass:"column-content flex-row align-items-center justify-content-start"},[_c('span',[_vm._v(_vm._s(column.label))]),_vm._v(" "),(_vm.show.sorting && column.is_sortable)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark btn-sm ml-1",attrs:{"aria-label":_vm.i18n.sortOn.replace('@0', column.label)},on:{"click":function($event){_vm.sortBy(column.field);}}},[(_vm.sort.by !== column.field)?_c('i',{staticClass:"mdi latte-sorting none"}):(_vm.sort.order === 'ASC')?_c('i',{staticClass:"mdi latte-sorting down"}):(_vm.sort.order === 'DESC')?_c('i',{staticClass:"mdi latte-sorting up"}):_vm._e()]):_vm._e()])])}),_vm._v(" "),(_vm.actions.length > 0)?_c('th',{style:({'width': _vm.actionsWidth + 'px'})}):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.show.search)?_c('tr',{staticClass:"search-row"},[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{style:({'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field}},[(column.is_searchable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.params[column.field]),expression:"params[column.field]"}],attrs:{"type":"search","placeholder":"Zoeken"},domProps:{"value":(_vm.params[column.field])},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.search($event)},"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.params, column.field, $event.target.value);}}}):_vm._e()])}),_vm._v(" "),_c('th')],2):_vm._e(),_vm._v(" "),(_vm.filters.length > 0)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columns.length + (_vm.actions.length > 0 ? 1 : 0) + (_vm.showSelections ? 1 : 0)}},[_c('div',{staticClass:"column-content flex-row justify-content-start"},[_vm._l((_vm.filters),function(filter,filterKey){return [_c('span',{staticClass:"badge mr-1",class:filter.class},[_c('span',[_vm._v(_vm._s(filter.label))]),_vm._v(" "),_c('button',{staticClass:"btn",on:{"click":function($event){_vm.removeFilter($event, filterKey);}}},[_c('i',{staticClass:"mdi mdi-window-close"})])])]})],2)])]):_vm._e()]),_vm._v(" "),_c('tbody',_vm._l((_vm.data),function(row,rowKey){return _c('tr',[(_vm.showSelections)?_c('td',{staticStyle:{"width":"42px","z-index":"1"}},[_c('div',{staticClass:"column-content pr-0"},[(_vm.selectMode === 'single')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selection),expression:"selection"}],staticClass:"radio-button radio-button-primary mr-0",attrs:{"type":"radio","id":_vm.uniqueId + ':' + row.id,"name":_vm.name},domProps:{"value":row.id,"checked":_vm._q(_vm.selection,row.id)},on:{"change":function($event){_vm.selection=row.id;}}}):_vm._e(),_vm._v(" "),(_vm.selectMode === 'multiple')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selection),expression:"selection"}],staticClass:"checkbox checkbox-primary mr-0",attrs:{"type":"checkbox","id":_vm.uniqueId + ':' + row.id,"name":_vm.name + '[]'},domProps:{"value":row.id,"checked":Array.isArray(_vm.selection)?_vm._i(_vm.selection,row.id)>-1:(_vm.selection)},on:{"change":function($event){var $$a=_vm.selection,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=row.id,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selection=$$a.concat([$$v]));}else{$$i>-1&&(_vm.selection=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.selection=$$c;}}}}):_vm._e()])]):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,columnKey){return [_c('td',{style:({'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field,"data-row":rowKey,"data-column":columnKey}},[_c(_vm.createRowColumn(row, column),{tag:"component"})],1)]}),_vm._v(" "),(_vm.actions.length > 0)?_c('td',{staticClass:"actions"},[_c('div',{staticClass:"column-content flex-row align-items-center pl-0"},[_c('latte-button-dropdown',{attrs:{"aria-label":_vm.i18n.more,"icon":"dots-vertical","small":true}},[_c('nav',{staticClass:"nav nav-list"},_vm._l((_vm.actions),function(action,actionKey){return _c(_vm.createAction(action, row),{key:actionKey,tag:"component",attrs:{"data-close":""}})}))])],1)]):_vm._e()],2)})),_vm._v(" "),_c('tfoot',[(_vm.show.footer)?_c('tr',[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{attrs:{"data-field":column.field}},[_c('div',{staticClass:"column-content"},[_vm._v(_vm._s(column.label))])])}),_vm._v(" "),_c('th')],2):_vm._e(),_vm._v(" "),(_vm.pagination.length > 0)?_c('tr',[_c('th',{attrs:{"colspan":_vm.columns.length + (_vm.actions.length > 0 ? 1 : 0) + (_vm.showSelections ? 1 : 0)}},[_c('div',{staticClass:"column-content"},[_c('latte-pagination',{attrs:{"pagination":_vm.pagination},on:{"navigate":_vm.loadPage}})],1)])]):_vm._e()])])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* component normalizer */
  function __vue_normalize__$6(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DataTable.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DataTable = __vue_normalize__$6(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$7 = {
  name: "latte-datepicker",
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Selecteer datum&hellip;'
    },
    value: {
      type: Date,
      required: false,
      default: function _default() {
        return new Date();
      }
    }
  },
  data: function data() {
    return {
      current: this.value,
      currentDate: 0,
      currentMonth: 0,
      currentYear: 0,
      currentView: 'month',
      isClosable: true,
      isPickerOpened: false,
      days: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
      months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
      years: []
    };
  },
  mounted: function mounted() {
    this.currentDate = this.current.getDate();
    this.currentMonth = this.current.getMonth() + 1;
    this.currentYear = this.current.getFullYear();
    this.years = [];

    for (var year = 1970; year <= 2100; year++) {
      this.years.push(year);
    }
  },
  updated: function updated() {
    if (this.currentView === 'year') {
      var months = this.$el.querySelector('div.picker-view-months');
      var month = months.querySelector('.is-selected');
      if (typeof month["scrollIntoViewIfNeeded"] !== "undefined") month["scrollIntoViewIfNeeded"]();
    }

    if (this.currentView === 'years') {
      var years = this.$el.querySelector('div.picker-view-years');
      var year = years.querySelector('.is-selected');

      if (typeof year["scrollIntoViewIfNeeded"] !== "undefined") {
        year["scrollIntoViewIfNeeded"]();
      }
    }
  },
  computed: {
    currentDateString: function currentDateString() {
      return moment(this.current).format('YYYY-MM-DD');
    },
    currentMonthString: function currentMonthString() {
      return this.months[this.currentMonth - 1];
    },
    currentYearString: function currentYearString() {
      return this.currentYear;
    },
    dates: function dates() {
      var dateBegin = new Date(this.currentYear, this.currentMonth - 1, 1);
      var dateEnd = new Date(this.currentYear, this.currentMonth, 0);
      var dayBegin = this.getDayName(dateBegin.getDay());
      var dayEnd = this.getDayName(dateEnd.getDay());
      var dates = [];
      var monthDays = dateEnd.getDate();
      var beforeDates = Math.max(this.days.indexOf(dayBegin), 0);
      var afterDates = Math.max(this.days.length - this.days.indexOf(dayEnd) - 1, 0);

      for (var x = beforeDates - 1; x >= 0; x--) {
        dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth - 1, 0 - x, 0, 0, 0)));
      }

      for (var _x = 1; _x <= monthDays; _x++) {
        dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth - 1, _x, 0, 0, 0)));
      }

      for (var _x2 = 1; _x2 <= afterDates; _x2++) {
        dates.push(new Date(Date.UTC(this.currentYear, this.currentMonth, _x2, 0, 0, 0)));
      }

      return dates;
    }
  },
  methods: {
    getDayName: function getDayName(dayNum) {
      return this.days[(dayNum === 0 ? 7 : dayNum) - 1 % this.days.length];
    },
    isOtherMonth: function isOtherMonth(date) {
      return date.getMonth() + 1 !== this.currentMonth;
    },
    isSame: function isSame(date, other) {
      if (typeof date === 'undefined' || date === null) return false;
      if (typeof other === 'undefined' || other === null) return false;
      return date.getFullYear() === other.getFullYear() && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
    },
    isSelected: function isSelected(date) {
      return this.isSame(date, this.current);
    },
    isToday: function isToday(date) {
      return this.isSame(date, new Date());
    },
    nextMonth: function nextMonth() {
      this.currentMonth++;

      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
    },
    previousMonth: function previousMonth() {
      this.currentMonth--;

      if (this.currentMonth < 1) {
        this.currentMonth = 12;
        this.currentYear--;
      }
    },
    close: function close() {
      if (!this.isClosable) return this.isClosable = true;
      this.isPickerOpened = false;
    },
    open: function open() {
      this.isClosable = false;
      this.isPickerOpened = true;
    },
    select: function select(date) {
      this.current = date;
      this.currentDate = this.current.getDate();
      this.currentMonth = this.current.getMonth() + 1;
      this.currentYear = this.current.getFullYear();
      this.$emit("input", this.current);
      this.close();
    },
    selectMonth: function selectMonth(month) {
      this.currentMonth = month;
      this.currentView = 'month';
    },
    selectYear: function selectYear(year) {
      this.currentYear = year;
      this.currentView = 'month';
    },
    toggleYear: function toggleYear() {
      this.currentView = this.currentView === 'year' ? 'month' : 'year';
    },
    toggleYears: function toggleYears() {
      this.currentView = this.currentView === 'years' ? 'month' : 'years';
    }
  },
  watch: {
    value: function value() {
      this.current = this.value;
      this.currentDate = this.current.getDate();
      this.currentMonth = this.current.getMonth() + 1;
      this.currentYear = this.current.getFullYear();
    }
  }
};

/* script */
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"latte-datepicker-root",class:{'is-open': _vm.isPickerOpened}},[_c('input',{staticClass:"form-control",attrs:{"readonly":"","type":"date","name":_vm.name,"id":_vm.id,"placeholder":_vm.placeholder,"title":_vm.placeholder},domProps:{"value":_vm.currentDateString},on:{"focus":function($event){_vm.open();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,"Escape")){ return null; }_vm.close();}}}),_vm._v(" "),_c('div',{directives:[{name:"click-away",rawName:"v-click-away",value:(_vm.close),expression:"close"}],staticClass:"latte-datepicker-picker"},[_c('div',{staticClass:"picker-top"},[_c('button',{staticClass:"picker-top-nav picker-top-nav-previous",attrs:{"type":"button"},on:{"click":function($event){_vm.previousMonth();}}},[_c('i',{staticClass:"mdi mdi-chevron-left"})]),_vm._v(" "),_c('span',{staticClass:"month",on:{"click":function($event){_vm.toggleYear();}}},[_vm._v(_vm._s(_vm.currentMonthString))]),_vm._v(" "),_c('span',{staticClass:"year",on:{"click":function($event){_vm.toggleYears();}}},[_vm._v(_vm._s(_vm.currentYearString))]),_vm._v(" "),_c('button',{staticClass:"picker-top-nav picker-top-nav-next",attrs:{"type":"button"},on:{"click":function($event){_vm.nextMonth();}}},[_c('i',{staticClass:"mdi mdi-chevron-right"})])]),_vm._v(" "),(_vm.currentView === 'month')?_c('div',{staticClass:"picker-month-view"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"picker-view-dates"},[_vm._l((_vm.dates),function(date){return [_c('div',{staticClass:"date",class:{'is-other-month': _vm.isOtherMonth(date), 'is-selected': _vm.isSelected(date), 'is-today': _vm.isToday(date)},on:{"click":function($event){_vm.select(date);}}},[_vm._v(_vm._s(date.getDate()))])]})],2)]):_vm._e(),_vm._v(" "),(_vm.currentView === 'year')?_c('div',{staticClass:"picker-year-view"},[_c('div',{staticClass:"picker-view-months"},_vm._l((_vm.months),function(month,index){return _c('div',{staticClass:"month",class:{'is-selected': index === _vm.currentMonth - 1},on:{"click":function($event){_vm.selectMonth(index + 1);}}},[_vm._v(_vm._s(month))])}))]):_vm._e(),_vm._v(" "),(_vm.currentView === 'years')?_c('div',{staticClass:"picker-years-view"},[_c('div',{staticClass:"picker-view-years"},_vm._l((_vm.years),function(year){return _c('div',{staticClass:"year",class:{'is-selected': year === _vm.currentYear},on:{"click":function($event){_vm.selectYear(year);}}},[_vm._v(_vm._s(year))])}))]):_vm._e()])])};
var __vue_staticRenderFns__$7 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"picker-view-days"},[_c('div',{staticClass:"day"},[_vm._v("ma")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("di")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("wo")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("do")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("vr")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("za")]),_vm._v(" "),_c('div',{staticClass:"day"},[_vm._v("zo")])])}];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* component normalizer */
  function __vue_normalize__$7(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePicker.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var DatePicker = __vue_normalize__$7(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

var script$8 = {
  name: "latte-draggable",
  props: {
    options: Object,
    list: {
      type: Array,
      required: false,
      default: null
    },
    value: {
      type: Array,
      required: false,
      default: null
    },
    noTransitionOnDrag: {
      type: Boolean,
      default: false
    },
    clone: {
      type: Function,
      default: function _default(original) {
        return original;
      }
    },
    element: {
      type: String,
      default: 'div'
    },
    move: {
      type: Function,
      default: null
    }
  },
  beforeDestroy: function beforeDestroy() {
    this._sortable.destroy();
  },
  data: function data() {
    return {
      componentMode: false,
      transitionMode: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
    if (this.componentMode && this.transitionMode) throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
    var optionsAdded = {};
    eventsListened.forEach(function (elt) {
      return optionsAdded['on' + elt] = delegateAndEmit.call(_this, elt);
    });
    eventsToEmit.forEach(function (elt) {
      return optionsAdded['on' + elt] = emit.bind(_this, elt);
    });

    var options = _extends$1({}, this.options, optionsAdded, {
      onMove: function onMove(event, originalEvent) {
        return _this.onDragMove(event, originalEvent);
      }
    });

    !('draggable' in options) && (options.draggable = '>*');
    this._sortable = new Sortable(this.rootContainer, options);
    this.computeIndexes();
  },
  render: function render(createElement) {
    var slots = this.$slots.default;

    if (slots && slots.length === 1) {
      var child = slots[0];
      if (child.componentOptions && child.componentOptions.tag === 'transition-group') this.transitionMode = true;
    }

    var children = slots;
    var footer = this.$slots.footer;
    if (footer) children = slots ? [].concat(_toConsumableArray$1(slots), _toConsumableArray$1(footer)) : [].concat(_toConsumableArray$1(footer));
    return createElement(this.element, null, children);
  },
  computed: {
    rootContainer: function rootContainer() {
      return this.transitionMode ? this.$el.children[0] : this.$el;
    },
    isCloning: function isCloning() {
      return this.options && this.options.group && this.options.group['pull'] === 'clone';
    },
    realList: function realList() {
      return this.list ? this.list : this.value;
    }
  },
  methods: {
    getChildrenNodes: function getChildrenNodes() {
      if (this.componentMode) return this.$children[0].$slots.default;
      var rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    },
    computeIndexes: function computeIndexes() {
      var _this2 = this;

      this.$nextTick(function () {
        return _this2.visibleIndexes = _computeIndexes(_this2.getChildrenNodes(), _this2.rootContainer.children, _this2.transitionMode);
      });
    },
    getUnderlyingVm: function getUnderlyingVm(htmlElement) {
      var index = computeVmIndex(this.getChildrenNodes() || [], htmlElement);
      if (index === -1) return null;
      return {
        index: index,
        element: this.realList[index]
      };
    },
    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(reference) {
      var vue = reference.__vue__;
      if (!vue || !vue.$options || vue.$options._componentTag !== 'transition-group') return vue;
      return vue.$parent;
    },
    emitChanges: function emitChanges(event) {
      var _this3 = this;

      this.$nextTick(function () {
        return _this3.$emit('change', event);
      });
    },
    alterList: function alterList(onList) {
      if (this.list) {
        onList(this.list);
      } else {
        var newList = [].concat(_toConsumableArray$1(this.value));
        onList(newList);
        this.$emit('input', newList);
      }
    },
    spliceList: function spliceList() {
      var _arguments = arguments;
      this.alterList(function (list) {
        return list.splice.apply(list, _arguments);
      });
    },
    updatePosition: function updatePosition(oldIndex, newIndex) {
      this.alterList(function (list) {
        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      });
    },
    getRelatedContextFromMoveElement: function getRelatedContextFromMoveElement(reference) {
      var to = reference.to,
          related = reference.related;
      var component = this.getUnderlyingPotencialDraggableComponent(reference);
      if (!component) return {
        component: component
      };
      var list = component.realList;
      var context = {
        list: list,
        component: component
      };

      if (to !== related && list && component.getUnderlyingVm) {
        var destination = component.getUnderlyingVm(related);
        if (destination) return _extends$1(destination, context);
      }

      return context;
    },
    getVmIndex: function getVmIndex(domIndex) {
      var indexes = this.visibleIndexes;
      var numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent: function getComponent() {
      return this.$slots.default[0].componentInstance;
    },
    resetTransitionData: function resetTransitionData(index) {
      if (!this.noTransitionOnDrag || !this.transitionMode) return;
      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      var transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    },
    onDragStart: function onDragStart(event) {
      this.context = this.getUnderlyingVm(event.item);
      event.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = event.item;
      this.$el.classList.add('is-dragging');
    },
    onDragAdd: function onDragAdd(event) {
      var element = event.item._underlying_vm_;
      if (element === undefined) return;
      removeNode(event.item);
      var newIndex = this.getVmIndex(event.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      this.emitChanges({
        added: {
          element: element,
          newIndex: newIndex
        }
      });
    },
    onDragRemove: function onDragRemove(event) {
      insertNodeAt(this.rootContainer, event.item, event.oldIndex);

      if (this.isCloning) {
        removeNode(event.clone);
        return;
      }

      var oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      this.resetTransitionData(oldIndex);
      this.emitChanges({
        removed: {
          element: this.context.element,
          oldIndex: oldIndex
        }
      });
    },
    onDragUpdate: function onDragUpdate(event) {
      removeNode(event.item);
      insertNodeAt(event.from, event.item, event.oldIndex);
      var oldIndex = this.context.index;
      var newIndex = this.getVmIndex(event.newIndex);
      this.updatePosition(oldIndex, newIndex);
      this.emitChanges({
        moved: {
          element: this.context.element,
          oldIndex: oldIndex,
          newIndex: newIndex
        }
      });
    },
    computeFutureIndex: function computeFutureIndex(relatedContext, event) {
      if (!relatedContext.element) return 0;
      var domChildren = [].concat(_toConsumableArray$1(event.to.children)).filter(function (el) {
        return el.style['display'] !== 'none';
      });
      var currentDomIndex = domChildren.indexOf(event.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDomIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !event['willInsertAfter'] ? currentIndex : currentIndex + 1;
    },
    onDragMove: function onDragMove(event, originalEvent) {
      var onMove = this.move;
      if (!onMove || !this.realList) return true;
      var relatedContext = this.getRelatedContextFromMoveElement(event);
      var draggedContext = this.context;
      var futureIndex = this.computeFutureIndex(relatedContext, event);

      _extends$1(draggedContext, {
        futureIndex: futureIndex
      });

      _extends$1(event, {
        relatedContext: relatedContext,
        draggedContext: draggedContext
      });

      return onMove(event, originalEvent);
    },
    onDragEnd: function onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
      this.$el.classList.remove('is-dragging');
    }
  },
  watch: {
    options: {
      deep: true,
      handler: function handler(newOptionValue) {
        for (var property in newOptionValue) {
          if (newOptionValue.hasOwnProperty(property)) if (readonlyProperties.indexOf(property) === -1) this._sortable.option(property, newOptionValue[property]);
        }
      }
    },
    realList: function realList() {
      this.computeIndexes();
    }
  }
};
var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (event) {
  return 'on' + event;
});
var draggingElement = null;

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (source.hasOwnProperty(key)) target[key] = source[key];
    }
  }

  return target;
};

var _toConsumableArray$1 = function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    var arr2 = Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};

Array.from = Array.from || function (object) {
  return [].slice.call(object);
};

function removeNode(node) {
  node.parentElement.removeChild(node);
}

function insertNodeAt(parentNode, node, position) {
  var refNode = position === 0 ? parentNode.children[0] : parentNode.children[position - 1].nextSibling;
  parentNode.insertBefore(node, refNode);
}

function computeVmIndex(vnodes, element) {
  return vnodes.map(function (elt) {
    return elt.elm;
  }).indexOf(element);
}

function _computeIndexes(slots, children, isTransition) {
  if (!slots) return [];
  var elmFromNodes = slots.map(function (elt) {
    return elt.elm;
  });
  var rawIndexes = [].concat(_toConsumableArray$1(children)).map(function (elt) {
    return elmFromNodes.indexOf(elt);
  });
  return isTransition ? rawIndexes.filter(function (ind) {
    return ind !== -1;
  }) : rawIndexes;
}

function emit(eventName, eventData) {
  var _this4 = this;

  this.$nextTick(function () {
    return _this4.$emit(eventName.toLowerCase(), eventData);
  });
}

function delegateAndEmit(eventName) {
  var that = this;
  return function (eventData) {
    if (that.realList !== null) that['onDrag' + eventName](eventData);
    emit.call(that, eventName, eventData);
  };
}

/* script */
            const __vue_script__$8 = script$8;
            
/* template */

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = undefined;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Draggable.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Draggable = __vue_normalize__$8(
    {},
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

var eventBus = new Vue({});
function bottom(layout) {
  var max = 0,
      bottomY;

  for (var i = 0, len = layout.length; i < len; i++) {
    bottomY = layout[i].y + layout[i].height;
    if (bottomY > max) max = bottomY;
  }

  return max;
}
function collides(item1, item2) {
  if (item1 === item2) return false;
  if (item1.x + item1.width <= item2.x) return false;
  if (item1.x >= item2.x + item2.width) return false;
  if (item1.y + item1.height <= item2.y) return false;
  if (item1.y >= item2.y + item2.height) return false; // Yay!

  return true;
}
function compact(layout, verticalCompact) {
  var compareWith = getStatics(layout);
  var sorted = sortLayoutItemsByRowCol(layout);
  var out = Array(layout.length);

  for (var i = 0, len = sorted.length; i < len; i++) {
    var item = sorted[i];

    if (!item.static) {
      item = compactItem(compareWith, item, verticalCompact);
      compareWith.push(item);
    }

    out[layout.indexOf(item)] = item;
    item.moved = false;
  }

  return out;
}
function compactItem(compareWith, item, verticalCompact) {
  if (verticalCompact) while (item.y > 0 && !getFirstCollision(compareWith, item)) {
    item.y--;
  }
  var collides;

  while (collides = getFirstCollision(compareWith, item)) {
    item.y = collides.y + collides.height;
  }

  return item;
}
function createCoreData(lastX, lastY, x, y) {
  var isStart = !isNum(lastX);

  if (isStart) {
    return {
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x: x,
      y: y
    };
  } else {
    return {
      deltaX: x - lastX,
      deltaY: y - lastY,
      lastX: lastX,
      lastY: lastY,
      x: x,
      y: y
    };
  }
}
function getAllCollisions(layout, layoutItem) {
  return layout.filter(function (l) {
    return collides(l, layoutItem);
  });
}
function getControlPosition(evt) {
  return offsetXYFromParentOf(evt);
}
function getFirstCollision(layout, layoutItem) {
  for (var i = 0, len = layout.length; i < len; i++) {
    if (collides(layout[i], layoutItem)) return layout[i];
  }
}
function getLayoutItem(layout, id) {
  for (var i = 0, len = layout.length; i < len; i++) {
    if (layout[i].i === id) return layout[i];
  }
}
function getStatics(layout) {
  return layout.filter(function (l) {
    return l.static;
  });
}
function isNum(num) {
  return typeof num === "number" && !isNaN(num);
}
function moveElement(layout, item, x, y, isUserAction) {
  if (item.static) return layout;
  if (item.y === y && item.x === x) return layout;
  var movingUp = y && item.y > y;
  if (typeof x === "number") item.x = x;
  if (typeof y === "number") item.y = y;
  item.moved = true;
  var sorted = sortLayoutItemsByRowCol(layout);
  if (movingUp) sorted = sorted.reverse();
  var collisions = getAllCollisions(sorted, item);

  for (var i = 0, len = collisions.length; i < len; i++) {
    var collision = collisions[i];
    if (collision.moved) continue;
    if (item.y > collision.y && item.y - collision.y > collision.height / 4) continue;
    if (collision.static) layout = moveElementAwayFromCollision(layout, collision, item, isUserAction);else layout = moveElementAwayFromCollision(layout, item, collision, isUserAction);
  }

  return layout;
}
function moveElementAwayFromCollision(layout, collidesWith, itemToMove, isUserAction) {
  if (isUserAction) {
    var fakeItem = {
      x: itemToMove.x,
      y: itemToMove.y,
      width: itemToMove.width,
      height: itemToMove.height,
      id: "__fake__"
    };
    fakeItem.y = Math.max(collidesWith.y - itemToMove.height, 0);
    if (!getFirstCollision(layout, fakeItem)) return moveElement(layout, itemToMove, undefined, fakeItem.y);
  }

  return moveElement(layout, itemToMove, undefined, itemToMove.y + 1);
}
function offsetXYFromParentOf(evt) {
  var offsetParent = evt.target.offsetParent || document.body;
  var offsetParentRect = evt.offsetParent === document.body ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;
  return {
    x: x,
    y: y
  };
}
function setTransform(top, left, width, height) {
  var translate = "translate3d(".concat(left, "px,").concat(top, "px, 0)");
  return {
    transform: translate,
    WebkitTransform: translate,
    MozTransform: translate,
    msTransform: translate,
    OTransform: translate,
    width: width + "px",
    height: height + "px",
    position: "absolute"
  };
}
function sortLayoutItemsByRowCol(layout) {
  return [].concat(layout).sort(function (a, b) {
    return a.y > b.y || a.y === b.y && a.x > b.x ? 1 : -1;
  });
}
function validateLayout(layout) {
  var contextName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Layout";
  var subProps = ["x", "y", "width", "height"];
  if (!Array.isArray(layout)) throw new Error("".concat(contextName, " must be an array!"));

  for (var i = 0, len = layout.length; i < len; i++) {
    var item = layout[i];

    for (var j = 0; j < subProps.length; j++) {
      if (typeof item[subProps[j]] !== "number") throw new Error("Latte Grid: ".concat(contextName, "[").concat(i, "].").concat(subProps[j], " must be a number!"));
    }

    if (item.i && typeof item.i !== "string") throw new Error("Latte Grid: ".concat(contextName, "[").concat(i, "].i must be a string!"));
    if (item.static !== undefined && typeof item.static !== "boolean") throw new Error("Latte Grid: ".concat(contextName, "[").concat(i, "].static must be a boolean!"));
  }
}

//
var script$9 = {
  name: "latte-grid",
  props: {
    autoSize: {
      default: true,
      required: false,
      type: Boolean
    },
    columns: {
      default: 12,
      required: false,
      type: Number
    },
    rowHeight: {
      default: 100,
      required: false,
      type: Number
    },
    maxRows: {
      default: Infinity,
      required: false,
      type: Number
    },
    margin: {
      default: function _default() {
        return [24, 24];
      },
      required: false,
      type: Array
    },
    isDraggable: {
      default: true,
      required: false,
      type: Boolean
    },
    isResizable: {
      default: true,
      required: false,
      type: Boolean
    },
    verticalCompact: {
      default: true,
      required: false,
      type: Boolean
    },
    layout: {
      required: true,
      type: Array
    }
  },
  beforeDestroy: function beforeDestroy() {
    eventBus.$off("dragEvent", this.dragEventHandler);
    eventBus.$off("resizeEvent", this.resizeEventHandler);
    window.removeEventListener("resize", this.onWindowResize);
  },
  created: function created() {
    var $this = this;

    this.dragEventHandler = function (eventType, id, x, y, height, width) {
      $this.dragEvent(eventType, id, x, y, height, width);
    };

    this.resizeEventHandler = function (eventType, id, x, y, height, width) {
      $this.resizeEvent(eventType, id, x, y, height, width);
    };

    eventBus.$on("dragEvent", this.dragEventHandler);
    eventBus.$on("resizeEvent", this.resizeEventHandler);
  },
  data: function data() {
    return {
      width: null,
      mergedStyle: {},
      lastLayoutLength: 0,
      isDragging: false,
      placeholder: {
        x: 0,
        y: 0,
        height: 0,
        width: 0
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    var $this = this;
    this.$nextTick(function () {
      validateLayout(_this.layout);

      var init = function init() {
        if (_this.width === null) {
          _this.onWindowResize();

          window.addEventListener("resize", _this.onWindowResize);
        }

        compact(_this.layout, _this.verticalCompact);

        _this.updateHeight();

        _this.$nextTick(function () {
          elementResizeDetectorMaker({
            strategy: "scroll"
          }).listenTo(_this.$refs.grid, function () {
            $this.onWindowResize();
          });
        });
      };

      _this.$nextTick(function () {
        return init();
      });

      window.onload = init.bind(_this);
    });
  },
  computed: {
    is_dragging: function is_dragging() {
      return this.isDragging;
    },
    styles: function styles() {
      return this.mergedStyle;
    }
  },
  methods: {
    containerHeight: function containerHeight() {
      if (!this.autoSize) return;
      return "".concat(bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1], "px");
    },
    dragEvent: function dragEvent(eventType, id, x, y, height, width) {
      var _this2 = this;

      if (eventType === "dragmove" || eventType === "dragstart") {
        this.placeholder.x = x;
        this.placeholder.y = y;
        this.placeholder.height = height;
        this.placeholder.width = width;
        this.$nextTick(function () {
          return _this2.isDragging = true;
        });
        eventBus.$emit("updateWidth", this.width);
      } else {
        this.$nextTick(function () {
          return _this2.isDragging = false;
        });
      }

      var item = getLayoutItem(this.layout, id);
      if (item === undefined || item === null) item = {
        x: 0,
        y: 0
      };
      item.x = x;
      item.y = y;
      this.layout = moveElement(this.layout, item, x, y, true);
      compact(this.layout, this.verticalCompact);
      eventBus.$emit("compact");
      this.updateHeight();
      if (eventType === "dragend") this.$emit("layout-updated", this.layout);
    },
    layoutUpdate: function layoutUpdate() {
      if (typeof this.layout === "undefined") return;
      if (this.layout.length !== this.lastLayoutLength) this.lastLayoutLength = this.layout.length;
      compact(this.layout, this.verticalCompact);
      eventBus.$emit("updateWidth", this.width);
      this.updateHeight();
    },
    onWindowResize: function onWindowResize() {
      if (typeof this.$refs.grid === "undefined") return;
      this.width = this.$refs["grid"].offsetWidth;
    },
    resizeEvent: function resizeEvent(eventType, id, x, y, height, width) {
      var _this3 = this;

      if (eventType === "resizestart" || eventType === "resizemove") {
        this.placeholder.x = x;
        this.placeholder.y = y;
        this.placeholder.height = height;
        this.placeholder.width = width;
        this.$nextTick(function () {
          return _this3.isDragging = true;
        });
        eventBus.$emit("updateWidth", this.width);
      } else {
        this.$nextTick(function () {
          return _this3.isDragging = false;
        });
      }

      var item = getLayoutItem(this.layout, id);
      if (item === undefined || item === null) item = {
        height: 0,
        width: 0
      };
      item.height = height;
      item.width = width;
      compact(this.layout, this.verticalCompact);
      eventBus.$emit("compact");
      this.updateHeight();
      if (eventType === "resizeend") this.$emit("layout-updated", this.layout);
    },
    updateHeight: function updateHeight() {
      this.mergedStyle = {
        height: this.containerHeight()
      };
    }
  },
  watch: {
    columns: function columns() {
      eventBus.$emit("setColumns", this.columns);
    },
    isDraggable: function isDraggable() {
      eventBus.$emit("setDraggable", this.isDraggable);
    },
    isResizable: function isResizable() {
      eventBus.$emit("setResizable", this.isResizable);
    },
    layout: function layout() {
      this.layoutUpdate();
    },
    rowHeight: function rowHeight() {
      eventBus.$emit("setRowHeight", this.rowHeight);
    },
    width: function width() {
      var _this4 = this;

      this.$nextTick(function () {
        eventBus.$emit("updateWidth", _this4.width);

        _this4.updateHeight();
      });
    }
  }
};

/* script */
            const __vue_script__$9 = script$9;
            
/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"grid",staticClass:"latte-grid",class:{'is-dragging': _vm.is_dragging},style:(_vm.styles),attrs:{"role":"grid"}},[_vm._t("default"),_vm._v(" "),_c('latte-grid-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.isDragging),expression:"isDragging"}],staticClass:"latte-grid-placeholder",attrs:{"x":_vm.placeholder.x,"y":_vm.placeholder.y,"height":_vm.placeholder.height,"width":_vm.placeholder.width,"id":"__placeholder__"}})],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* component normalizer */
  function __vue_normalize__$9(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Grid.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Grid = __vue_normalize__$9(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

//
var script$a = {
  name: "latte-grid-item",
  props: {
    id: {
      required: true
    },
    isDraggable: {
      default: true,
      required: false,
      type: Boolean
    },
    isResizable: {
      default: true,
      required: false,
      type: Boolean
    },
    maxHeight: {
      default: Infinity,
      required: false,
      type: Number
    },
    maxWidth: {
      default: Infinity,
      required: false,
      type: Number
    },
    minHeight: {
      default: 1,
      required: false,
      type: Number
    },
    minWidth: {
      default: 1,
      required: false,
      type: Number
    },
    x: {
      required: true,
      type: Number
    },
    y: {
      required: true,
      type: Number
    },
    height: {
      required: true,
      type: Number
    },
    width: {
      required: true,
      type: Number
    },
    dragIgnoreFrom: {
      default: null,
      required: false,
      type: String | null
    },
    dragAllowFrom: {
      default: ".grid-item-drag-handle",
      required: false,
      type: String | null
    },
    resizeIgnoreFrom: {
      default: null,
      required: false,
      type: String | null
    },
    resizeAllowFrom: {
      default: ".grid-item-resize-handle",
      required: false,
      type: String | null
    }
  },
  beforeDestroy: function beforeDestroy() {
    eventBus.$off("updateWidth", this.updateWidthHandler);
    eventBus.$off("compact", this.compactHandler);
    eventBus.$off("setDraggable", this.setDraggableHandler);
    eventBus.$off("setResizable", this.setResizableHandler);
    eventBus.$off("setRowHeight", this.setRowHeightHandler);
    eventBus.$off("setColumns", this.setColumns);
  },
  created: function created() {
    var $this = this;

    this.updateWidthHandler = function (width) {
      $this.updateWidth(width);
    };

    this.compactHandler = function (layout) {
      $this.compact(layout);
    };

    this.setDraggableHandler = function (isDraggable) {
      $this.draggable = isDraggable;
    };

    this.setResizableHandler = function (isResizable) {
      $this.resizable = isResizable;
    };

    this.setRowHeightHandler = function (rowHeight) {
      $this.rowHeight = rowHeight;
    };

    this.setColumns = function (colNum) {
      $this.columns = parseInt(colNum);
    };

    eventBus.$on("updateWidth", this.updateWidthHandler);
    eventBus.$on("compact", this.compactHandler);
    eventBus.$on("setDraggable", this.setDraggableHandler);
    eventBus.$on("setResizable", this.setResizableHandler);
    eventBus.$on("setRowHeight", this.setRowHeightHandler);
    eventBus.$on("setColumns", this.setColumns);
  },
  data: function data() {
    return {
      columns: 1,
      containerWidth: 100,
      rowHeight: 100,
      margin: [24, 24],
      maxRows: Infinity,
      draggable: null,
      resizable: null,
      dragging: null,
      resizing: null,
      lastX: NaN,
      lastY: NaN,
      lastHeight: NaN,
      lastWidth: NaN,
      isDragEventSet: false,
      isResizeEventSet: false,
      previousX: null,
      previousY: null,
      previousHeight: null,
      previousWidth: null,
      innerX: this.x,
      innerY: this.y,
      innerHeight: this.height,
      innerWidth: this.width,
      style: {}
    };
  },
  mounted: function mounted() {
    this.columns = this.$parent.columns;
    this.rowHeight = this.$parent.rowHeight;
    this.containerWidth = this.$parent.width !== null ? this.$parent.width : 100;
    this.margin = this.$parent.margin !== undefined ? this.$parent.margin : [24, 24];
    this.maxRows = this.$parent.maxRows;
    if (this.isDraggable === null) this.draggable = this.$parent.isDraggable;else this.draggable = this.isDraggable;
    if (this.isResizable === null) this.resizable = this.$parent.isResizable;else this.resizable = this.isResizable;
    this.createStyle();
  },
  computed: {
    is_dragging: function is_dragging() {
      return this.dragging !== null;
    },
    is_resizing: function is_resizing() {
      return this.resizing !== null;
    },
    resize_handle_class: function resize_handle_class() {
      return "grid-item-resize-handle";
    }
  },
  methods: {
    calculateColumnWidth: function calculateColumnWidth() {
      return (this.containerWidth - this.margin[0] * (this.columns + 1)) / this.columns;
    },
    calculatePosition: function calculatePosition(x, y, width, height) {
      var columnWidth = this.calculateColumnWidth();
      return {
        top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
        left: Math.round(columnWidth * x + (x + 1) * this.margin[0]),
        height: height === Infinity ? height : Math.round(this.rowHeight * height + Math.max(0, height - 1) * this.margin[1]),
        width: width === Infinity ? width : Math.round(columnWidth * width + Math.max(0, width - 1) * this.margin[0])
      };
    },
    calculateWidthHeight: function calculateWidthHeight(height, width) {
      var columnWidth = this.calculateColumnWidth();
      var w = Math.round((width + this.margin[0]) / (columnWidth + this.margin[0]));
      var h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));
      return {
        width: Math.max(Math.min(w, this.columns - this.innerX), 0),
        height: Math.max(Math.min(h, this.maxRows - this.innerY), 0)
      };
    },
    calculateXY: function calculateXY(top, left) {
      var columnWidth = this.calculateColumnWidth();
      var x = Math.round((left - this.margin[0]) / (columnWidth + this.margin[0]));
      var y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1]));
      x = Math.max(Math.min(x, this.columns - this.innerWidth), 0);
      y = Math.max(Math.min(y, this.maxRows - this.innerHeight), 0);
      return {
        x: x,
        y: y
      };
    },
    compact: function compact$$1() {
      this.createStyle();
    },
    createStyle: function createStyle() {
      if (this.x + this.width > this.columns) {
        this.innerX = 0;
        this.innerWidth = this.width > this.columns ? this.columns : this.width;
      } else {
        this.innerX = this.x;
        this.innerWidth = this.width;
      }

      var pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

      if (this.is_dragging) {
        pos.top = this.dragging.top;
        pos.left = this.dragging.left;
      }

      if (this.is_resizing) {
        pos.height = this.resizing.height;
        pos.width = this.resizing.width;
      }

      this.style = setTransform(pos.top, pos.left, pos.width, pos.height);
    },
    handleDrag: function handleDrag(evt) {
      if (this.is_resizing) return;
      var position = getControlPosition(evt);
      var x = position.x,
          y = position.y;
      var newPosition = {
        top: 0,
        left: 0
      };
      var parentRect;
      var clientRect;

      switch (evt.type) {
        case "dragstart":
          {
            this.previousX = this.innerX;
            this.previousY = this.innerY;
            parentRect = evt.target.offsetParent.getBoundingClientRect();
            clientRect = evt.target.getBoundingClientRect();
            newPosition.left = clientRect.left - parentRect.left;
            newPosition.top = clientRect.top - parentRect.top;
            this.dragging = newPosition;
            break;
          }

        case "dragend":
          {
            if (!this.is_dragging) return;
            parentRect = evt.target.offsetParent.getBoundingClientRect();
            clientRect = evt.target.getBoundingClientRect();
            newPosition.left = clientRect.left - parentRect.left;
            newPosition.top = clientRect.top - parentRect.top;
            this.dragging = null;
            break;
          }

        case "dragmove":
          {
            var coreEvent = createCoreData(this.lastX, this.lastY, x, y);
            newPosition.left = this.dragging.left + coreEvent.deltaX;
            newPosition.top = this.dragging.top + coreEvent.deltaY;
            this.dragging = newPosition;
            break;
          }
      }

      var pos = this.calculateXY(newPosition.top, newPosition.left);
      this.lastX = x;
      this.lastY = y;
      if (this.innerX !== pos.x || this.innerY !== pos.y) this.$emit("move", this.id, pos.x, pos.y);
      if (evt.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY)) this.$emit("moved", this.id, pos.x, pos.y);
      eventBus.$emit("dragEvent", evt.type, this.id, pos.x, pos.y, this.innerHeight, this.innerWidth);
    },
    handleResize: function handleResize(evt) {
      var position = getControlPosition(evt);
      var x = position.x,
          y = position.y;
      var newSize = {
        width: 0,
        height: 0
      };

      switch (evt.type) {
        case "resizestart":
          {
            this.previousHeight = this.innerHeight;
            this.previousWidth = this.innerWidth;

            var _pos = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

            newSize.height = _pos.height;
            newSize.width = _pos.width;
            this.resizing = newSize;
            break;
          }

        case "resizemove":
          {
            var coreEvent = createCoreData(this.lastWidth, this.lastHeight, x, y);
            newSize.height = this.resizing.height + coreEvent.deltaY;
            newSize.width = this.resizing.width + coreEvent.deltaX;
            this.resizing = newSize;
            break;
          }

        case "resizeend":
          {
            var _pos2 = this.calculatePosition(this.innerX, this.innerY, this.innerWidth, this.innerHeight);

            newSize.height = _pos2.height;
            newSize.width = _pos2.width;
            this.resizing = null;
            break;
          }
      }

      var pos = this.calculateWidthHeight(newSize.height, newSize.width);
      if (pos.width < this.minWidth) pos.width = this.minWidth;
      if (pos.width > this.maxWidth) pos.width = this.maxWidth;
      if (pos.height < this.minHeight) pos.height = this.minHeight;
      if (pos.height > this.maxHeight) pos.height = this.maxHeight;
      if (pos.height < 1) pos.height = 1;
      if (pos.width < 1) pos.width = 1;
      this.lastHeight = y;
      this.lastWidth = x;
      if (this.innerWidth !== pos.width || this.innerHeight !== pos.height) this.$emit("resize", this.id, pos.height, pos.width);
      if (event.type === "resizeend" && (this.previousWidth !== this.innerWidth || this.previousHeight !== this.innerHeight)) this.$emit("resized", this.id, newSize.height, newSize.width);
      eventBus.$emit("resizeEvent", event.type, this.id, this.innerX, this.innerY, pos.height, pos.width);
    },
    updateWidth: function updateWidth(width, column) {
      this.containerWidth = width;
      if (typeof column !== "undefined") this.column = column;
    }
  },
  watch: {
    columns: function columns() {
      this.createStyle();
    },
    containerWidth: function containerWidth() {
      this.createStyle();
    },
    draggable: function draggable() {
      var _this = this;

      if (typeof this.interact === "undefined" || this.interact === null) this.interact = interact(this.$refs.item);

      if (this.draggable) {
        this.interact.draggable({
          allowFrom: this.dragAllowFrom,
          ignoreFrom: this.dragIgnoreFrom
        });

        if (!this.isDragEventSet) {
          this.isDragEventSet = true;
          this.interact.on("dragstart dragmove dragend", function (evt) {
            return _this.handleDrag(evt);
          });
        }
      } else {
        this.interact.draggable({
          enabled: false
        });
      }
    },
    height: function height() {
      this.innerHeight = this.height;
      this.createStyle();
    },
    isDraggable: function isDraggable() {
      this.draggable = this.isDraggable;
    },
    isResizable: function isResizable() {
      this.resizable = this.isResizable;
    },
    resizable: function resizable() {
      var _this2 = this;

      if (typeof this.interact === "undefined" || this.interact === null) this.interact = interact(this.$refs.item);

      if (this.resizable) {
        this.interact.resizable({
          preserveAspectRatio: false,
          edges: {
            top: false,
            left: false,
            right: ".".concat(this.resize_handle_class),
            bottom: ".".concat(this.resize_handle_class)
          },
          ignoreFrom: this.resizeIgnoreFrom
        });

        if (!this.isResizeEventSet) {
          this.isResizeEventSet = true;
          this.interact.on("resizestart resizemove resizeend", function (evt) {
            return _this2.handleResize(evt);
          });
        }
      } else {
        this.interact.resizable({
          enabled: false
        });
      }
    },
    rowHeight: function rowHeight() {
      this.createStyle();
    },
    width: function width() {
      this.innerWidth = this.width;
      this.createStyle();
    },
    x: function x() {
      this.innerX = this.x;
      this.createStyle();
    },
    y: function y() {
      this.innerY = this.y;
      this.createStyle();
    }
  }
};

/* script */
            const __vue_script__$a = script$a;
            
/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"item",staticClass:"latte-grid-item",class:{'is-draggable': _vm.isDraggable, 'is-dragging': _vm.is_dragging, 'is-resizable': _vm.isResizable, 'is-resizing': _vm.is_resizing},style:(_vm.style),attrs:{"role":"gridcell"}},[_vm._t("default"),_vm._v(" "),(_vm.resizable)?_c('div',{staticClass:"grid-item-resize-handle"}):_vm._e()],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* component normalizer */
  function __vue_normalize__$a(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "GridItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var GridItem = __vue_normalize__$a(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$b = {
  name: "latte-json-editor",
  props: {
    json: {
      required: true
    }
  },
  created: function created() {
    this.parsedData = this.jsonParse(this.json);
  },
  data: function data() {
    return {
      parsedData: []
    };
  },
  methods: {
    getType: function getType(obj) {
      if (obj === null) return "null";

      switch (Object.prototype.toString.call(obj)) {
        case "[object Array]":
          return "array";

        case "[object Object]":
          return "object";

        default:
          return _typeof(obj);
      }
    },
    jsonParse: function jsonParse(jsonString) {
      var _this = this;

      var parseJson = function parseJson(json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
          var val = json[key];
          var parsedVal = val;

          if (_this.getType(val) === 'object') {
            parsedVal = parseJson(val);
          } else if (_this.getType(val) === 'array') {
            parsedVal = parseArray(val);
          }

          var opt = {
            name: key,
            type: _this.getType(val)
          };

          if (opt.type === 'array' || opt.type === 'object') {
            opt.childParams = parsedVal;
            opt.remark = null;
          } else {
            opt.childParams = null;
            opt.remark = parsedVal;
          }

          result.push(opt);
        });
        return result;
      };

      var parseArray = function parseArray(json) {
        var result = [];

        for (var i = 0; i < json.length; ++i) {
          var val = json[i];
          var parsedVal = val;

          if (_this.getType(val) === 'object') {
            parsedVal = parseJson(val);
          } else if (_this.getType(val) === 'array') {
            parsedVal = parseArray(val);
          }

          var opt = {
            name: null,
            type: _this.getType(val)
          };

          if (opt.type === 'array' || opt.type === 'object') {
            opt.childParams = parsedVal;
            opt.remark = null;
          } else {
            opt.childParams = null;
            opt.remark = parsedVal;
          }

          result.push(opt);
        }

        return result;
      };

      var parseBody = function parseBody(json) {
        return parseJson(json);
      };

      return parseBody(jsonString);
    },
    makeJson: function makeJson(dataArray) {
      var revertWithObject = function revertWithObject(data) {
        var r = {};

        for (var i = 0; i < data.length; ++i) {
          var el = data[i];
          var key = el.name,
              value = void 0;

          if (el.type === 'array') {
            value = revertWithArray(el.childParams);
          } else if (el.type === 'object') {
            value = revertWithObject(el.childParams);
          } else {
            value = el.remark;
          }

          r[key] = value;
        }

        return r;
      };

      var revertWithArray = function revertWithArray(data) {
        var array = [];

        for (var i = 0; i < data.length; ++i) {
          var el = data[i];
          var r = void 0;

          if (el.type === 'array') {
            r = revertWithArray(el.childParams);
          } else if (el.type === 'object') {
            r = revertWithObject(el.childParams);
          } else {
            r = el.remark;
          }

          array.push(r);
        }

        return array;
      };

      return revertWithObject(dataArray);
    }
  },
  watch: {
    parsedData: {
      deep: true,
      handler: function handler() {
        this.$emit("input", this.makeJson(this.parsedData));
      }
    }
  }
};

/* script */
            const __vue_script__$b = script$b;
            
/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('latte-json-editor-view',{attrs:{"parsedData":_vm.parsedData},model:{value:(_vm.parsedData),callback:function ($$v) {_vm.parsedData=$$v;},expression:"parsedData"}})};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* component normalizer */
  function __vue_normalize__$b(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "JsonEditor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var JsonEditor = __vue_normalize__$b(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$c = {
  name: "latte-json-editor-iaf",
  props: {
    needName: {
      default: true
    }
  },
  data: function data() {
    return {
      formats: ["string", "array", "object", "number", "boolean", "null"],
      formatSelected: "string",
      keyName: "",
      valueName: ""
    };
  },
  methods: {
    confirm: function confirm() {
      var value = null;
      if (this.formatSelected === "array") value = [];else if (this.formatSelected === "null") value = null;else if (this.formatSelected === "object") value = [];else value = this.valueName;
      var objectData = {
        key: this.needName ? this.keyName : null,
        value: value,
        type: this.formatSelected
      };
      this.$emit("confirm", objectData);
      this.keyName = "";
      this.valueName = "";
      this.formatSelected = "string";
    },
    cancel: function cancel() {
      this.$emit("cancel");
    },
    dealBoolean: function dealBoolean() {
      this.valueName = Boolean(this.valueName);
    },
    dealNumber: function dealNumber() {
      this.valueName = Number(this.valueName);
    }
  }
};

/* script */
            const __vue_script__$c = script$c;
            
/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-iaf"},[(_vm.needName)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.keyName),expression:"keyName"}],staticClass:"form-control",attrs:{"id":"iaf-key","type":"text","placeholder":"Key"},domProps:{"value":(_vm.keyName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.keyName=$event.target.value;}}}):_vm._e(),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.formatSelected),expression:"formatSelected"}],staticClass:"custom-select ml-3",attrs:{"id":"iaf-type"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.formatSelected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.formats),function(item,index){return _c('option',{key:index,domProps:{"value":item}},[_vm._v(_vm._s(item))])})),_vm._v(" "),(_vm.formatSelected !== 'array' && _vm.formatSelected !== 'object' && _vm.formatSelected !== 'null')?[(_vm.formatSelected === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"form-control ml-3",attrs:{"id":'iaf-value',"type":"text","placeholder":"Value"},domProps:{"value":(_vm.valueName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.valueName=$event.target.value;}}}):_vm._e(),_vm._v(" "),(_vm.formatSelected === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"form-control ml-3",attrs:{"id":'iaf-value',"type":"number","placeholder":"Value"},domProps:{"value":(_vm.valueName)},on:{"change":_vm.dealNumber,"input":function($event){if($event.target.composing){ return; }_vm.valueName=$event.target.value;}}}):_vm._e(),_vm._v(" "),(_vm.formatSelected === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"custom-select ml-3",attrs:{"id":'iaf-value'},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.valueName=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.dealBoolean]}},[_c('option',{attrs:{"value":"true","selected":""}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{attrs:{"value":"true"}},[_vm._v("FALSE")])]):_vm._e()]:_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-primary ml-3",on:{"click":_vm.confirm}},[_c('i',{staticClass:"mdi mdi-check-circle"})]),_vm._v(" "),_c('button',{staticClass:"btn btn-light ml-1",on:{"click":_vm.cancel}},[_c('i',{staticClass:"mdi mdi-close-circle"})])],2)};
var __vue_staticRenderFns__$b = [];

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* component normalizer */
  function __vue_normalize__$c(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "JsonEditorIaf.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var JsonEditorIaf = __vue_normalize__$c(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$d = {
  name: "latte-json-editor-view",
  props: {
    parsedData: {
      required: true
    }
  },
  created: function created() {
    this.flowData = this.parsedData;
  },
  data: function data() {
    return {
      flowData: [],
      hideMyBlock: {},
      isAddingItem: false
    };
  },
  mounted: function mounted() {
    for (var index in this.flowData) {
      if (this.flowData.hasOwnProperty(index)) this.$set(this.hideMyBlock, index, true);
    }
  },
  methods: {
    key: function key(item) {
      return JSON.stringify(item);
    },
    deleteItem: function deleteItem(parentDOM, item, index) {
      this.flowData.splice(index, 1);
      this.$emit("input", this.flowData);
    },
    toggleBlock: function toggleBlock(index) {
      this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
    },
    addItem: function addItem() {
      if (this.isAddingItem) return;
      this.isAddingItem = true;
    },
    cancelNewItem: function cancelNewItem() {
      if (!this.isAddingItem) return;
      this.isAddingItem = false;
    },
    newItem: function newItem(obj) {
      var oj = {
        name: obj.key,
        type: obj.type
      };

      if (obj.type === "array" || obj.type === "object") {
        oj.childParams = obj.value;
        oj.remark = null;
      } else {
        oj.childParams = null;
        oj.remark = obj.value;
      }

      if (!oj.name) {
        Latte.messages.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
        return;
      }

      this.flowData.push(oj);
      this.$emit("input", this.flowData);
      this.cancelNewItem();
    },
    keyInputBlur: function keyInputBlur(item, e) {
      if (item.name.length <= 0) {
        Latte.messages.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
        item.name = "null";
        e.target.focus();
      }
    }
  }
};

/* script */
            const __vue_script__$d = script$d;
            
/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-view"},[_vm._l((_vm.flowData),function(item,index){return _c('div',{key:_vm.key(item),staticClass:"json-editor json-editor-block",class:[item.type, {'hide-block': _vm.hideMyBlock[index]}]},[_c('div',{staticClass:"key"},[(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-light toggle",on:{"click":function($event){_vm.toggleBlock(index);}}},[_c('i',{class:['mdi', {'mdi-chevron-down': !_vm.hideMyBlock[index]}, {'mdi-chevron-right': _vm.hideMyBlock[index]}]})]):_vm._e(),_vm._v(" "),(typeof item.name === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.name),expression:"item.name"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.name)},on:{"blur":function($event){_vm.keyInputBlur(item, $event);},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "name", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'array')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("[" + item.childParams.length + "]"))]):_vm._e(),_vm._v(" "),(item.type === 'object')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("{" + (item.childParams.length || 0) + "}"))]):_vm._e(),_vm._v(" "),(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-light trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"value"},[(item.type === 'object')?[_c('latte-json-editor-view',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:(item.type === 'array')?[_c('latte-json-editor-view-array',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:[(item.type === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.remark),expression:"item.remark",modifiers:{"number":true}}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", _vm._n($event.target.value));},"blur":function($event){_vm.$forceUpdate();}}}):_vm._e(),_vm._v(" "),(item.type === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"custom-select",attrs:{"name":"value"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(item, "remark", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},[_c('option',{domProps:{"value":true}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{domProps:{"value":false}},[_vm._v("FALSE")])]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-light trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})])]],2)])}),_vm._v(" "),(_vm.isAddingItem)?_c('latte-json-editor-iaf',{on:{"confirm":_vm.newItem,"cancel":_vm.cancelNewItem}}):_vm._e(),_vm._v(" "),(!_vm.isAddingItem)?_c('button',{staticClass:"btn btn-light",on:{"click":_vm.addItem}},[_c('i',{staticClass:"mdi mdi-plus-circle"})]):_vm._e()],2)};
var __vue_staticRenderFns__$c = [];

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* component normalizer */
  function __vue_normalize__$d(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "JsonEditorView.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var JsonEditorView = __vue_normalize__$d(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$e = {
  name: "latte-json-editor-view-array",
  props: {
    parsedData: {
      required: true
    }
  },
  data: function data() {
    return {
      hideMyBlock: {},
      flowData: this.parsedData,
      isAddingItem: false
    };
  },
  mounted: function mounted() {
    for (var index in this.flowData) {
      if (this.flowData.hasOwnProperty(index)) this.$set(this.hideMyBlock, index, true);
    }
  },
  methods: {
    deleteItem: function deleteItem(parentDom, item, index) {
      this.flowData.splice(index, 1);
      this.$emit("input", this.flowData);
    },
    addItem: function addItem() {
      if (this.isAddingItem) return;
      this.isAddingItem = true;
    },
    cancelNewItem: function cancelNewItem() {
      if (!this.isAddingItem) return;
      this.isAddingItem = false;
    },
    toggleBlock: function toggleBlock(index) {
      this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
    },
    newItem: function newItem(obj) {
      var oj = {
        name: obj.key,
        type: obj.type
      };

      if (obj.type === 'array' || obj.type === 'object') {
        oj.childParams = obj.value;
        oj.remark = null;
      } else {
        oj.childParams = null;
        oj.remark = obj.value;
      }

      this.flowData.push(oj);
      this.$emit("input", this.flowData);
      this.cancelNewItem();
    }
  }
};

/* script */
            const __vue_script__$e = script$e;
            
/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-view array"},[_vm._l((_vm.flowData),function(item,index){return _c('div',{key:index,staticClass:"json-editor json-editor-block",class:[item.type, {'hide-block': _vm.hideMyBlock[index]}]},[_c('div',{staticClass:"key"},[(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-light toggle",on:{"click":function($event){_vm.toggleBlock(index);}}},[_c('i',{class:['mdi', {'mdi-chevron-down': !_vm.hideMyBlock[index]}, {'mdi-chevron-right': _vm.hideMyBlock[index]}]})]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"key"},[_vm._v(_vm._s(index))]),_vm._v(" "),(item.type === 'array')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("[" + item.childParams.length + "]"))]):_vm._e(),_vm._v(" "),(item.type === 'object')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("{" + (item.childParams.length || 0) + "}"))]):_vm._e(),_vm._v(" "),(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-light trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"value"},[(item.type === 'object')?[_c('latte-json-editor-view',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:(item.type === 'array')?[_c('latte-json-editor-view-array',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:[(item.type === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.remark),expression:"item.remark",modifiers:{"number":true}}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", _vm._n($event.target.value));},"blur":function($event){_vm.$forceUpdate();}}}):_vm._e(),_vm._v(" "),(item.type === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"custom-select",attrs:{"name":"value"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(item, "remark", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},[_c('option',{domProps:{"value":true}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{domProps:{"value":false}},[_vm._v("FALSE")])]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-light trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})])]],2)])}),_vm._v(" "),(_vm.isAddingItem)?_c('latte-json-editor-iaf',{attrs:{"needName":false},on:{"confirm":_vm.newItem,"cancel":_vm.cancelNewItem}}):_vm._e(),_vm._v(" "),(!_vm.isAddingItem)?_c('button',{staticClass:"btn btn-light",on:{"click":_vm.addItem}},[_c('i',{staticClass:"mdi mdi-plus-circle"})]):_vm._e()],2)};
var __vue_staticRenderFns__$d = [];

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* component normalizer */
  function __vue_normalize__$e(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "JsonEditorViewArray.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var JsonEditorViewArray = __vue_normalize__$e(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );

//
//
//
//
//
//
var script$f = {
  name: "latte-moment",
  props: {
    format: {
      default: "d MMMM YYYY",
      required: false,
      type: String
    },
    unixTimestamp: {
      default: function _default() {
        return Date.now();
      },
      required: false,
      type: Number
    }
  },
  computed: {
    formatted_moment: function formatted_moment() {
      return moment(this.unixTimestamp).format(this.format);
    }
  }
};

/* script */
            const __vue_script__$f = script$f;
            
/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"latte-moment"},[_vm._v(_vm._s(_vm.formatted_moment))])};
var __vue_staticRenderFns__$e = [];

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* component normalizer */
  function __vue_normalize__$f(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Moment.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Moment = __vue_normalize__$f(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );

//
var script$g = {
  name: "latte-notifications",
  data: function data() {
    return {
      notifications: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    on("latte:notification", function (data) {
      return _this.createNotification(data);
    });
  },
  methods: {
    createNotification: function createNotification(data) {
      var _this2 = this;

      data.id = this.notifications.map(function (n) {
        return n.id;
      }).sort(function (a, b) {
        return b - a;
      })[0] + 1;
      if (isNaN(data.id)) data.id = 0;
      data.delay = data.delay || 3000;
      data.shown = false;
      data.top = 0;
      this.notifications.unshift(data);
      setTimeout(function () {
        return _this2.show(data.id);
      }, 50);
      if (data.delay > -1) setTimeout(function () {
        return _this2.remove(data.id);
      }, data.delay + 50);
      var soundUri = data["sound"] || "/resource/sound/notification/pipes.ogg";
      if (soundUri === null) return;
      var audio = new Audio();
      audio.setAttribute("src", soundUri);
      audio.setAttribute("preload", "auto");
      audio.volume = 1;
      audio.currentTime = 0;
      audio.play().then();
    },
    getNotificationClasses: function getNotificationClasses(notification) {
      var classes = [];
      if (!notification.shown) classes.push("is-hidden");
      if (notification.type) classes.push("notification-".concat(notification.type));
      return classes;
    },
    makeParams: function makeParams(params) {
      var result = {};

      for (var param in params) {
        if (params.hasOwnProperty(param)) result["data-".concat(param)] = params[param];
      }

      return result;
    },
    remove: function remove(id) {
      var _this3 = this;

      var n = this.notifications.find(function (n) {
        return n.id === id;
      });
      if (!n) return;
      n.shown = false;
      setTimeout(function () {
        return _this3.notifications = _this3.notifications.filter(function (n) {
          return n.id !== id;
        });
      }, 360);
    },
    show: function show(id) {
      var n = this.notifications.find(function (n) {
        return n.id === id;
      });
      n.shown = true;
      this.updatePositions();
    },
    updatePositions: function updatePositions() {
      var notifications = this.notifications.filter(function (n) {
        return n.shown;
      });
      var top = 84;

      for (var i = notifications.length - 1; i >= 0; i--) {
        var notification = notifications[i];
        notification.top = top;
        top += this.$refs["notification_".concat(notification.id)][0].getBoundingClientRect().height + 24;
      }
    }
  },
  watch: {
    notifications: function notifications() {
      var _this4 = this;

      this.$nextTick(function () {
        return _this4.updatePositions();
      });
    }
  }
};

/* script */
            const __vue_script__$g = script$g;
            
/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"notification-center"}},_vm._l((_vm.notifications),function(notification){return _c('div',{ref:'notification_' + notification.id,refInFor:true,staticClass:"notification",class:_vm.getNotificationClasses(notification),style:({'top': notification.top + 'px'})},[(notification['avatar'])?_c('img',{staticClass:"avatar",attrs:{"src":notification['avatar']}}):_vm._e(),_vm._v(" "),(notification.type)?_c('div',{staticClass:"notification-icon"},[_c('i',{staticClass:"mdi"})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"notification-content"},[_c('div',{staticClass:"notification-body"},[(notification.title)?_c('span',{staticClass:"notification-title"},[_vm._v(_vm._s(notification.title))]):_vm._e(),_vm._v(" "),(notification.message)?_c('span',{staticClass:"notification-text"},[_vm._v(_vm._s(notification.message))]):_vm._e()]),_vm._v(" "),(notification.actions)?_c('div',{staticClass:"notification-actions"},_vm._l((notification.actions),function(a){return _c('button',_vm._b({staticClass:"btn btn-text",class:'btn-' + (a.type || 'primary'),attrs:{"data-action":a.action},on:{"click":function($event){_vm.remove(notification.id);}}},'button',_vm.makeParams(a.params || {}),false),[_c('span',[_vm._v(_vm._s(a.label))])])})):_vm._e()])])}))};
var __vue_staticRenderFns__$f = [];

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* component normalizer */
  function __vue_normalize__$g(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Notifications.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Notifications = __vue_normalize__$g(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

var counter = 0;
var registry = {};
function close(name) {
  var overlay = find(name);
  overlay.close();
}
function find(name) {
  if (typeof registry[name] === "undefined") throw new Error("Overlay ".concat(name, " is not registred!"));
  return registry[name];
}
function open(name) {
  var overlay = find(name);
  overlay.open();
  setTimeout(function () {
    return overlay.$el.style.zIndex = "".concat(2000000 + counter);
  }, 1);
  counter++;
}
function register$1(name, overlay) {
  registry[name] = overlay;
}
function remove(name) {
  delete registry[name];
}
var overlays = {
  close: close,
  find: find,
  open: open,
  register: register$1,
  remove: remove
};

//
var script$h = {
  name: "latte-overlay",
  props: {
    name: {
      required: true,
      type: String
    },
    opened: {
      default: false,
      type: Boolean
    }
  },
  data: function data() {
    return {
      isOpen: false,
      isVisible: false
    };
  },
  destroyed: function destroyed() {
    remove(this.name);
  },
  mounted: function mounted() {
    register$1(this.name, this);
    this.$el.parentNode.removeChild(this.$el);
    document.body.appendChild(this.$el);
    if (this.opened) open(this.name);
  },
  methods: {
    close: function close$$1() {
      var _this = this;

      this.isOpen = false;
      timeout(270, function () {
        return _this.isVisible = false;
      });
      dispatch("latte:overlay", {
        overlay: this,
        open: false
      });
      this.$emit("close", this);
    },
    open: function open$$1() {
      var _this2 = this;

      if (this.isVisible) return;
      this.isVisible = true;
      timeout(20, function () {
        return _this2.isOpen = true;
      });
      dispatch("latte:overlay", {
        overlay: this,
        open: true
      });
      this.$emit("open", this);
    }
  }
};

/* script */
            const __vue_script__$h = script$h;
            
/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible)?_c('div',{staticClass:"latte-overlay",class:{'is-visible': _vm.isVisible, 'is-open': _vm.isOpen},attrs:{"role":"dialog"}},[_vm._t("default")],2):_vm._e()};
var __vue_staticRenderFns__$g = [];

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* component normalizer */
  function __vue_normalize__$h(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Overlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Overlay = __vue_normalize__$h(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$i = {
  name: "latte-pagination",
  props: {
    pagination: {
      type: Array,
      required: true
    }
  },
  methods: {
    navigate: function navigate(page) {
      this.$emit("navigate", page);
    }
  }
};

/* script */
            const __vue_script__$i = script$i;
            
/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"pagination ml-auto",attrs:{"role":"navigation"}},[_vm._l((_vm.pagination),function(entry){return [_c('a',{staticClass:"pagination-item",class:{'is-current': entry.is_current, 'is-disabled': entry.is_disabled},attrs:{"role":"menuitem"},on:{"click":function($event){_vm.navigate(entry.page);}}},[(entry.is_dots)?[_vm._v("…")]:(entry.label === 'first')?[_c('i',{staticClass:"mdi mdi-chevron-double-left"})]:(entry.label === 'prev')?[_c('i',{staticClass:"mdi mdi-chevron-left"})]:(entry.label === 'next')?[_c('i',{staticClass:"mdi mdi-chevron-right"})]:(entry.label === 'last')?[_c('i',{staticClass:"mdi mdi-chevron-double-right"})]:[_vm._v(_vm._s(entry.label))]],2)]})],2)};
var __vue_staticRenderFns__$h = [];

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* component normalizer */
  function __vue_normalize__$i(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Pagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Pagination = __vue_normalize__$i(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
var script$j = {
  name: "latte-password",
  props: {
    autocomplete: {
      default: "",
      required: false,
      type: String
    },
    id: {
      default: "",
      required: false,
      type: String
    },
    name: {
      default: "",
      required: false,
      type: String
    },
    placeholder: {
      default: "",
      required: false,
      type: String
    },
    show: {
      default: false,
      required: false,
      type: Boolean
    },
    value: {
      default: "",
      required: false,
      type: String
    }
  },
  data: function data() {
    return {
      fieldType: this.show ? "text" : "password",
      password: this.value
    };
  },
  computed: {
    bindings: function bindings() {
      var bindings = {};
      if (this.id !== "") bindings.id = this.id;
      if (this.name !== "") bindings.name = this.name;
      if (this.placeholder !== "") bindings.placeholder = this.placeholder;
      return bindings;
    },
    iconClass: function iconClass() {
      return this.fieldType === "password" ? "mdi-eye" : "mdi-eye-off";
    }
  },
  methods: {
    toggle: function toggle() {
      this.show = !this.show;
    }
  },
  watch: {
    password: function password() {
      this.$emit("input", this.password);
    },
    show: function show() {
      this.fieldType = this.show ? "text" : "password";
    }
  }
};

/* script */
            const __vue_script__$j = script$j;
            
/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-control"},[((_vm.fieldType)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.password)?_vm._i(_vm.password,null)>-1:(_vm.password)},on:{"change":function($event){var $$a=_vm.password,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.password=$$a.concat([$$v]));}else{$$i>-1&&(_vm.password=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.password=$$c;}}}},'input',_vm.bindings,false)):((_vm.fieldType)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":"radio"},domProps:{"checked":_vm._q(_vm.password,null)},on:{"change":function($event){_vm.password=null;}}},'input',_vm.bindings,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":_vm.fieldType},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value;}}},'input',_vm.bindings,false)),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark form-control-suffix",attrs:{"type":"button"},on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi",class:_vm.iconClass})])])};
var __vue_staticRenderFns__$i = [];

  /* style */
  const __vue_inject_styles__$j = undefined;
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* component normalizer */
  function __vue_normalize__$j(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Password.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Password = __vue_normalize__$j(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    undefined,
    undefined
  );

//
var script$k = {
  name: "latte-pdf-viewer",
  props: {
    source: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      i18n: {
        download: "Download",
        openInNewTab: "Open in new tab",
        print: "Print",
        reload: "Reload"
      },
      isLoading: false,
      pages: 0,
      pdf: null,
      rendered: 0
    };
  },
  mounted: function mounted() {
    this.load();
    this.i18n = forObject(this.i18n);
  },
  computed: {
    hasSupport: function hasSupport() {
      return window["pdfjsLib"] !== undefined;
    }
  },
  methods: {
    load: function load() {
      var _this = this;

      if (!this.hasSupport) return;
      this.isLoading = true;
      this.rendered = 0;
      window["pdfjsLib"].getDocument(this.source).then(function (pdf) {
        return _this.onPDFLoaded(pdf);
      });
    },
    download: function download() {
      downloadFile("NULL.pdf", this.source);
    },
    print: function print() {
      printDocument(this.source);
    },
    onPDFLoaded: function onPDFLoaded(pdf) {
      var _this2 = this;

      this.pdf = pdf;
      this.pages = this.pdf.numPages;
      this.$nextTick(function () {
        return _this2.onPDFLoadedSecondTask();
      });
    },
    onPDFLoadedSecondTask: function onPDFLoadedSecondTask() {
      for (var i = 1; i <= this.pages; i++) {
        var pageElement = this.$el.querySelector("div.page#page-".concat(i));
        if (typeof pageElement === "undefined") throw new Error("Page Element not found!");
        var pageCanvas = pageElement.querySelector("canvas");
        this.pdf.getPage(i).then(this.onPDFPageReady.bind(this, pageElement, pageCanvas));
      }
    },
    onPDFPageReady: function onPDFPageReady(pageElement, pageCanvas, page) {
      this.renderPage(pageElement, pageCanvas, page);
    },
    renderPage: function renderPage(pageElement, pageCanvas, page) {
      var _this3 = this;

      var desiredWidth = pageElement.getBoundingClientRect().width;
      var viewport = page.getViewport(1);
      var scale = desiredWidth / viewport.width;
      viewport = page.getViewport(scale);
      var context = pageCanvas.getContext("2d");
      pageElement.style.height = (pageCanvas.height = Math.round(viewport.height)) + 'px';
      pageElement.style.width = (pageCanvas.width = Math.round(viewport.width)) + 'px';
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext).then(function () {
        _this3.rendered++;
        _this3.isLoading = !(_this3.rendered === _this3.pages);
      });
    }
  },
  watch: {
    source: function source() {
      this.load();
    }
  }
};

/* script */
            const __vue_script__$k = script$k;
            
/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasSupport)?_c('div',{directives:[{name:"latte-context-menu",rawName:"v-latte-context-menu"}],staticClass:"panel pdf-viewer",class:{'is-loading': _vm.isLoading},staticStyle:{"min-height":"84px"},attrs:{"role":"presentation"}},[_vm._l((_vm.pages),function(i){return _c('div',{staticClass:"page",attrs:{"id":'page-' + i}},[_c('canvas')])}),_vm._v(" "),_c('span',{staticClass:"spinner"}),_vm._v(" "),_c('nav',{staticClass:"nav nav-list latte-context-menu"},[_c('a',{staticClass:"nav-link",attrs:{"href":_vm.source,"target":"_blank"}},[_c('i',{staticClass:"mdi mdi-open-in-new"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.i18n.openInNewTab))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.download}},[_c('i',{staticClass:"mdi mdi-download"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.i18n.download))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.print}},[_c('i',{staticClass:"mdi mdi-printer"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.i18n.print))])]),_vm._v(" "),_c('div',{staticClass:"divider divider-horizontal"}),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.load}},[_c('i',{staticClass:"mdi mdi-reload"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.i18n.reload))])]),_vm._v(" "),_vm._t("menu")],2)],2):_c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-body text-center"},[_vm._v("\n\t\tPlease include PDF.js in your project.\n\t")])])};
var __vue_staticRenderFns__$j = [];

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* component normalizer */
  function __vue_normalize__$k(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "PdfViewer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var PdfViewer = __vue_normalize__$k(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );

//
var script$l = {
  name: "latte-ripple",
  props: {
    as: {
      default: "div",
      required: false,
      type: String
    },
    rippleBackground: {
      default: true,
      required: false,
      type: Boolean
    },
    // TODO(Bas): Implement centered ripple.
    rippleCentered: {
      default: false,
      required: false,
      type: Boolean
    },
    rippleDuration: {
      default: 330,
      required: false,
      type: Number
    }
  },
  data: function data() {
    return {
      isBackgroundVisible: false,
      backgroundTimeout: null,
      container: null,
      preparedRipple: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.container = document.createElement("div");
    this.container.classList.add("ripple-container");
    this.$el.prepend(this.container);

    if (window.TouchEvent) {
      this.$el.addEventListener("touchmove", function (evt) {
        return _this.onPointerCancel(evt);
      }, {
        passive: true
      });
    } else {
      this.$el.addEventListener("pointercancel", function (evt) {
        return _this.onPointerCancel(evt);
      }, {
        passive: true
      });
      this.$el.addEventListener("pointerout", function (evt) {
        return _this.onPointerCancel(evt);
      }, {
        passive: true
      });
    }

    this.$el.addEventListener("pointerdown", function (evt) {
      return _this.onPointerDown(evt);
    }, {
      passive: true
    });
    this.$el.addEventListener("pointerup", function (evt) {
      return _this.onPointerUp(evt);
    }, {
      passive: true
    });
  },
  computed: {
    scopedSlots: function scopedSlots() {
      return Object.keys(this.$scopedSlots);
    },
    slots: function slots() {
      return Object.keys(this.$slots).filter(function (k) {
        return k !== "default";
      });
    }
  },
  methods: {
    createRipple: function createRipple(x, y) {
      var ripple = document.createElement("div");
      ripple.classList.add("ripple");
      ripple.style.setProperty("top", "".concat(y - 18, "px"));
      ripple.style.setProperty("left", "".concat(x - 18, "px"));
      ripple.style.setProperty("--ripple-duration-private", "".concat(this.rippleDuration + 180, "ms"));
      this.container.appendChild(ripple);
      return ripple;
    },
    onPointerCancel: function onPointerCancel() {
      if (this.preparedRipple !== null) this.preparedRipple.remove();
      this.isBackgroundVisible = false;
      this.preparedRipple = null;
    },
    onPointerDown: function onPointerDown(evt) {
      var _relativeCoordsTo = relativeCoordsTo(this.$el, evt),
          x = _relativeCoordsTo.x,
          y = _relativeCoordsTo.y;

      this.isBackgroundVisible = true;
      this.preparedRipple = this.createRipple(x, y);
    },
    onPointerUp: function onPointerUp(evt) {
      var _this2 = this;

      var _relativeCoordsTo2 = relativeCoordsTo(this.$el, evt),
          x = _relativeCoordsTo2.x,
          y = _relativeCoordsTo2.y;

      if (this.backgroundTimeout !== null) clearTimeout(this.backgroundTimeout);
      this.backgroundTimeout = timeout(this.rippleDuration, function () {
        _this2.backgroundTimeout = null;
        _this2.isBackgroundVisible = false;
      });
      if (this.preparedRipple === null) return;
      var ripple = this.preparedRipple;
      this.preparedRipple = null;
      ripple.style.setProperty("top", "".concat(y - 18, "px"));
      ripple.style.setProperty("left", "".concat(x - 18, "px"));
      ripple.classList.add("is-scaling");
      ripple.classList.add("is-visible");
      timeout(this.rippleDuration, function () {
        return ripple.classList.add("is-hiding");
      });
      timeout(this.rippleDuration + 180, function () {
        return ripple.remove();
      });
    }
  },
  watch: {
    isBackgroundVisible: function isBackgroundVisible() {
      if (this.isBackgroundVisible && this.rippleBackground) this.container.classList.add("is-background-visible");else this.container.classList.remove("is-background-visible");
    }
  }
};

/* script */
            const __vue_script__$l = script$l;
            
/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.as,_vm._g(_vm._b({tag:"component",scopedSlots:_vm._u([_vm._l((_vm.scopedSlots),function(slot){return {key:slot,fn:function(scope){return [_vm._t(slot,null,null,scope)]}}})])},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default"),_vm._v(" "),_vm._l((_vm.slots),function(slot){return _vm._t(slot,null,{slot:slot})})],2)};
var __vue_staticRenderFns__$k = [];

  /* style */
  const __vue_inject_styles__$l = undefined;
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* component normalizer */
  function __vue_normalize__$l(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Ripple.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Ripple = __vue_normalize__$l(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
var script$m = {
  name: "latte-tab",
  props: {
    icon: {
      default: "",
      required: false,
      type: String
    },
    label: {
      default: "",
      required: false,
      type: String
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  mounted: function mounted() {
    this.$parent.updateChildren();
  },
  watch: {
    active: function active() {
      this.$emit("active", this.active);
    }
  }
};

/* script */
            const __vue_script__$m = script$m;
            
/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.active)?_c('div',{staticClass:"tab"},[_vm._t("default")],2):_vm._e()};
var __vue_staticRenderFns__$l = [];

  /* style */
  const __vue_inject_styles__$m = undefined;
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* component normalizer */
  function __vue_normalize__$m(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Tab.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Tab = __vue_normalize__$m(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
var script$n = {
  name: "latte-tab-bar",
  data: function data() {
    return {
      tabs: []
    };
  },
  methods: {
    click: function click(index) {
      this.$parent.current = index;
    }
  }
};

/* script */
            const __vue_script__$n = script$n;
            
/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"nav nav-tabs"},_vm._l((_vm.tabs),function(tab,index){return _c('a',{staticClass:"nav-link",class:{'is-active': tab.active},on:{"click":function($event){_vm.click(index);}}},[(tab.icon !== '')?_c('i',{staticClass:"mdi",class:'mdi-' + tab.icon}):_vm._e(),_vm._v(" "),(tab.label !== '')?_c('span',[_vm._v(_vm._s(tab.label))]):_vm._e()])}))};
var __vue_staticRenderFns__$m = [];

  /* style */
  const __vue_inject_styles__$n = undefined;
  /* scoped */
  const __vue_scope_id__$n = undefined;
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* component normalizer */
  function __vue_normalize__$n(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "TabBar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TabBar = __vue_normalize__$n(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
var script$o = {
  name: "latte-tab-container",
  props: {
    initialTab: {
      default: 0,
      required: false,
      type: Number
    }
  },
  data: function data() {
    return {
      current: this.initialTab,
      tabs: []
    };
  },
  mounted: function mounted() {
    this.updateChildren();
  },
  methods: {
    updateChildren: function updateChildren() {
      this.tabs = this.$children.filter(function (c) {
        return c.$options.name === "latte-tab";
      });
    },
    updateCurrent: function updateCurrent() {
      this.tabs.forEach(function (t) {
        return t.active = false;
      });
      this.tabs[this.current].active = true;
    },
    updateTabBars: function updateTabBars() {
      var _this = this;

      this.$children.filter(function (c) {
        return c.$options.name === "latte-tab-bar";
      }).forEach(function (c) {
        return _this.$set(c, "tabs", _this.tabs);
      });
      this.updateCurrent();
    }
  },
  watch: {
    current: function current() {
      this.$emit("change", this.current);
      this.updateCurrent();
    },
    initialTab: function initialTab() {
      this.current = this.initialTab;
    },
    tabs: function tabs() {
      this.updateTabBars();
    }
  }
};

/* script */
            const __vue_script__$o = script$o;
            
/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tab-container"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$n = [];

  /* style */
  const __vue_inject_styles__$o = undefined;
  /* scoped */
  const __vue_scope_id__$o = undefined;
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* component normalizer */
  function __vue_normalize__$o(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "TabContainer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TabContainer = __vue_normalize__$o(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    undefined,
    undefined
  );

//
var script$p = {
  name: "latte-tree-view",
  props: {
    url: {
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      children: []
    };
  },
  mounted: function mounted() {
    this.load();
  },
  methods: {
    click: function click(id) {
      this.$emit("change", id);
    },
    load: function load() {
      request(this.url).then(function (r) {
        return r.json();
      }).then(this.onResponse);
    },
    onResponse: function onResponse(response) {
      this.children = response.data;
    }
  }
};

/* script */
            const __vue_script__$p = script$p;
            
/* template */
var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view"},_vm._l((_vm.children),function(child,key){return _c('latte-tree-view-item',{key:key,attrs:{"id":child.id,"parent_id":child.parent_id,"icon":child.icon,"name":child.name,"children":child.children || []},on:{"change":function($event){_vm.click($event);}}})}))};
var __vue_staticRenderFns__$o = [];

  /* style */
  const __vue_inject_styles__$p = undefined;
  /* scoped */
  const __vue_scope_id__$p = undefined;
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* component normalizer */
  function __vue_normalize__$p(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "TreeView.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TreeView = __vue_normalize__$p(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$q = {
  name: "latte-tree-view-item",
  props: {
    id: {
      required: true,
      type: Number
    },
    parent_id: {
      required: true,
      type: Number | undefined
    },
    icon: {
      default: "folder",
      required: false,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    children: {
      default: [],
      required: false,
      type: Array
    }
  },
  data: function data() {
    return {
      isExpanded: false
    };
  },
  methods: {
    click: function click(id) {
      this.$emit("change", id);
    },
    toggle: function toggle(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      this.isExpanded = !this.isExpanded;
    }
  }
};

/* script */
            const __vue_script__$q = script$q;
            
/* template */
var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view-item"},[_c('div',{staticClass:"tree-view-item-label",class:{'is-expanded': _vm.isExpanded},on:{"click":function($event){_vm.click(_vm.id);}}},[(_vm.children.length > 0)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark btn-sm",on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi mdi-chevron-right"})]):_vm._e(),_vm._v(" "),_c('i',{class:['tree-view-item-label-icon', 'mdi', 'mdi-' + _vm.icon]}),_vm._v(" "),_c('span',{staticClass:"tree-view-item-label-label"},[_vm._v(_vm._s(_vm.name))])]),_vm._v(" "),(_vm.children.length > 0 && _vm.isExpanded)?_c('div',{staticClass:"tree-view-item-children"},_vm._l((_vm.children),function(child,key){return _c('latte-tree-view-item',{key:key,attrs:{"id":child.id,"parent_id":child.parent_id,"icon":child.icon,"name":child.name,"children":child.children || []},on:{"change":function($event){_vm.click($event);}}})})):_vm._e()])};
var __vue_staticRenderFns__$p = [];

  /* style */
  const __vue_inject_styles__$q = undefined;
  /* scoped */
  const __vue_scope_id__$q = undefined;
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* component normalizer */
  function __vue_normalize__$q(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "TreeViewItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var TreeViewItem = __vue_normalize__$q(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
var script$r = {
  name: "latte-uploader",
  props: {
    isMultiple: {
      default: false,
      required: false,
      type: Boolean
    },
    previewMode: {
      default: "photo",
      required: false,
      type: String,
      validator: function validator(value) {
        return ["photo", "list"].contains(value);
      }
    }
  },
  created: function created() {
    var _this = this;

    window.addEventListener("dragend", function (evt) {
      return _this.onDragEnd(evt);
    });
    window.addEventListener("dragleave", function (evt) {
      return _this.onDragEnd(evt);
    });
    window.addEventListener("dragover", function (evt) {
      return _this.onDragStart(evt);
    });
    window.addEventListener("drop", function (evt) {
      return _this.onDragEnd(evt);
    });
  },
  data: function data() {
    return {
      isDragging: false,
      isDraggingOver: false,
      files: []
    };
  },
  mounted: function mounted() {},
  computed: {
    containerClasses: function containerClasses() {
      var classes = [];
      if (this.isDragging) classes.push("is-dragging");
      if (this.isDraggingOver) classes.push("is-dragging-over");
      return classes;
    },
    isImage: function isImage() {
      if (this.files.length === 0) return false;
      return this.files[0].type.startsWith("image/");
    },
    isPreviewAvailable: function isPreviewAvailable() {
      if (this.files.length === 0) return false; // TODO(Bas): Handle multiple files.

      if (this.files.length === 1) return true;
      return false;
    }
  },
  methods: {
    onDragEnd: function onDragEnd() {
      this.isDragging = false;
    },
    onDragEnter: function onDragEnter(evt) {
      evt.preventDefault();
      this.isDraggingOver = true;
    },
    onDragLeave: function onDragLeave(evt) {
      evt.preventDefault();
      this.isDraggingOver = false;
    },
    onDragStart: function onDragStart(evt) {
      evt.preventDefault();
      this.isDragging = true;
    },
    onDrop: function onDrop(evt) {
      evt.preventDefault();
      window.dispatchEvent(new CustomEvent("dragend"));
      this.files = evt.dataTransfer.files;
      this.isDragging = false;
      this.isDraggingOver = false;
    }
  },
  watch: {}
};

/* script */
            const __vue_script__$r = script$r;
            
/* template */
var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"drop-container uploader",class:_vm.containerClasses,on:{"dragenter":_vm.onDragEnter,"dragleave":_vm.onDragLeave,"drop":_vm.onDrop}},[(!_vm.isDraggingOver)?_vm._t("drop-here",[_vm._v("Drop here to upload")],{uploader:this}):_vm._t("let-go",[_vm._v("Let go to upload")],{uploader:this}),_vm._v(" "),(!_vm.isMultiple && _vm.previewMode === 'photo' && _vm.files.length === 0)?[_c('img',{attrs:{"src":"","alt":""}})]:_vm._e()],2)};
var __vue_staticRenderFns__$q = [];

  /* style */
  const __vue_inject_styles__$r = function (inject) {
    if (!inject) return
    inject("data-v-2f263d8a_0", { source: "\ndiv.drop-container{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border:2px dashed var(--outline-color-secondary);border-radius:var(--border-radius);text-align:center\n}\ndiv.drop-container.is-dragging>*{pointer-events:none\n}\ndiv.drop-container.is-dragging{background-color:rgba(var(--color-dark),.05);border-color:rgba(var(--color-dark),.1)\n}\ndiv.drop-container.is-dragging-over{background-color:rgba(var(--color-primary),.3);border-color:rgba(var(--color-primary),.1)\n}", map: undefined, media: undefined })
,inject("data-v-2f263d8a_1", { source: "", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$r = "data-v-2f263d8a";
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* component normalizer */
  function __vue_normalize__$r(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Uploader.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$1() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$1.styles || (__vue_create_injector__$1.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var Uploader = __vue_normalize__$r(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    __vue_create_injector__$1,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$s = {
  name: "latte-uploader",
  props: {
    isMultiple: {
      default: false,
      required: false,
      type: Boolean
    },
    name: {
      default: "photo",
      required: false,
      type: String
    }
  },
  created: function created() {
    var _this = this;

    window.addEventListener("dragend", function (evt) {
      return _this.onDragEnd(evt);
    });
    window.addEventListener("dragleave", function (evt) {
      return _this.onDragEnd(evt);
    });
    window.addEventListener("dragover", function (evt) {
      return _this.onDragStart(evt);
    });
    window.addEventListener("drop", function (evt) {
      return _this.onDragEnd(evt);
    });
  },
  data: function data() {
    return {
      isDragging: false,
      isDraggingOver: false,
      files: [],
      urls: []
    };
  },
  mounted: function mounted() {},
  computed: {
    containerClasses: function containerClasses() {
      var classes = [];
      if (this.isDragging) classes.push("is-dragging");
      if (this.isDraggingOver) classes.push("is-dragging-over");
      return classes;
    }
  },
  methods: {
    onDragEnd: function onDragEnd() {
      this.isDragging = false;
    },
    onDragEnter: function onDragEnter(evt) {
      evt.preventDefault();
      this.isDraggingOver = true;
    },
    onDragLeave: function onDragLeave(evt) {
      evt.preventDefault();
      this.isDraggingOver = false;
    },
    onDragStart: function onDragStart(evt) {
      evt.preventDefault();
      this.isDragging = true;
    },
    onDrop: function onDrop(evt) {
      evt.preventDefault();
      window.dispatchEvent(new CustomEvent("dragend"));
      this.$refs.fileInput.files = evt.dataTransfer.files;
      this.isDragging = false;
      this.isDraggingOver = false;
    },
    onFilesSelected: function onFilesSelected() {
      this.files = _toConsumableArray(this.$refs.fileInput.files);
    }
  },
  watch: {
    files: function files() {
      this.urls.forEach(function (url) {
        return URL.revokeObjectURL(url);
      });
      this.urls = this.files.map(function (file) {
        return URL.createObjectURL(file);
      });
    }
  }
};

/* script */
            const __vue_script__$s = script$s;
            
/* template */
var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"drop-container uploader uploader-photo",class:_vm.containerClasses,on:{"dragenter":_vm.onDragEnter,"dragleave":_vm.onDragLeave,"drop":_vm.onDrop}},[(_vm.files.length === 1)?[_c('img',{staticClass:"preview-image single",attrs:{"src":_vm.urls[0],"alt":"Photo"}})]:_vm._e(),_vm._v(" "),(!_vm.isDraggingOver)?_vm._t("drop-here",[_vm._v("Drop here to upload")],{uploader:this}):_vm._t("let-go",[_vm._v("Let go to upload")],{uploader:this}),_vm._v(" "),_c('input',{ref:"fileInput",staticClass:"d-none",attrs:{"type":"file","accept":"image/*","name":_vm.name},on:{"change":_vm.onFilesSelected}})],2)};
var __vue_staticRenderFns__$r = [];

  /* style */
  const __vue_inject_styles__$s = function (inject) {
    if (!inject) return
    inject("data-v-9e722c26_0", { source: "\ndiv.drop-container{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border:2px dashed var(--outline-color-secondary);border-radius:var(--border-radius);text-align:center\n}\ndiv.drop-container.is-dragging>*{pointer-events:none\n}\ndiv.drop-container.is-dragging{background-color:rgba(var(--color-dark),.05);border-color:rgba(var(--color-dark),.1)\n}\ndiv.drop-container.is-dragging-over{background-color:rgba(var(--color-primary),.3);border-color:rgba(var(--color-primary),.1)\n}", map: undefined, media: undefined })
,inject("data-v-9e722c26_1", { source: "\ndiv.uploader[data-v-9e722c26]{z-index:0\n}\ndiv.uploader div.uploader-info[data-v-9e722c26]{z-index:1\n}\ndiv.uploader img.preview-image.single[data-v-9e722c26]{position:absolute;display:block;height:100%;width:100%;top:0;left:0;right:0;bottom:0;border-radius:inherit;object-fit:cover;object-position:center center;pointer-events:none;z-index:0\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$s = "data-v-9e722c26";
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* component normalizer */
  function __vue_normalize__$s(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "UploaderPhoto.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    {
      let hook;
      if (style) {
        hook = function(context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook !== undefined) {
        if (component.functional) {
          // register for functional component in vue file
          const originalRender = component.render;
          component.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context)
          };
        } else {
          // inject component registration as beforeCreate hook
          const existing = component.beforeCreate;
          component.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }
    }

    return component
  }
  /* style inject */
  function __vue_create_injector__$2() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$2.styles || (__vue_create_injector__$2.styles = {});
    const isOldIE =
      typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

    return function addStyle(id, css) {
      if (document.querySelector('style[data-vue-ssr-id~="' + id + '"]')) return // SSR styles are present.

      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: [], parts: [], element: undefined });

      if (!style.ids.includes(id)) {
        let code = css.source;
        let index = style.ids.length;

        style.ids.push(id);

        if (css.map) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
          // http://stackoverflow.com/a/26603875
          code +=
            '\n/*# sourceMappingURL=data:application/json;base64,' +
            btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
            ' */';
        }

        if (isOldIE) {
          style.element = style.element || document.querySelector('style[data-group=' + group + ']');
        }

        if (!style.element) {
          const el = style.element = document.createElement('style');
          el.type = 'text/css';

          if (css.media) el.setAttribute('media', css.media);
          if (isOldIE) {
            el.setAttribute('data-group', group);
            el.setAttribute('data-next-index', '0');
          }

          head.appendChild(el);
        }

        if (isOldIE) {
          index = parseInt(style.element.getAttribute('data-next-index'));
          style.element.setAttribute('data-next-index', index + 1);
        }

        if (style.element.styleSheet) {
          style.parts.push(code);
          style.element.styleSheet.cssText = style.parts
            .filter(Boolean)
            .join('\n');
        } else {
          const textNode = document.createTextNode(code);
          const nodes = style.element.childNodes;
          if (nodes[index]) style.element.removeChild(nodes[index]);
          if (nodes.length) style.element.insertBefore(textNode, nodes[index]);
          else style.element.appendChild(textNode);
        }
      }
    }
  }
  /* style inject SSR */
  

  
  var UploaderPhoto = __vue_normalize__$s(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    __vue_create_injector__$2,
    undefined
  );

function initializeNotices() {
  var notices = querySelectorAll("div.notice");
  notices = notices.filter(function (notice) {
    return notice.querySelector("button.notice-dismiss") !== null;
  });
  notices = notices.map(function (notice) {
    return notice.querySelector("button.notice-dismiss");
  });
  notices.forEach(function (dismissButton) {
    return dismissButton.addEventListener("click", function () {
      return dismissButton.parentNode.parentNode.removeChild(dismissButton.parentNode);
    });
  });
  on("latte:notice", function (data) {
    return create(decodeURIComponent(data.message), data.type || "info");
  });
}
function areEntitiesNotices(entities) {
  if (!isIterable(entities)) return false;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;
      if (!isEntityNotice(entity)) return false;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}
function create(message, type) {
  var dismissible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var noticeId = id$1();
  var notice = document.createElement("div");
  notice.classList.add("notice", "notice-".concat(type), "with-button");
  notice.setAttribute("id", noticeId);

  if (dismissible) {
    var dismiss = document.createElement("button");
    dismiss.classList.add("btn", "btn-text", "btn-icon", "btn-dark", "notice-dismiss");
    var icon = document.createElement("i");
    icon.classList.add("mdi", "mdi-close");
    dismiss.appendChild(icon);
    dismiss.addEventListener("click", function () {
      return remove$1(noticeId);
    }, {
      passive: true
    });
    notice.appendChild(dismiss);
  }

  var p = document.createElement("p");
  p.innerHTML = message;
  notice.appendChild(p);
  var content = document.querySelector("main#app > div.content");
  content.insertBefore(notice, content.querySelector(":scope > *:first-child"));
  return noticeId;
}
function isEntityNotice(entity) {
  return entity["@type"] && entity["@type"] === "Latte\\Framework\\Entity\\Notice";
}
function remove$1(noticeId) {
  var notice = document.querySelector("div.notice#".concat(noticeId));
  notice.parentNode.removeChild(notice);
}
var notices = {
  areEntitiesNotices: areEntitiesNotices,
  create: create,
  isEntityNotice: isEntityNotice,
  remove: remove$1
};

//
var script$t = {
  name: "latte-upload-user-photo",
  props: {
    id: {
      default: "photo_id",
      required: false,
      type: String
    },
    name: {
      default: "photo",
      required: false,
      type: String
    },
    noPicture: {
      default: "/resource/image/simple-avatar/bm?seed=12",
      required: false,
      type: String
    },
    value: {
      default: 0,
      required: false,
      type: Number
    }
  },
  data: function data() {
    return {
      i18n: {
        cancel: "Cancel",
        dropHere: "Place photo here to upload.",
        invalidFile: "Invalid file type. Input is cleared.",
        remove: "Remove",
        select: "Select"
      },
      currentFile: null,
      isDroppable: false,
      isLoading: true,
      previewUrl: null,
      uniqueId: id$1()
    };
  },
  mounted: function mounted() {
    var _this = this;

    window.addEventListener("dragleave", function (evt) {
      return _this.onDragLeave(evt);
    });
    window.addEventListener("dragend", function (evt) {
      return _this.onDragLeave(evt);
    });
    window.addEventListener("dragover", function (evt) {
      return _this.onDragOver(evt);
    });
    this.i18n = forObject(this.i18n, "admin-file-manager");
    this.loadFile();
  },
  computed: {
    fileId: function fileId() {
      if (this.previewUrl !== null) return 0;
      if (this.currentFile !== null) return this.currentFile.id;
      return 0;
    },
    imageSource: function imageSource() {
      if (this.previewUrl !== null) return this.previewUrl;

      if (this.currentFile !== null) {
        if (typeof this.currentFile["variants"] !== "undefined" && typeof this.currentFile["variants"][3] !== "undefined") return this.currentFile["variants"][3]["path"];else return this.currentFile["path"];
      }

      return this.noPicture;
    }
  },
  methods: {
    cancel: function cancel() {
      window.URL.revokeObjectURL(this.previewUrl);
      this.$refs.file_input.value = "";
      this.previewUrl = null;
    },
    loadFile: function loadFile() {
      var _this2 = this;

      if (this.value <= 0) {
        this.currentFile = null;
        return;
      }

      request("/api/system/file-system/file/".concat(this.value)).then(function (r) {
        return r.json();
      }).then(function (r) {
        return _this2.onFileResponse(r);
      });
    },
    onDragLeave: function onDragLeave(evt) {
      this.isDroppable = false;
      evt.preventDefault();
      evt.stopPropagation();
    },
    onDragOver: function onDragOver(evt) {
      this.isDroppable = true;
      evt.preventDefault();
      evt.stopPropagation();
    },
    onDrop: function onDrop(evt) {
      this.isDroppable = false;
      if (evt.dataTransfer.files.length !== 1) return;
      if (evt.dataTransfer.files[0].type.match(/image.*/) === null) return;
      this.$refs.file_input.files = evt.dataTransfer.files;
      evt.preventDefault();
      evt.stopPropagation();
    },
    onFileResponse: function onFileResponse(response) {
      if (response && response.success === true) {
        this.currentFile = response.data;
      }
    },
    onFileSelected: function onFileSelected() {
      if (this.$refs.file_input.files.length !== 1) return;

      if (this.$refs.file_input.files[0].type.match(/image.*/) === null) {
        this.$refs.file_input.value = "";
        create(this.i18n.invalidFile, "error", true);
        return;
      }

      var previewUrl = window.URL.createObjectURL(this.$refs.file_input.files[0]);
      if (this.previewUrl === previewUrl) return;
      if (this.previewUrl !== null) window.URL.revokeObjectURL(this.previewUrl);
      this.isLoading = true;
      this.previewUrl = previewUrl;
    },
    onImageLoaded: function onImageLoaded() {
      this.isLoading = false;
    },
    remove: function remove() {
      this.currentFile = null;
    },
    selectFile: function selectFile() {
      this.$refs.file_input.click();
    }
  },
  watch: {
    value: function value() {
      this.loadFile();
    }
  }
};

/* script */
            const __vue_script__$t = script$t;
            
/* template */
var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"latte-drop-container latte-upload-user-photo",attrs:{"id":_vm.uniqueId},on:{"drop":_vm.onDrop}},[_c('div',{staticClass:"row no-gutters"},[_c('div',{staticClass:"col align-self-center text-center",staticStyle:{"flex-grow":"0"}},[_c('img',{staticClass:"avatar avatar-medium",attrs:{"src":_vm.imageSource,"alt":"Photo"},on:{"load":_vm.onImageLoaded}}),_vm._v(" "),(_vm.isLoading)?_c('span',{staticClass:"spinner spinner-primary above-parent"}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col d-flex align-self-center mt-3 mt-lg-0 ml-0 ml-lg-auto",staticStyle:{"flex-grow":"0"}},[_c('button',{staticClass:"btn btn-contained btn-primary",attrs:{"type":"button"},on:{"click":_vm.selectFile}},[_c('i',{staticClass:"mdi mdi-plus-circle"}),_c('span',[_vm._v(_vm._s(_vm.i18n.select))])]),_vm._v(" "),(_vm.currentFile !== null && _vm.previewUrl === null)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",attrs:{"type":"button"},on:{"click":_vm.remove}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e(),_vm._v(" "),(_vm.previewUrl !== null)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",attrs:{"type":"button"},on:{"click":_vm.cancel}},[_c('i',{staticClass:"mdi mdi-close"})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"drop-here",class:{'is-droppable': _vm.isDroppable}},[_vm._v(_vm._s(_vm.i18n.dropHere))]),_vm._v(" "),_c('input',{ref:"file_id",attrs:{"type":"hidden","name":_vm.name + '_id'},domProps:{"value":_vm.fileId}}),_vm._v(" "),_c('input',{ref:"file_input",staticClass:"d-none",attrs:{"type":"file","accept":"image/*","name":_vm.name + '_file',"id":_vm.name},on:{"change":_vm.onFileSelected}})])};
var __vue_staticRenderFns__$s = [];

  /* style */
  const __vue_inject_styles__$t = undefined;
  /* scoped */
  const __vue_scope_id__$t = undefined;
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* component normalizer */
  function __vue_normalize__$t(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "UploadUserPhoto.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var UploadUserPhoto = __vue_normalize__$t(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    undefined,
    undefined
  );



var Components = /*#__PURE__*/Object.freeze({
Autocomplete: Autocomplete,
ButtonDropdown: ButtonDropdown,
Chart: Chart$1,
ChartPanel: ChartPanel,
ComboBox: ComboBox,
ComboBoxItem: ComboBoxItem,
DataTable: DataTable,
DatePicker: DatePicker,
Draggable: Draggable,
Grid: Grid,
GridItem: GridItem,
JsonEditor: JsonEditor,
JsonEditorIaf: JsonEditorIaf,
JsonEditorView: JsonEditorView,
JsonEditorViewArray: JsonEditorViewArray,
Moment: Moment,
Notifications: Notifications,
Overlay: Overlay,
Pagination: Pagination,
Password: Password,
PdfViewer: PdfViewer,
Ripple: Ripple,
Tab: Tab,
TabBar: TabBar,
TabContainer: TabContainer,
TreeView: TreeView,
TreeViewItem: TreeViewItem,
Uploader: Uploader,
UploaderPhoto: UploaderPhoto,
UploadUserPhoto: UploadUserPhoto
});

function getCookie(name) {
  name = "".concat(name, "=");
  var decoded = decodeURIComponent(document.cookie);
  var cookies = decoded.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];

    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(name) === 0) return JSON.parse(decodeURIComponent(cookie.substring(name.length)));
  }

  return undefined;
}
function setCookie(name, value) {
  var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 21;
  var date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = "".concat(name, "=").concat(encodeURIComponent(JSON.stringify(value)), ";expires=").concat(date.toUTCString(), ";path=/");
}
var cookie = {
  getCookie: getCookie,
  setCookie: setCookie
};

function createRootComponent() {
  document.body.dataset.theme = document.body.dataset.theme || getCookie("$ui:theme") || "light";
  return new Vue({
    el: "main#app",
    created: function created() {
      var _this = this;

      on("latte:switch-theme", function (data) {
        return _this.onSwitchTheme(data);
      });
      window.addEventListener("hashchange", onHashChange, false);
    },
    mounted: function mounted() {
      installServiceWorker();
      onHashChange();
      removeQueryString();
    },
    methods: {
      onSwitchTheme: function onSwitchTheme(data) {
        if (!("themeId" in data)) return;
        var themeId = data.themeId;
        document.body.dataset.theme = themeId;
        setCookie("$ui:theme", themeId);
      }
    }
  });
}

function installServiceWorker() {
  if (!("LatteSW" in window)) return;
  if (!("serviceWorker" in navigator)) return;
  if (!window.isSecureContext) return;
  navigator.serviceWorker.getRegistration().then(function (registration) {
    if (registration !== undefined) return registration.update();
    navigator.serviceWorker.register("/service-worker.js").then(function () {
      return console.debug("Service Worker installed!");
    }).catch(function (err) {
      return console.error("Service Worker not installed due to an error.", err);
    });
  });
}

function onHashChange() {
  var hash = location.hash.substr(1);
  if (!hash || hash.length === 0) return;
  var raw = hash.split("&");
  var parameters = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = raw[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var kv = item.split("=", 2);
      var value = kv[1] || null;
      var vars = {};

      if (value.indexOf("/") > -1) {
        var ad = value.split("/");
        value = ad.shift();
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = ad[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var d = _step2.value;

            var _kv = d.split(":", 2);

            vars[_kv[0]] = _kv[1];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      parameters[kv[0]] = {
        value: value,
        vars: vars
      };
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  dispatch("latte:hash-change", parameters);
}

function removeQueryString() {
  var queryString = window.location.search.substr(1);
  if (queryString === "") return;
  if (queryString.substr(0, 6) === "saved=") history.replaceState(null, '', window.location.pathname || window.location.path);
}

function initializeForms() {
  querySelectorAll("form[method=\"post\"]").forEach(function (form) {
    return initializeForm(form);
  });
}

function initializeForm(form) {
  form.addEventListener("submit", onFormSubmit.bind(window, form));
  form.addEventListener("keyup", onFormKeyUp.bind(window, form));
}

function onFormKeyUp(form, evt) {
  if (evt.ctrlKey !== true) return;
  if ((evt.code || evt.key) !== "Enter") return;
  onFormSubmit(form);
  form.submit();
}

function onFormSubmit(form) {
  form.querySelectorAll(".btn[type=submit]").forEach(function (btn) {
    if (btn.classList.contains("btn-icon")) return;
    var icon = btn.querySelector("i.mdi");
    if (icon === null) return;
    icon.classList.add("spinner");
    if (btn.classList.contains("btn-light")) icon.classList.add("spinner-primary");else icon.classList.add("spinner-light");
    btn.classList.add("disabled");
  });
}

function initializePanels() {
  querySelectorAll("div.panel > table").forEach(function (table) {
    return closest(table, "div.panel").classList.add("panel-table");
  });
  querySelectorAll("div.panel.panel-toggleable").forEach(function (panel) {
    return initializePanel(panel);
  });
}
function initializePanel(panel) {
  var header = panel.querySelector("div.panel-header");
  if (header === null) return;
  var hasRightItems = header.querySelectorAll(".ml-auto").length > 0;
  var toggle = document.createElement("button");
  toggle.setAttribute("type", "button");
  toggle.classList.add("panel-toggle", "btn", "btn-text", "btn-icon", "btn-dark");
  if (!hasRightItems) toggle.classList.add("ml-auto");
  toggle.innerHTML = '<i class="mdi mdi-chevron-down"></i>';
  header.appendChild(toggle);
  if (panel.classList.contains("is-open")) open$1(panel);else close$1(panel);
  toggle.addEventListener("click", function () {
    if (panel.classList.contains("is-open")) close$1(panel);else open$1(panel);
  });
}
function close$1(panel) {
  var p = panel;
  if (p.querySelector(":scope > form") !== null) p = p.querySelector(":scope > form");
  var hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");

  for (var i = 0; i < hidableItems.length; i++) {
    hidableItems.item(i).classList.add("d-none");
  }

  var toggle = p.querySelector("div.panel-header > button.panel-toggle");
  toggle.querySelector("i.mdi").classList.remove("mdi-rotate-180");
  panel.classList.add("is-closed");
  panel.classList.remove("is-open");
}
function open$1(panel) {
  var p = panel;
  if (p.querySelector(":scope > form") !== null) p = p.querySelector(":scope > form");
  var hidableItems = p.querySelectorAll(":scope > div:not(.panel-header)");

  for (var i = 0; i < hidableItems.length; i++) {
    hidableItems.item(i).classList.remove("d-none");
  }

  var toggle = p.querySelector("div.panel-header > button.panel-toggle");
  toggle.querySelector("i.mdi").classList.add("mdi-rotate-180");
  panel.classList.remove("is-closed");
  panel.classList.add("is-open");
}
var panels = {
  close: close$1,
  initializePanel: initializePanel,
  open: open$1
};

var tooltipElement = null;
function initializeTooltips() {
  tooltipElement = createElement("div", function (div) {
    div.setAttribute("class", "tooltip is-hidden");
    document.body.appendChild(div);
  });
  live(document.body, "[data-tooltip]", "pointerover", function (el, evt) {
    return onTooltipElementHover(el, evt);
  });
  live(document.body, "[data-tooltip]", "pointerout", function (el, evt) {
    return onTooltipElementLeave(el, evt);
  });
  on("latte:tooltip:hide", function () {
    return onTooltipElementLeave();
  });
}

function onTooltipElementHover(el) {
  var str = el.dataset.tooltip;
  var classes = el.dataset.tooltipClass || "tooltip-bottom";
  if (str.trim() === "") return;
  if (el.classList.contains("tooltip-disabled")) return;
  tooltipElement.innerHTML = str;
  tooltipElement.setAttribute("class", "tooltip ".concat(classes));
  tooltipElement.style.removeProperty("--tooltip-arrow-top");
  tooltipElement.style.removeProperty("--tooltip-arrow-left");
  var rect = el.getBoundingClientRect();
  var tRect = tooltipElement.getBoundingClientRect();
  var top = 0;
  var left = 0;
  var offset = 9;

  if (tooltipElement.classList.contains("tooltip-top")) {
    top = rect.top - tRect.height - offset;
    left = rect.left + (rect.width / 2 - tRect.width / 2);
  } else if (tooltipElement.classList.contains("tooltip-left")) {
    top = rect.top + (rect.height / 2 - tRect.height / 2);
    left = rect.left - tRect.width - offset;
  } else if (tooltipElement.classList.contains("tooltip-right")) {
    top = rect.top + (rect.height / 2 - tRect.height / 2);
    left = rect.left + rect.width + offset;
  } else if (tooltipElement.classList.contains("tooltip-bottom")) {
    top = rect.top + rect.height + offset;
    left = rect.left + (rect.width / 2 - tRect.width / 2);
  }

  if (tooltipElement.classList.contains("tooltip-contain")) {
    var _offset = 12;

    if (tooltipElement.classList.contains("tooltip-top") || tooltipElement.classList.contains("tooltip-bottom")) {
      var adj = 0;

      if (_offset > left) {
        adj = _offset - left;
        left += adj;
      }

      if (left + tRect.width + _offset > window.innerWidth) {
        adj = window.innerWidth - (left + tRect.width + _offset);
        left += adj;
      }

      if (adj !== 0) tooltipElement.style.setProperty("--tooltip-arrow-left", "calc((50% - .45em) - ".concat(Math.floor(adj), "px)"));
    }

    if (tooltipElement.classList.contains("tooltip-left") || tooltipElement.classList.contains("tooltip-right")) {
      var _adj = 0;

      if (_offset > top) {
        _adj = _offset - top;
        top += _adj;
      }

      if (top + tRect.height + _offset > window.innerHeight) {
        _adj = window.innerHeight - (top + tRect.height + _offset);
        top += _adj;
      }

      if (_adj !== 0) tooltipElement.style.setProperty("--tooltip-arrow-top", "calc((50% - .45em) - ".concat(Math.floor(_adj), "px)"));
    }
  }

  tooltipElement.style.setProperty("transform", "translate3d(".concat(Math.round(left), "px, ").concat(Math.round(top), "px, 0)"));
}

function onTooltipElementLeave() {
  tooltipElement.classList.add("is-hidden");
}

function copy(text) {
  navigator.clipboard.writeText(text).then(function () {
    return console.debug("[Clipboard] Text copied to clipboard!");
  }).catch(function (err) {
    return console.error(err);
  });
}
function paste() {
  return navigator.clipboard.readText().catch(function (err) {
    return console.error(err);
  });
}
var clipboard = {
  copy: copy,
  paste: paste
};

function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
}
var json = {
  isJson: isJson
};

function spaceship(a, b) {
  if (a === null || b === null || _typeof(a) !== _typeof(b)) return null;
  if (typeof a === "string") return a.localeCompare(b);
  if (a > b) return 1;else if (a < b) return -1;
  return 0;
}
var operators = {
  spaceship: spaceship
};

var Buttons = {
  OK: 1,
  CANCEL: 2,
  YES: 4,
  NO: 8,
  UPDATE: 16,
  SAVE: 32,
  REMOVE: 64,
  CREATE: 128,
  GO: 256,
  PROCEED: 512
};
var ButtonsDescribed = [{
  id: Buttons.OK,
  icon: "check-circle",
  label: "OK",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.CANCEL,
  icon: null,
  label: "Cancel",
  classes: ["btn-text", "btn-dark"],
  weight: 0
}, {
  id: Buttons.YES,
  icon: "check-circle",
  label: "Yes",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.NO,
  icon: null,
  label: "No",
  classes: ["btn-text", "btn-dark"],
  weight: 0
}, {
  id: Buttons.UPDATE,
  icon: "check-circle",
  label: "Update",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.SAVE,
  icon: "check-circle",
  label: "Save",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.REMOVE,
  icon: "alert-circle",
  label: "Remove",
  classes: "error",
  weight: 1
}, {
  id: Buttons.CREATE,
  icon: "check-circle",
  label: "Create",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.GO,
  icon: "arrow-right-bold-circle",
  label: "Go",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.PROCEED,
  icon: "arrow-right-bold-circle",
  label: "Proceed",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}];
function createMessage(title, message, buttons) {
  var prompt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve) {
    var overlay = createElement("div", function (el) {
      return el.classList.add("latte-overlay", "is-visible");
    });
    var panel = createElement("div", function (el) {
      return el.classList.add("panel", "panel-alert");
    });
    var panelTitle = createElement("div", function (el) {
      return el.classList.add("panel-header");
    });
    var panelContent = createElement("div", function (el) {
      return el.classList.add("panel-body");
    });
    var panelFooter = createElement("div", function (el) {
      return el.classList.add("panel-footer", "justify-content-end");
    });
    overlay.style.setProperty("z-index", "7000000");
    overlay.setAttribute("role", "dialog");
    var promptInput;
    buttons = buttonsToButtons(buttons);
    panelTitle.appendChild(createElement("span", function (span) {
      span.classList.add("panel-title");
      span.innerHTML = title;
    }));
    panelContent.appendChild(createElement("p", function (p) {
      return p.innerHTML = message;
    }));

    if (prompt) {
      var formGroup = createElement("div", function (el) {
        return el.classList.add("form-group", "mb-0");
      });
      promptInput = createElement("input", function (el) {
        el.classList.add("form-control");
        el.setAttribute("type", "text");
        formGroup.appendChild(el);
      });
      panelContent.appendChild(formGroup);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var button = _step.value;
        var el = createElement("button", function (el) {
          var _el$classList;

          return (_el$classList = el.classList).add.apply(_el$classList, ["btn", "btn-contained"].concat(_toConsumableArray(button.classes)));
        });
        if (button.icon !== null) el.appendChild(createElement("i", function (i) {
          return i.classList.add("mdi", "mdi-".concat(button.icon));
        }));
        el.appendChild(createElement("span", function (span) {
          return span.innerHTML = button.label;
        }));
        el.addEventListener("click", function () {
          timeout(0, function () {
            return overlay.classList.remove("is-open");
          });
          timeout(270, function () {
            return overlay.classList.remove("is-visible");
          });
          resolve({
            button: button.id,
            input: prompt ? promptInput.value : undefined
          });
        });
        panelFooter.appendChild(el);
      };

      for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    panel.appendChild(panelTitle);
    panel.appendChild(panelContent);
    panel.appendChild(panelFooter);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    timeout(0, function () {
      return overlay.classList.add("is-visible");
    });
    timeout(20, function () {
      return overlay.classList.add("is-open");
    });
  });
}
function alert(title, message) {
  return createMessage(title, message, Buttons.OK);
}
function confirm(title, message) {
  return createMessage(title, message, Buttons.OK | Buttons.CANCEL);
}
function prompt(title, message) {
  return createMessage(title, message, Buttons.OK | Buttons.CANCEL, true);
}

function buttonsToButtons(buttons) {
  var actualButtons = [];

  for (var _i = 0; _i < ButtonsDescribed.length; _i++) {
    var button = ButtonsDescribed[_i];
    if ((buttons & button.id) === button.id) actualButtons.push(button);
  }

  actualButtons = actualButtons.sort(function (a, b) {
    return spaceship(a.weight, b.weight);
  });
  actualButtons.forEach(function (button) {
    return button.label = translate("root", button.label);
  });
  return actualButtons;
}

var messages = {
  Buttons: Buttons,
  ButtonsDescribed: ButtonsDescribed,
  createMessage: createMessage,
  alert: alert,
  confirm: confirm,
  prompt: prompt
};

Array.prototype.contains = function (needle) {
  return this.indexOf(needle) > -1;
};

window.Latte = {
  actions: actions$1,
  api: api,
  clipboard: clipboard,
  cookie: cookie,
  core: core,
  dom: dom,
  i18n: i18n,
  json: json,
  messages: messages,
  notices: notices,
  operators: operators,
  overlays: overlays,
  panels: panels,
  vue: Vue
};

var State = new Vue({
  data: function data() {
    return {
      isCompact: getCookie("$ui:collapsed") === true,
      isNavOpen: false
    };
  },
  methods: {
    toggleNav: function toggleNav() {
      this.isCompact = !this.isCompact;
      this.isNavOpen = !this.isNavOpen;
    }
  },
  watch: {
    isCompact: function isCompact() {
      setCookie("$ui:collapsed", this.isCompact);
      if (this.isCompact) querySelectorAll("[data-ui-is-compact]").forEach(function (el) {
        return el.classList.add("is-compact");
      });else querySelectorAll("[data-ui-is-compact]").forEach(function (el) {
        return el.classList.remove("is-compact");
      });
    },
    isNavOpen: function isNavOpen() {
      if (this.isNavOpen) querySelectorAll("[data-ui-is-nav-open]").forEach(function (el) {
        return el.classList.add("is-nav-open");
      });else querySelectorAll("[data-ui-is-nav-open]").forEach(function (el) {
        return el.classList.remove("is-nav-open");
      });
    }
  }
});

Vue.mixin({
  beforeCreate: function beforeCreate() {
    this["$ui"] = State;
  }
});

var handler = "latte:clickaway-handler";

function bind(el, binding) {
  unbind(el);
  var callback = binding.value;
  var initialMactroTaskEnded = false;
  if (typeof callback !== "function") return;
  timeout(0, function () {
    return initialMactroTaskEnded = true;
  });

  el[handler] = function (evt) {
    if (initialMactroTaskEnded && !el.contains(evt.target)) return callback(evt);
  };

  document.documentElement.addEventListener("click", el[handler], {
    passive: true
  });
}

function unbind(el) {
  document.documentElement.removeEventListener("click", el[handler]);
  delete el[handler];
}

function update(el, binding) {
  if (binding.value === binding.oldValue) return;
  bind(el, binding);
}

var ClickAway = {
  bind: bind,
  unbind: unbind,
  update: update
};

var ContextMenu = {
  bind: function bind(element) {
    var contextMenu = element.contextMenuInstance = element.querySelector(":scope > nav.latte-context-menu:not(.is-inline)");
    if (contextMenu === null) return;
    element.removeChild(contextMenu);
    document.body.appendChild(contextMenu);

    var contextMenuCloseHandler = function contextMenuCloseHandler(event) {
      if (event.cancelable) {
        event.preventDefault();
        event.stopPropagation();
      }

      contextMenu.classList.remove("is-open");
      document.body.classList.remove("is-context-menu-open");
      document.scrollingElement.removeEventListener("scroll", contextMenuCloseHandler);
      document.body.removeEventListener("mousedown", contextMenuCloseHandler);
    };

    var contextMenuItemDownHandler = element.contextMenuItemDownHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };

    var contextMenuItemUpHandler = element.contextMenuItemUpHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();
      contextMenuCloseHandler(event);
    };

    var contextMenuHandler = element.contextMenuHandler = function (event) {
      event.preventDefault();
      event.stopPropagation();
      contextMenu.classList.add("is-open");
      var offset = 9;
      var rect = contextMenu.getBoundingClientRect();
      var x = event.pageX - document.scrollingElement.scrollLeft;
      var y = event.pageY - document.scrollingElement.scrollTop; // Place context menu on other side.

      if (x + rect.width + offset > window.innerWidth) x = x - rect.width;
      if (y + rect.height + offset > window.innerHeight) y = y - rect.height; // Never leave win, but that's it.

      if (x + rect.width + offset > window.innerWidth) x = window.innerWidth - (rect.width + offset);
      if (y + rect.height + offset > window.innerHeight) y = window.innerHeight - (rect.height + offset);
      contextMenu.style.top = "".concat(y, "px");
      contextMenu.style.left = "".concat(x, "px");
      document.body.classList.add("is-context-menu-open");
      document.body.addEventListener("mousedown", contextMenuCloseHandler);
      window.addEventListener("scroll", contextMenuCloseHandler, {
        passive: true
      });
      document.dispatchEvent(new CustomEvent("latte:context-menu", {
        detail: {
          menu: contextMenu,
          open: true
        }
      }));
    };

    element.addEventListener("contextmenu", contextMenuHandler);
    contextMenu.addEventListener("mousedown", contextMenuItemDownHandler);
    contextMenu.addEventListener("mouseup", contextMenuItemUpHandler);
  },
  unbind: function unbind(element) {
    if (typeof element.contextMenuInstance === "undefined" || element.contextMenuInstance === null) return;
    element.contextMenuInstance.addEventListener("mousedown", event.contextMenuItemDownHandler);
    element.contextMenuInstance.addEventListener("mouseup", event.contextMenuItemUpHandler);
    document.body.removeChild(element.contextMenuInstance);
    element.appendChild(element.contextMenuInstance);
    element.removeEventListener("contextmenu", element.contextMenuHandler);
    document.dispatchEvent(new CustomEvent("latte:context-menu", {
      detail: {
        menu: element.contextMenuInstance,
        open: false
      }
    }));
  }
};

Vue.directive("click-away", ClickAway);
Vue.directive("latte-context-menu", ContextMenu);

var script$u = {
  name: "latte-view-dashboard",
  data: function data() {
    return {
      columns: 12,
      isLoading: true,
      widgets: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    request("/api/latte/widgets").then(function (r) {
      return r.json();
    }).then(function (r) {
      return _this.onReceivedWidgets(r);
    }).catch(function (err) {
      return handleError$1(err, function () {
        return _this.isLoading = false;
      });
    });
    window.addEventListener("resize", function () {
      return _this.onResize();
    }, {
      passive: true
    });
  },
  methods: {
    insertWidget: function insertWidget(type) {
      var _this2 = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var data = {
        dashboard: "private",
        type: type
      };
      request("/api/latte/widgets", {
        body: JSON.stringify(data),
        method: "POST"
      }).then(function (r) {
        return r.json();
      }).then(function (r) {
        return console.log(r);
      }).catch(function (err) {
        return create(err.message, "error", true);
      }).then(function () {
        return _this2.isLoading = false;
      });
    },
    onReceivedWidgets: function onReceivedWidgets(response) {
      this.widgets = response.data;
      this.onResize();
      this.isLoading = false;
    },
    onResize: function onResize() {
      var columns = 12;
      if (window.innerWidth < 1600) columns = 8;
      if (window.innerWidth < 1400) columns = 6;
      if (window.innerWidth < 1000) columns = 4;
      if (window.innerWidth < 600) columns = 2;
      if (window.innerWidth < 400) columns = 1;
      this.columns = columns;
    },
    onWidgetMoved: function onWidgetMoved(id, x, y) {
      for (var i in this.widgets) {
        if (!this.widgets.hasOwnProperty(i) || this.widgets[i].id !== id) continue;
        this.widgets[i].x = x;
        this.widgets[i].y = y;
      }
    },
    onWidgetResized: function onWidgetResized(id, height, width) {
      for (var i in this.widgets) {
        if (!this.widgets.hasOwnProperty(i) || this.widgets[i].id !== id) continue;
        this.widgets[i].height = height;
        this.widgets[i].width = width;
      }
    }
  }
};

/* script */
            const __vue_script__$u = script$u;
            
/* template */

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = undefined;
  /* component normalizer */
  function __vue_normalize__$u(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Dashboard.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Dashboard = __vue_normalize__$u(
    {},
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    undefined,
    undefined
  );

var script$v = {
  name: "latte-view-login",
  props: {
    redirect: {
      default: "/admin",
      requireed: false,
      typ: String
    }
  },
  data: function data() {
    return {
      error: null,
      field: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    try {
      if (!("credentials" in navigator)) return;
      navigator.credentials.get({
        mediation: "required",
        password: true
      }).then(function (credentials) {
        _this.isLoading = false;
        if (credentials === null) return;
        _this.field.email = credentials.id;
        _this.field.password = credentials.password;

        _this.submit();
      });
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    onLoginError: function onLoginError(err) {
      console.error("ERROR", err);
      this.error = {
        code: 0,
        message: "Fatal system error, see devtools for more information.",
        type: "error"
      };
      this.isLoading = false;
    },
    onLoginResponse: function onLoginResponse(response) {
      var _this2 = this;

      if (response.data && response.data.login && response.data.login === 'ok') {
        if ("credentials" in navigator) {
          var options = {
            id: this.field.email,
            password: this.field.password,
            name: response.data.user.name
          };
          if (response.data.user.photo !== null) options.iconURL = response.data.user.photo.thumb_512;
          navigator.credentials.create({
            password: options
          }).then(function (credentials) {
            navigator.credentials.store(credentials).then(function () {
              return window.location = _this2.redirect;
            }).catch(function (err) {
              return console.error(err);
            });
          }).catch(function (err) {
            console.error(err);
            window.location = _this2.redirect;
          });
          return;
        }

        window.location = this.redirect;
        return;
      }

      this.error = response.error;
      this.isLoading = false;
    },
    submit: function submit() {
      var _this3 = this;

      if (this.isLoading) return;
      this.isLoading = true;
      var json = JSON.stringify({
        email: this.field.email,
        password: this.field.password
      });
      request('/api/latte/login', {
        body: json,
        method: "POST"
      }).then(function (r) {
        return r.json();
      }).then(function (r) {
        return _this3.onLoginResponse(r);
      }).catch(function (err) {
        return _this3.onLoginError(err);
      });
    }
  }
};

/* script */
            const __vue_script__$v = script$v;
            
/* template */

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = undefined;
  /* component normalizer */
  function __vue_normalize__$v(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Login.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Login = __vue_normalize__$v(
    {},
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    undefined,
    undefined
  );

//
var USER_CACHE = {};
var script$w = {
  name: "latte-profile-popover",
  data: function data() {
    return {
      associatedElement: null,
      associatedElementPosition: {
        x: 0,
        y: 0
      },
      dropdownPosition: {
        x: 0,
        y: 0
      },
      isCloseByClickAwayAvailable: false,
      isLoading: true,
      isOpen: false,
      user: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    on("latte:profile:popover:open", function (_ref, el) {
      var userId = _ref.userId;
      return _this.open(el, parseInt(userId));
    });
  },
  computed: {
    dropdownClasses: function dropdownClasses() {
      var aboveUnder = this.associatedElementPosition.y > window.innerHeight / 2 ? "above" : "under";
      var position = this.associatedElementPosition.x > window.innerWidth / 2 ? "right" : "left";
      var classes = ["dropdown", "dropdown-at-root", "dropdown-".concat(position, "-").concat(aboveUnder)];
      if (this.isOpen === true) classes.push("is-open");
      return classes;
    },
    dropdownStyle: function dropdownStyle() {
      return {
        transform: "translate3d(".concat(this.dropdownPosition.x, "px, ").concat(this.dropdownPosition.y, "px, 0)"),
        width: "240px"
      };
    },
    dropdown: function dropdown() {
      return this.$refs.dropdown;
    },
    profileUrl: function profileUrl() {
      if (this.user === null) return "#";
      return "/admin/user/".concat(this.user.id);
    }
  },
  methods: {
    calculatePosition: function calculatePosition() {
      var associatedElementRect = this.associatedElement.getBoundingClientRect();
      var dropdownElementRect = this.dropdown.getBoundingClientRect();
      var px = this.associatedElementPosition.x > window.innerWidth / 2 ? "right" : "left";
      var py = this.associatedElementPosition.y > window.innerHeight / 2 ? "above" : "under";
      var x = associatedElementRect.left - associatedElementRect.width / 2;
      var y = associatedElementRect.top + associatedElementRect.height;
      if (px === "right") x = associatedElementRect.left + associatedElementRect.width - (dropdownElementRect.width - associatedElementRect.width / 2);
      if (py === "above") y = associatedElementRect.top - dropdownElementRect.height;
      var margin = {
        x: 6,
        y: 8 + (this.isOpen ? 0 : 24)
      };
      this.dropdownPosition.x = Math.round(x + (px === "left" ? -margin.x : margin.x));
      this.dropdownPosition.y = Math.round(y + (py === "under" ? margin.y : -margin.y));
    },
    close: function close() {
      this.isCloseByClickAwayAvailable = false;
      this.isOpen = false;
      this.calculatePosition();
    },
    closeByClickAway: function closeByClickAway() {
      if (!this.isCloseByClickAwayAvailable) return;
      this.close();
    },
    open: function open(el, userId) {
      var _this2 = this;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          x = _el$getBoundingClient.x,
          y = _el$getBoundingClient.y,
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      this.associatedElement = el;
      this.associatedElementPosition = {
        x: x + width / 2,
        y: y + height / 2
      };
      this.isCloseByClickAwayAvailable = false;
      this.isLoading = true;
      this.isOpen = true;
      timeout(300, function () {
        return _this2.isCloseByClickAwayAvailable = true;
      });
      this.calculatePosition();

      if (userId in USER_CACHE) {
        this.onReceivedUser({
          data: USER_CACHE[userId]
        });
      } else {
        request("/api/users/".concat(userId)).then(function (r) {
          return r.json();
        }).then(function (r) {
          return _this2.onReceivedUser(r);
        }).catch(function (err) {
          return handleError(err);
        });
      }
    },
    onReceivedUser: function onReceivedUser(response) {
      var _this3 = this;

      this.isLoading = false;

      if (response.data && response.data.id) {
        USER_CACHE[response.data.id] = this.user = response.data;
        this.$nextTick(function () {
          return _this3.calculatePosition();
        });
      } else {
        this.close();
      }
    }
  }
};

/* script */
            const __vue_script__$w = script$w;
            
/* template */
var __vue_render__$t = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-away",rawName:"v-click-away",value:(_vm.closeByClickAway),expression:"closeByClickAway"}],ref:"dropdown",staticClass:"panel",class:_vm.dropdownClasses,style:(_vm.dropdownStyle)},[(!_vm.isLoading)?_c('div',{staticClass:"dropdown-content profile-popover"},[_c('div',{staticClass:"panel-header"},[_c('img',{staticClass:"avatar mr-3",staticStyle:{"font-size":"36px"},attrs:{"src":_vm.user['photo']['thumb_128'],"alt":_vm.user.name}}),_vm._v(" "),_c('span',{staticClass:"panel-title"},[_vm._v(_vm._s(_vm.user.name))])]),_vm._v(" "),_c('nav',{staticClass:"nav nav-list"},[_c('a',{staticClass:"nav-link",attrs:{"href":"#"}},[_c('i',{staticClass:"mdi mdi-phone"}),_c('span',[_vm._v("Call "+_vm._s(_vm.user["firstname"]))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",attrs:{"href":"#"}},[_c('i',{staticClass:"mdi mdi-email"}),_c('span',[_vm._v("Email "+_vm._s(_vm.user["firstname"]))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",attrs:{"href":_vm.profileUrl}},[_c('i',{staticClass:"mdi mdi-account-card-details"}),_c('span',[_vm._v("View profile")])])])]):_c('div',{staticClass:"dropdown-content px-5 py-3"},[_c('span',{staticClass:"spinner spinner-primary"})])])};
var __vue_staticRenderFns__$t = [];

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* component normalizer */
  function __vue_normalize__$w(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "ProfilePopover.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var ProfilePopover = __vue_normalize__$w(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );

Vue.component("latte-view-dashboard", Dashboard);
Vue.component("latte-view-login", Login);
Vue.component("latte-profile-popover", ProfilePopover);

//
var script$x = {
  name: "latte-widget",
  props: {
    customBody: {
      default: false,
      required: false,
      type: Boolean
    },
    widgetId: {
      type: Number,
      required: true
    }
  },
  data: function data() {
    return {
      i18n: {
        delete: "Delete",
        widgetDeleteConfirmationTitle: "Are you sure?",
        widgetDeleteConfirmationBody: "This widget will be deleted permanently!"
      }
    };
  },
  mounted: function mounted() {
    this.i18n = forObject(this.i18n);
  },
  methods: {
    removeWidget: function removeWidget() {
      var _this = this;

      confirm(this.i18n.widgetDeleteConfirmationTitle, this.i18n.widgetDeleteConfirmationBody).then(function (r) {
        if (r.button !== Buttons.OK) return;

        _this.$emit("remove", _this.widgetId);
      });
    }
  }
};

/* script */
            const __vue_script__$x = script$x;
            
/* template */
var __vue_render__$u = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel widget",class:{'is-custom-body': _vm.customBody},attrs:{"tabindex":"0"}},[_c('div',{staticClass:"panel-header"},[_c('div',{staticClass:"widget-drag-handle grid-item-drag-handle"}),_vm._v(" "),_vm._t("custom_title"),_vm._v(" "),_c('div',{staticClass:"ml-auto d-flex flex-row align-items-center"},[_vm._t("title"),_vm._v(" "),_c('latte-button-dropdown',{attrs:{"icon":"dots-vertical","small":true,"type":"list"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._t("widget_menu"),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":function($event){_vm.removeWidget();}}},[_c('i',{staticClass:"mdi mdi-delete"}),_vm._v(" "),_c('span',[_vm._v("Delete widget")])])],2)])],2)],2),_vm._v(" "),_c('div',{staticClass:"panel-body"},[_vm._t("content")],2),_vm._v(" "),_vm._t("footer")],2)};
var __vue_staticRenderFns__$u = [];

  /* style */
  const __vue_inject_styles__$x = undefined;
  /* scoped */
  const __vue_scope_id__$x = undefined;
  /* module identifier */
  const __vue_module_identifier__$x = undefined;
  /* functional template */
  const __vue_is_functional_template__$x = false;
  /* component normalizer */
  function __vue_normalize__$x(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "Widget.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var Widget = __vue_normalize__$x(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    undefined,
    undefined
  );

//
var script$y = {
  name: "latte-widget-today",
  props: {
    widgetId: {
      required: true,
      type: Number
    }
  },
  data: function data() {
    return {
      currentDate: "",
      currentDay: "",
      currentMonth: "",
      currentYear: "",
      currentTimeHours: "",
      currentTimeMinutes: "",
      currentTimeSeconds: "",
      currentWeekNumber: ""
    };
  },
  mounted: function mounted() {
    this.update();
  },
  methods: {
    onRemove: function onRemove(evt) {
      this.$emit("remove", evt);
    },
    update: function update() {
      var _this = this;

      var now = moment();
      this.currentDate = now.format("D");
      this.currentDay = now.format("dddd");
      this.currentMonth = now.format("MMMM");
      this.currentYear = now.format("YYYY");
      this.currentTimeHours = now.format("HH");
      this.currentTimeMinutes = now.format("mm");
      this.currentTimeSeconds = now.format("ss");
      this.currentWeekNumber = now.week();
      timeout(250, function () {
        return _this.update();
      });
    }
  }
};

/* script */
            const __vue_script__$y = script$y;
            
/* template */
var __vue_render__$v = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('latte-widget',_vm._b({staticClass:"widget-today",attrs:{"custom-body":true},on:{"remove":_vm.onRemove}},'latte-widget',_vm.$props,false),[_c('div',{staticClass:"widget-today-datetime",attrs:{"slot":"content"},slot:"content"},[_c('div',{staticClass:"date"},[_c('span',{staticClass:"day text-capitalize"},[_vm._v(_vm._s(_vm.currentDay))]),_vm._v(" "),_c('span',{staticClass:"date"},[_vm._v(_vm._s(_vm.currentDate))]),_vm._v(" "),_c('span',{staticClass:"monthyear text-capitalize"},[_vm._v(_vm._s(_vm.currentMonth)+" "+_vm._s(_vm.currentYear)+" — Week "+_vm._s(_vm.currentWeekNumber))])]),_vm._v(" "),_c('div',{staticClass:"time"},[_c('span',{attrs:{"id":"hours"}},[_vm._v(_vm._s(_vm.currentTimeHours))]),_c('span',{staticClass:"dots"},[_vm._v(":")]),_c('span',{attrs:{"id":"minutes"}},[_vm._v(_vm._s(_vm.currentTimeMinutes))]),_c('span',{attrs:{"id":"seconds"}},[_c('span',{staticClass:"dots"},[_vm._v(":")]),_vm._v(_vm._s(_vm.currentTimeSeconds))])])])])};
var __vue_staticRenderFns__$v = [];

  /* style */
  const __vue_inject_styles__$y = undefined;
  /* scoped */
  const __vue_scope_id__$y = undefined;
  /* module identifier */
  const __vue_module_identifier__$y = undefined;
  /* functional template */
  const __vue_is_functional_template__$y = false;
  /* component normalizer */
  function __vue_normalize__$y(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "WidgetToday.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    return component
  }
  /* style inject */
  
  /* style inject SSR */
  

  
  var WidgetToday = __vue_normalize__$y(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    undefined,
    undefined
  );

Vue.component("latte-widget", Widget);
Vue.component("latte-widget-today", WidgetToday);

Object.values(Components).forEach(function (c) {
  return Vue.component(c.name, c);
});
moment.locale(window["LatteMomentLocale"] || "en");
window.addEventListener("DOMContentLoaded", function () {
  createRootComponent();
  initializeForms();
  initializeNotices();
  initializePanels();
  initializeTooltips();
});

}());
