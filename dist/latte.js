(function () {
'use strict';

var currentZ = 2000;
/**
 * Generates a z-value to be used with z-index.
 *
 * @param {Function} fn
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function needsZIndex(fn) {
  fn(currentZ);
  currentZ++;
}

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

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  }

  var defaultProps = type && type.defaultProps;
  var childrenLength = arguments.length - 3;

  if (!props && childrenLength !== 0) {
    props = {
      children: void 0
    };
  }

  if (props && defaultProps) {
    for (var propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  } else if (!props) {
    props = defaultProps || {};
  }

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = new Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }

    props.children = childArray;
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key === undefined ? null : '' + key,
    ref: null,
    props: props,
    _owner: null
  };
}

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      method = iterable[Symbol.iterator];
      if (method != null) return method.call(iterable);
    }
  }

  throw new TypeError("Object is not async iterable");
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  if (Object.getOwnPropertySymbols) {
    var objectSymbols = Object.getOwnPropertySymbols(descs);

    for (var i = 0; i < objectSymbols.length; i++) {
      var sym = objectSymbols[i];
      var desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, sym, desc);
    }
  }

  return obj;
}

function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
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

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = _superPropBase(target, property);

      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }

      desc = Object.getOwnPropertyDescriptor(receiver, property);

      if (desc) {
        if (!desc.writable) {
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        _defineProperty(receiver, property, value);
      }

      return true;
    };
  }

  return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);

  if (!s && isStrict) {
    throw new Error('failed to set property');
  }

  return value;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _temporalRef(val, name) {
  if (val === _temporalUndefined) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
}

function _readOnlyError(name) {
  throw new Error("\"" + name + "\" is read-only");
}

function _classNameTDZError(name) {
  throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}

var _temporalUndefined = {};

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _slicedToArrayLoose(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _iterableToArrayLimitLoose(arr, i) {
  var _arr = [];

  for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
    _arr.push(_step.value);

    if (i && _arr.length === i) break;
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _skipFirstGeneratorNext(fn) {
  return function () {
    var it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.');
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var id = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver).value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  var descriptor = privateMap.get(receiver);

  if (!descriptor.writable) {
    throw new TypeError("attempted to set read only private field");
  }

  descriptor.value = value;
  return value;
}

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  return descriptor.value;
}

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }

  if (!descriptor.writable) {
    throw new TypeError("attempted to set read only private field");
  }

  descriptor.value = value;
  return value;
}

function _decorate(decorators, factory, superClass) {
  var r = factory(function initialize(O) {
    _initializeInstanceElements(O, decorated.elements);
  }, superClass);

  var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);

  _initializeClassElements(r.F, decorated.elements);

  return _runClassFinishers(r.F, decorated.finishers);
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
    Object.defineProperty(def.value, "name", {
      value: typeof key === "symbol" ? "" : key,
      configurable: true
    });
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _initializeClassElements(F, elements) {
  var proto = F.prototype;
  ["method", "field"].forEach(function (kind) {
    elements.forEach(function (element) {
      var placement = element.placement;

      if (element.kind === kind && (placement === "static" || placement === "prototype")) {
        var receiver = placement === "static" ? F : proto;

        _defineClassElement(receiver, element);
      }
    });
  });
}

function _initializeInstanceElements(O, elements) {
  ["method", "field"].forEach(function (kind) {
    elements.forEach(function (element) {
      if (element.kind === kind && element.placement === "own") {
        _defineClassElement(O, element);
      }
    });
  });
}

function _defineClassElement(receiver, element) {
  var descriptor = element.descriptor;

  if (element.kind === "field") {
    var initializer = element.initializer;
    descriptor = {
      enumerable: descriptor.enumerable,
      writable: descriptor.writable,
      configurable: descriptor.configurable,
      value: initializer === void 0 ? void 0 : initializer.call(receiver)
    };
  }

  Object.defineProperty(receiver, element.key, descriptor);
}

function _decorateClass(elements, decorators) {
  var newElements = [];
  var finishers = [];
  var placements = {
    static: [],
    prototype: [],
    own: []
  };
  elements.forEach(function (element) {
    _addElementPlacement(element, placements);
  });
  elements.forEach(function (element) {
    if (!_hasDecorators(element)) return newElements.push(element);

    var elementFinishersExtras = _decorateElement(element, placements);

    newElements.push(elementFinishersExtras.element);
    newElements.push.apply(newElements, elementFinishersExtras.extras);
    finishers.push.apply(finishers, elementFinishersExtras.finishers);
  });

  if (!decorators) {
    return {
      elements: newElements,
      finishers: finishers
    };
  }

  var result = _decorateConstructor(newElements, decorators);

  finishers.push.apply(finishers, result.finishers);
  result.finishers = finishers;
  return result;
}

function _addElementPlacement(element, placements, silent) {
  var keys = placements[element.placement];

  if (!silent && keys.indexOf(element.key) !== -1) {
    throw new TypeError("Duplicated element (" + element.key + ")");
  }

  keys.push(element.key);
}

function _decorateElement(element, placements) {
  var extras = [];
  var finishers = [];

  for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
    var keys = placements[element.placement];
    keys.splice(keys.indexOf(element.key), 1);

    var elementObject = _fromElementDescriptor(element);

    var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);

    element = elementFinisherExtras.element;

    _addElementPlacement(element, placements);

    if (elementFinisherExtras.finisher) {
      finishers.push(elementFinisherExtras.finisher);
    }

    var newExtras = elementFinisherExtras.extras;

    if (newExtras) {
      for (var j = 0; j < newExtras.length; j++) {
        _addElementPlacement(newExtras[j], placements);
      }

      extras.push.apply(extras, newExtras);
    }
  }

  return {
    element: element,
    finishers: finishers,
    extras: extras
  };
}

function _decorateConstructor(elements, decorators) {
  var finishers = [];

  for (var i = decorators.length - 1; i >= 0; i--) {
    var obj = _fromClassDescriptor(elements);

    var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj);

    if (elementsAndFinisher.finisher !== undefined) {
      finishers.push(elementsAndFinisher.finisher);
    }

    if (elementsAndFinisher.elements !== undefined) {
      elements = elementsAndFinisher.elements;

      for (var j = 0; j < elements.length - 1; j++) {
        for (var k = j + 1; k < elements.length; k++) {
          if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
            throw new TypeError("Duplicated element (" + elements[j].key + ")");
          }
        }
      }
    }
  }

  return {
    elements: elements,
    finishers: finishers
  };
}

function _fromElementDescriptor(element) {
  var obj = {
    kind: element.kind,
    key: element.key,
    placement: element.placement,
    descriptor: element.descriptor
  };
  var desc = {
    value: "Descriptor",
    configurable: true
  };
  Object.defineProperty(obj, Symbol.toStringTag, desc);
  if (element.kind === "field") obj.initializer = element.initializer;
  return obj;
}

function _toElementDescriptors(elementObjects) {
  if (elementObjects === undefined) return;
  return _toArray(elementObjects).map(function (elementObject) {
    var element = _toElementDescriptor(elementObject);

    _disallowProperty(elementObject, "finisher", "An element descriptor");

    _disallowProperty(elementObject, "extras", "An element descriptor");

    return element;
  });
}

function _toElementDescriptor(elementObject) {
  var kind = String(elementObject.kind);

  if (kind !== "method" && kind !== "field") {
    throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
  }

  var key = _toPropertyKey(elementObject.key);

  var placement = String(elementObject.placement);

  if (placement !== "static" && placement !== "prototype" && placement !== "own") {
    throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
  }

  var descriptor = elementObject.descriptor;

  _disallowProperty(elementObject, "elements", "An element descriptor");

  var element = {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: Object.assign({}, descriptor)
  };

  if (kind !== "field") {
    _disallowProperty(elementObject, "initializer", "A method descriptor");
  } else {
    _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");

    _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");

    _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");

    element.initializer = elementObject.initializer;
  }

  return element;
}

function _toElementFinisherExtras(elementObject) {
  var element = _toElementDescriptor(elementObject);

  var finisher = _optionalCallableProperty(elementObject, "finisher");

  var extras = _toElementDescriptors(elementObject.extras);

  return {
    element: element,
    finisher: finisher,
    extras: extras
  };
}

function _fromClassDescriptor(elements) {
  var obj = {
    kind: "class",
    elements: elements.map(_fromElementDescriptor)
  };
  var desc = {
    value: "Descriptor",
    configurable: true
  };
  Object.defineProperty(obj, Symbol.toStringTag, desc);
  return obj;
}

function _toClassDescriptor(obj) {
  var kind = String(obj.kind);

  if (kind !== "class") {
    throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
  }

  _disallowProperty(obj, "key", "A class descriptor");

  _disallowProperty(obj, "placement", "A class descriptor");

  _disallowProperty(obj, "descriptor", "A class descriptor");

  _disallowProperty(obj, "initializer", "A class descriptor");

  _disallowProperty(obj, "extras", "A class descriptor");

  var finisher = _optionalCallableProperty(obj, "finisher");

  var elements = _toElementDescriptors(obj.elements);

  return {
    elements: elements,
    finisher: finisher
  };
}

function _disallowProperty(obj, name, objectType) {
  if (obj[name] !== undefined) {
    throw new TypeError(objectType + " can't have a ." + name + " property.");
  }
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

function _runClassFinishers(constructor, finishers) {
  for (var i = 0; i < finishers.length; i++) {
    var newConstructor = (0, finishers[i])(constructor);

    if (newConstructor !== undefined) {
      if (typeof newConstructor !== "function") {
        throw new TypeError("Finishers must return a constructor.");
      }

      constructor = newConstructor;
    }
  }

  return constructor;
}

"use strict";

function closest(element, selector) {
  for (; element && element !== document; element = element.parentNode) {
    if (element === selector || typeof selector === "string" && element.matches(selector)) return element;
  }

  return null;
}
function createElement(element) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var el = document.createElement(element);
  if (fn !== undefined) fn(el);
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
function isTouchOnlyDevice() {
  return "ontouchstart" in window;
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
  relativeCoordsTo: relativeCoordsTo,
  toDOM: toDOM
};

var OutsideEvent =
/*#__PURE__*/
function () {
  function OutsideEvent(source) {
    _classCallCheck(this, OutsideEvent);

    this.listeners = [];
    this.source = source;
  }

  _createClass(OutsideEvent, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      listener.id = this.listeners.length;
      this.listeners.push(listener);

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
      var index = this.listeners.findIndex(function (l) {
        return l.id === listener.id;
      });
      if (index === -1) return;
      document.removeEventListener(type, this.listeners[index], options);
      this.listeners.splice(index, 1);
    }
  }, {
    key: "isWithinSource",
    value: function isWithinSource(evt) {
      if (evt.pageX === undefined) return false;
      var documentElement = document.scrollingElement;
      var element = document.elementFromPoint(evt.pageX - documentElement.scrollLeft, evt.pageY - documentElement.scrollTop);
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

(function () {
  if (typeof PointerEvent !== "undefined") return; // Yay for this browser!

  var isATouchOnlyDevice = isTouchOnlyDevice();
  var events = {
    click: ["click", "tap"],
    pointerdown: ["mousedown", "touchstart"],
    pointermove: ["mousemove", "touchmove"],
    pointerover: ["mouseover", "touchstart"],
    pointerout: ["mouseout", "touchend"],
    pointerup: ["mouseup", "touchend"]
  };
  var handlers = {
    tap: function tap($this, listener, options) {
      var isTap = false;
      original.addEventListener.call($this, "touchstart", function () {
        return isTap = true;
      }, options);
      original.addEventListener.call($this, "touchmove", function () {
        return isTap = false;
      }, options);
      original.addEventListener.call($this, "touchend", function (evt) {
        if (!isTap) return;
        listener(evt);
      }, options);
    }
  };
  var original = {
    addEventListener: EventTarget.prototype.addEventListener,
    removeEventListener: EventTarget.prototype.removeEventListener
  };

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    var overrideType = type;
    if (type in events) overrideType = isATouchOnlyDevice ? events[type][1] : events[type][0];
    if (overrideType in handlers) handlers[overrideType](this, listener, options);else original.addEventListener.call(this, overrideType, listener, options);
  };
})();

"use strict";
/**
 * Generates a random unique ID using the browsers crypto capabilities.
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function id$1() {
  var array = new Uint32Array(3);
  window.crypto.getRandomValues(array);
  return "latte-" + array.join("-");
}
/**
 * Requests an API endpoint.
 *
 * @param {String} url
 * @param {RequestInit} options
 *
 * @returns {Promise<Response>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function request(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return fetch(url, Object.assign({}, {
    credentials: "same-origin"
  }, options));
}
/**
 * Requests a JSON endpoint.
 *
 * @param {String} url
 * @param {RequestInit} options
 *
 * @returns {Promise<Object>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function requestJson(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return request(url, options).then(function (r) {
    return r.json();
  });
}
var api = {
  id: id$1,
  request: request,
  requestJson: requestJson
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
      var _this2 = this;

      if (label === undefined || value === undefined) return;
      if (this.values.filter(function (v) {
        return v.value === value && v.label === label;
      }).length > 0) return;

      var remove = function remove() {
        return _this2.removeValue(value);
      };

      this.values.push({
        label: label,
        remove: remove,
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
      var _this3 = this;

      response.data.forEach(function (v) {
        return _this3.addValue(v.label, v.value);
      });
      this.isLoading = false;
    },
    onSearchTermChanged: function onSearchTermChanged() {
      var _this4 = this;

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
        return _this4.onReceiveSuggestions(r);
      }).catch(function (err) {
        return console.error(err);
      });
    },
    onValueChanged: function onValueChanged() {
      var _this5 = this;

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
        return _this5.onReceiveValues(r);
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-away",rawName:"v-click-away",value:(_vm.onBlur),expression:"onBlur"}],staticClass:"latte-autocomplete"},[_c('div',{staticClass:"form-control",attrs:{"disabled":_vm.disabled}},[_vm._l((_vm.values),function(selection){return [_vm._t("selection",[_c('span',{staticClass:"badge badge-primary"},[_c('span',[_vm._v(_vm._s(selection.label))]),_vm._v(" "),_c('button',{staticClass:"btn",on:{"click":function($event){selection.remove();}}},[_c('i',{staticClass:"mdi mdi-window-close"})])])],null,selection)]}),_vm._v(" "),(_vm.canSearch)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchTerm),expression:"searchTerm"}],ref:"field",staticClass:"form-control",attrs:{"type":"search","name":_vm.name,"placeholder":_vm.placeholder,"autocomplete":"false"},domProps:{"value":(_vm.searchTerm)},on:{"focus":_vm.onFocus,"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"delete",[8,46],$event.key,["Backspace","Delete"])){ return null; }return _vm.onKeyPressDelete($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.onSelectSuggestion($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }return _vm.onSelectFirstSuggestion($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onKeyPressDown($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onKeyPressUp($event)}],"input":function($event){if($event.target.composing){ return; }_vm.searchTerm=$event.target.value;}}}):_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"dropdown",class:{'is-open': _vm.shouldOpenSuggestions},attrs:{"role":"combobox"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._l((_vm.suggestionsFiltered),function(suggestion,index){return [_c('a',{staticClass:"nav-link",class:{'is-hover': _vm.currentSuggestion === index},attrs:{"role":"option"},on:{"&pointermove":function($event){_vm.currentSuggestion = index;},"click":_vm.onSelectSuggestion}},[_vm._t("suggestion",[_c('span',[_vm._v(_vm._s(suggestion.label)+" "),(suggestion.sub_label)?_c('span',{staticClass:"sub-label"},[_vm._v(_vm._s(suggestion.sub_label))]):_vm._e()]),_vm._v(" "),_c('i',{staticClass:"mdi mdi-chevron-right"})],null,suggestion)],2)]})],2)]),_vm._v(" "),(_vm.isLoading)?_c('span',{staticClass:"spinner spinner-primary"}):_vm._e()])};
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
var script$1 = {
  name: "latte-button-dropdown",
  props: {
    ariaLabel: {
      default: "",
      required: false,
      type: String
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
    label: {
      default: "",
      required: false,
      type: String
    },
    marginX: {
      default: -18,
      required: false,
      type: Number
    },
    marginY: {
      default: 0,
      required: false,
      type: Number
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
    }
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
    iconClasses: function iconClasses() {
      return ["mdi", "mdi-".concat(this.icon)];
    },
    iconAfterClasses: function iconAfterClasses() {
      return ["mdi", "mdi-".concat(this.iconAfter)];
    },
    iconBeforeClasses: function iconBeforeClasses() {
      return ["mdi", "mdi-".concat(this.iconBefore)];
    }
  }
};

/* script */
            const __vue_script__$1 = script$1;
            
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{ref:"btn",staticClass:"btn",class:_vm.buttonClass,attrs:{"data-tooltip":_vm.tooltip,"data-tooltip-class":"tooltip-bottom tooltip-contain","aria-label":_vm.ariaLabel}},[(_vm.avatarUrl !== null)?_c('img',{staticClass:"avatar avatar-24px",attrs:{"src":_vm.avatarUrl,"alt":_vm.ariaLabel}}):(_vm.icon !== '')?_c('i',{class:_vm.iconClasses}):_vm._e(),_vm._v(" "),(_vm.iconBefore !== '')?_c('i',{class:_vm.iconBeforeClasses}):_vm._e(),_vm._v(" "),(_vm.label !== '')?_c('span',[_vm._v(_vm._s(_vm.label))]):_vm._e(),_vm._v(" "),(_vm.iconAfter !== '')?_c('i',{class:_vm.iconAfterClasses}):_vm._e(),_vm._v(" "),_vm._t("extra"),_vm._v(" "),_c('latte-popup',{attrs:{"associate-with":_vm.$refs.btn,"margin-x":_vm.marginX,"margin-y":_vm.marginY}},[_vm._t("default")],2)],2)};
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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

"use strict";
var main = undefined;
/**
 * Deep merges multiple objects.
 *
 * @param {*} target
 * @param {*} sources
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

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
/**
 * Gets the main#app element.
 *
 * @returns {HTMLMainElement}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function getMainElement() {
  return main || (main = document.querySelector("main#app"));
}
/**
 * Handles an Error.
 *
 * @param {Error} err
 * @param {Function|undefined} fn
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function handleError$1(err) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  Latte.messages.alert("Aw snap!", "<pre>".concat(err.stack, "</pre>"));
  if (fn) fn();
}
/**
 * Returns TRUE when obj is an object.
 *
 * @param {*} obj
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function isObject(obj) {
  return obj && _typeof(obj) === "object" && !Array.isArray(obj);
}
/**
 * Sets an interval.
 *
 * @param {Number} timeout
 * @param {Function} func
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function interval(timeout, func) {
  func();
  return window.setInterval(func, timeout);
}
/**
 * Returns TRUE when obj is iterable.
 *
 * @param {*} obj
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function isIterable(obj) {
  if (obj === null) return false;
  return typeof obj[Symbol.iterator] === "function";
}
/**
 * Generates a random password-like string.
 *
 * @param {Number} length
 * @param {String} availableSets
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

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
/**
 * Registers a Latte module.
 *
 * @param {Function} func
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function register(func) {
  func(window.Latte);
}
/**
 * Sets a timeout.
 *
 * @param {Number} timeout
 * @param {Function} func
 *
 * @returns {Number}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function timeout(timeout, func) {
  return window.setTimeout(func, timeout);
}
/**
 * Updates the URL hash.
 *
 * @param {Object} data
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

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
      var canvas = this.$refs.chart;
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-header"},[_c('span',{staticClass:"panel-title"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('latte-button-dropdown',{staticClass:"ml-auto",attrs:{"icon":"dots-vertical","type":"list"}},[_c('nav',{staticClass:"nav nav-list"},[_c('a',{staticClass:"nav-link",on:{"click":function($event){_vm.$refs.chart.loadChart();}}},[_c('i',{staticClass:"mdi mdi-refresh"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Reload chart","chart")))])])])])],1),_vm._v(" "),_c('latte-chart',{ref:"chart",attrs:{"url":_vm.url},on:{"change":_vm.onChange}})],1)};
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
      selectedOptionIndex: -1,
      selectedOptionClasses: []
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

      if (option !== null) {
        this.selectedOptionClasses = _toConsumableArray(option.$el.classList);
        return option.$el.innerHTML;
      }

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
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-control combo-box",attrs:{"tabindex":"0"},on:{"blur":_vm.close,"click":_vm.open,"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.onKeyPressDown($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.onKeyPressEnter($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,"Escape")){ return null; }return _vm.onKeyPressEscape($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.onKeyPressUp($event)}]}},[(_vm.selectedOptionTemplate !== null)?_c('a',{staticClass:"combo-box-selection",class:_vm.selectedOptionClasses,domProps:{"innerHTML":_vm._s(_vm.selectedOptionTemplate)}}):_c('div',{staticClass:"combo-box-empty"},[_vm._v("Select...")]),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark form-control-suffix",attrs:{"type":"button"},on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi mdi-chevron-down"})]),_vm._v(" "),_c('div',{staticClass:"dropdown",class:{'is-open': _vm.isDropdownOpened},attrs:{"role":"combobox"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._t("default")],2)])])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-2b19b874_0", { source: "\ndiv.combo-box[data-v-2b19b874]{align-items:center;padding:0 16px 0 0;z-index:unset\n}\na.combo-box-selection[data-v-2b19b874]{flex:1 1 auto;pointer-events:none\n}\nbutton.form-control-suffix[data-v-2b19b874]{color:rgba(var(--color-dark),.5);pointer-events:none\n}\ndiv.dropdown[data-v-2b19b874]{position:absolute;top:100%;left:0;right:0;transition:all 180ms var(--ease-swift-out);will-change:opacity,transform;z-index:10\n}\ndiv.dropdown[data-v-2b19b874]:not(.is-open){opacity:0;pointer-events:none;transform:translate3d(0,1rem,0)\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-2b19b874";
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

    if (true) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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

        if (true && css.map) {
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
 * Implodes commas between strings and replaces the last comma with an &.
 *
 * @param {String[]} strs
 *
 * @return {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function commaCommaAnd(strs) {
  return strs.join(", ").replace(/(.*),/, "$1 &");
}
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
var string = {
  commaCommaAnd: commaCommaAnd,
  isNullOrWhitespace: isNullOrWhitespace
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
  beforeDestroy: function beforeDestroy() {
    if (this.spinner !== null) this.spinner.remove();
  },
  data: function data() {
    return {
      defaults: {
        column: {
          is_searchable: false,
          is_sortable: false
        }
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
      spinner: null,
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

    this.panel = this.$el.closest("div.panel");
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
          if (f.property === filter.property && f["value"] === filter["value"]) return;
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
          if (!isNullOrWhitespace(filter.value.toString())) url += "&filter[".concat(filter.property, "]=").concat(filter["value"]);
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
      var spinner = this.spinner = document.createElement("span");
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

      if (typeof response.data.initial_data !== "undefined") this.onReceivedData({
        data: response.data.initial_data
      });else this.loadFromUrl();
    },
    reload: function reload() {
      this.loadFromUrl();
    },
    search: function search(field, value, evt) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      this.params[field] = value;
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
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"table table-hover mb-0"},[_c('thead',[(_vm.show.header)?_c('tr',[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{style:({'min-width': (column.width && column.width !== null ? column.width + 'px' : 'auto'), 'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field}},[_c('div',{staticClass:"column-content flex-row align-items-center justify-content-start"},[_c('span',[_vm._v(_vm._s(column.label))]),_vm._v(" "),(_vm.show.sorting && column.is_sortable)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark btn-sm ml-1",attrs:{"aria-label":_vm._f("i18n")('Sort by @0','data-table', [column.label])},on:{"click":function($event){_vm.sortBy(column.field);}}},[(_vm.sort.by !== column.field)?_c('i',{staticClass:"mdi latte-sorting none"}):(_vm.sort.order === 'ASC')?_c('i',{staticClass:"mdi latte-sorting down"}):(_vm.sort.order === 'DESC')?_c('i',{staticClass:"mdi latte-sorting up"}):_vm._e()]):_vm._e()])])}),_vm._v(" "),(_vm.actions.length > 0)?_c('th',{style:({'width': _vm.actionsWidth + 'px'})}):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.show.search)?_c('tr',{staticClass:"search-row"},[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{style:({'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field}},[(column.is_searchable)?_c('input',{attrs:{"type":"search","placeholder":_vm._f("i18n")('Search','data-table'),"aria-label":_vm._f("i18n")('Search by @0','data-table', [column.label])},on:{"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }_vm.search(column.field, $event.target.value, $event);}}}):_vm._e()])}),_vm._v(" "),_c('th')],2):_vm._e(),_vm._v(" "),(_vm.filters.length > 0)?_c('tr',[_c('td',{attrs:{"colspan":_vm.columns.length + (_vm.actions.length > 0 ? 1 : 0) + (_vm.showSelections ? 1 : 0)}},[_c('div',{staticClass:"column-content flex-row justify-content-start"},[_vm._l((_vm.filters),function(filter,filterKey){return [_c('span',{staticClass:"badge mr-1",class:filter.class},[_c('span',[_vm._v(_vm._s(filter.label))]),_vm._v(" "),_c('button',{staticClass:"btn",on:{"click":function($event){_vm.removeFilter($event, filterKey);}}},[_c('i',{staticClass:"mdi mdi-window-close"})])])]})],2)])]):_vm._e()]),_vm._v(" "),_c('tbody',_vm._l((_vm.data),function(row,rowKey){return _c('tr',[(_vm.showSelections)?_c('td',{staticStyle:{"width":"42px","z-index":"1"}},[_c('div',{staticClass:"column-content pr-0"},[(_vm.selectMode === 'single')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selection),expression:"selection"}],staticClass:"radio-button radio-button-primary mr-0",attrs:{"type":"radio","id":_vm.uniqueId + ':' + row.id,"name":_vm.name},domProps:{"value":row.id,"checked":_vm._q(_vm.selection,row.id)},on:{"change":function($event){_vm.selection=row.id;}}}):_vm._e(),_vm._v(" "),(_vm.selectMode === 'multiple')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.selection),expression:"selection"}],staticClass:"checkbox checkbox-primary mr-0",attrs:{"type":"checkbox","id":_vm.uniqueId + ':' + row.id,"name":_vm.name + '[]'},domProps:{"value":row.id,"checked":Array.isArray(_vm.selection)?_vm._i(_vm.selection,row.id)>-1:(_vm.selection)},on:{"change":function($event){var $$a=_vm.selection,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=row.id,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.selection=$$a.concat([$$v]));}else{$$i>-1&&(_vm.selection=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.selection=$$c;}}}}):_vm._e()])]):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column,columnKey){return [_c('td',{style:({'width': (column.width && column.width !== null ? column.width + 'px' : 'auto') }),attrs:{"data-field":column.field,"data-row":rowKey,"data-column":columnKey}},[_c(_vm.createRowColumn(row, column),{tag:"component"})],1)]}),_vm._v(" "),(_vm.actions.length > 0)?_c('td',{staticClass:"actions"},[_c('div',{staticClass:"column-content flex-row align-items-center pl-0"},[_c('latte-button-dropdown',{attrs:{"aria-label":_vm._f("i18n")('More options...','data-table'),"icon":"dots-vertical","small":true}},[_c('nav',{staticClass:"nav nav-list"},_vm._l((_vm.actions),function(action,actionKey){return _c(_vm.createAction(action, row),{key:actionKey,tag:"component",attrs:{"data-close":""}})}))])],1)]):_vm._e()],2)})),_vm._v(" "),_c('tfoot',[(_vm.show.footer)?_c('tr',[(_vm.showSelections)?_c('th',{staticStyle:{"width":"42px"}}):_vm._e(),_vm._v(" "),_vm._l((_vm.columns),function(column){return _c('th',{attrs:{"data-field":column.field}},[_c('div',{staticClass:"column-content"},[_vm._v(_vm._s(column.label))])])}),_vm._v(" "),_c('th')],2):_vm._e(),_vm._v(" "),(_vm.pagination.length > 0)?_c('tr',[_c('th',{attrs:{"colspan":_vm.columns.length + (_vm.actions.length > 0 ? 1 : 0) + (_vm.showSelections ? 1 : 0)}},[_c('div',{staticClass:"column-content"},[_c('latte-pagination',{attrs:{"pagination":_vm.pagination},on:{"navigate":_vm.loadPage}})],1)])]):_vm._e()])])};
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
var script$7 = {
  name: "latte-datepicker",
  props: {
    id: {
      default: "date",
      required: false,
      type: String
    },
    name: {
      default: "date",
      required: false,
      type: String
    },
    palceholder: {
      default: "",
      required: false,
      type: String
    },
    value: {
      default: function _default() {
        return new Date();
      },
      required: false,
      type: Date
    }
  },
  data: function data() {
    return {
      current: this.value
    };
  },
  computed: {
    inputValue: function inputValue() {
      return moment(this.current).format("YYYY-MM-DD");
    }
  },
  watch: {
    current: function current() {
      this.$emit("input", this.current);
      this.$refs.popup.close();
    },
    value: function value() {
      this.current = this.value;
    }
  }
};

/* script */
            const __vue_script__$7 = script$7;
            
/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker"},[_c('input',{ref:"input",staticClass:"form-control",attrs:{"readonly":"","id":_vm.id,"name":_vm.name,"placeholder":_vm.placeholder,"type":"date"},domProps:{"value":_vm.inputValue}}),_vm._v(" "),_c('latte-popup',{ref:"popup",staticStyle:{"width":"384px"},attrs:{"associate-with":_vm.$refs.input}},[_c('latte-datepicker-calendar',{model:{value:(_vm.current),callback:function ($$v) {_vm.current=$$v;},expression:"current"}})],1)],1)};
var __vue_staticRenderFns__$7 = [];

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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
var script$8 = {
  name: "latte-datepicker-calendar",
  props: {
    bodyClass: {
      default: "",
      required: false,
      type: String
    },
    value: {
      default: function _default() {
        return new Date();
      },
      required: false,
      type: Date
    }
  },
  data: function data() {
    return {
      selectedMonth: 3,
      selectedView: "dates",
      selectedYear: 1996
    };
  },
  computed: {
    dates: function dates() {
      var dates = [];
      var monthDays = this.monthEndDate.getDate();
      var beforeDates = Math.max(0, this.monthBeginDate.getDay() - 1);

      for (var _x = beforeDates - 1; _x >= 0; _x--) {
        dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, 0 - _x, 0, 0, 0)));
      }

      for (var _x2 = 1; _x2 <= monthDays; _x2++) {
        dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth - 1, _x2, 0, 0, 0)));
      }

      var rows = Math.ceil(dates.length / 7);
      var datesToShow = rows * 7;
      var x = 0;

      while (datesToShow > dates.length) {
        dates.push(new Date(Date.UTC(this.selectedYear, this.selectedMonth, ++x, 0, 0, 0)));
      }

      return dates;
    },
    monthBeginDate: function monthBeginDate() {
      return new Date(this.selectedYear, this.selectedMonth - 1, 1);
    },
    monthEndDate: function monthEndDate() {
      return new Date(this.selectedYear, this.selectedMonth, 0);
    },
    months: function months() {
      return {
        1: moment().month(0).format("MMMM"),
        2: moment().month(1).format("MMMM"),
        3: moment().month(2).format("MMMM"),
        4: moment().month(3).format("MMMM"),
        5: moment().month(4).format("MMMM"),
        6: moment().month(5).format("MMMM"),
        7: moment().month(6).format("MMMM"),
        8: moment().month(7).format("MMMM"),
        9: moment().month(8).format("MMMM"),
        10: moment().month(9).format("MMMM"),
        11: moment().month(10).format("MMMM"),
        12: moment().month(11).format("MMMM")
      };
    },
    years: function years() {
      var years = [];

      for (var year = 1970; year <= 2100; year++) {
        years.push(year);
      }

      return years;
    }
  },
  methods: {
    getClassesForDate: function getClassesForDate(date) {
      var classes = ["btn"];
      if (this.isToday(date)) classes.push("font-italic", "font-weight-bold");
      if (this.isSelected(date)) classes.push("btn-contained", "btn-primary");else classes.push("btn-text", "btn-dark");
      return classes;
    },
    getClassesForMonth: function getClassesForMonth(month) {
      var classes = ["btn", "m-0", "w-100"];
      if (parseInt(month) === this.selectedMonth) classes.push("btn-contained", "btn-primary");else classes.push("btn-text", "btn-dark");
      return classes;
    },
    getClassesForYear: function getClassesForYear(year) {
      var classes = ["btn", "m-0", "w-100"];
      if (parseInt(year) === this.selectedYear) classes.push("btn-contained", "btn-primary");else classes.push("btn-text", "btn-dark");
      return classes;
    },
    isOtherMonth: function isOtherMonth(date) {
      return date.getMonth() + 1 !== this.selectedMonth;
    },
    isSame: function isSame(date, other) {
      if (typeof date === 'undefined' || date === null) return false;
      if (typeof other === 'undefined' || other === null) return false;
      return date.getFullYear() === other.getFullYear() && date.getMonth() === other.getMonth() && date.getDate() === other.getDate();
    },
    isSelected: function isSelected(date) {
      return this.isSame(date, this.value);
    },
    isToday: function isToday(date) {
      return this.isSame(date, new Date());
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
    navigate: function navigate(dir) {
      this.selectedMonth += dir;

      if (this.selectedMonth === 13) {
        this.selectedMonth = 1;
        this.selectedYear++;
      }

      if (this.selectedMonth === 0) {
        this.selectedMonth = 12;
        this.selectedYear--;
      }
    },
    select: function select(date) {
      this.$emit("input", date);
    },
    selectMonth: function selectMonth(month) {
      this.selectedMonth = parseInt(month);
      this.selectedView = "dates";
    },
    selectYear: function selectYear(year) {
      this.selectedYear = parseInt(year);
      this.selectedView = "dates";
    },
    view: function view(_view) {
      if (this.selectedView === _view) return this.selectedView = "dates";
      this.selectedView = _view;
    }
  },
  watch: {
    selectedView: function selectedView() {
      var _this = this;

      this.$emit("view", this.selectedView);
      this.$nextTick(function () {
        if (_this.selectedView === "months") _this.$el.querySelector("[data-month=\"".concat(_this.selectedMonth, "\"]")).scrollIntoViewIfNeeded();
        if (_this.selectedView === "years") _this.$el.querySelector("[data-year=\"".concat(_this.selectedYear, "\"]")).scrollIntoViewIfNeeded();
      });
    },
    value: {
      immediate: true,
      handler: function handler() {
        this.selectedMonth = this.value.getMonth() + 1;
        this.selectedYear = this.value.getFullYear();
      }
    }
  }
};

/* script */
            const __vue_script__$8 = script$8;
            
/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel panel-blank datepicker-calendar"},[_c('div',{staticClass:"panel-header datepicker-calendar-header"},[_c('button',{staticClass:"btn btn-icon btn-text btn-dark",on:{"click":function($event){_vm.navigate(-1);}}},[_c('i',{staticClass:"mdi mdi-chevron-left"})]),_vm._v(" "),_c('div',{staticClass:"btn-group mx-auto"},[_c('button',{staticClass:"btn btn-text btn-dark",on:{"click":function($event){_vm.view('months');}}},[_c('span',[_vm._v(_vm._s(_vm.moment(_vm.monthBeginDate).format("MMMM")))])]),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-dark",on:{"click":function($event){_vm.view('years');}}},[_c('span',[_vm._v(_vm._s(_vm.moment(_vm.monthBeginDate).format("YYYY")))])])]),_vm._v(" "),_c('button',{staticClass:"btn btn-icon btn-text btn-dark",on:{"click":function($event){_vm.navigate(1);}}},[_c('i',{staticClass:"mdi mdi-chevron-right"})])]),_vm._v(" "),(_vm.selectedView === 'dates')?_c('div',{staticClass:"panel-body datepicker-calendar-dates pt-0",class:_vm.bodyClass},[_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(1).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(2).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(3).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(4).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(5).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(6).format("dd")))]),_vm._v(" "),_c('span',{staticClass:"day"},[_vm._v(_vm._s(_vm.moment().isoWeekday(7).format("dd")))]),_vm._v(" "),_vm._l((_vm.dates),function(date){return _c('button',{class:_vm.getClassesForDate(date),attrs:{"disabled":_vm.isOtherMonth(date)},on:{"click":function($event){_vm.select(date);}}},[_c('span',[_vm._v(_vm._s(date.getDate()))])])})],2):_vm._e(),_vm._v(" "),(_vm.selectedView === 'months')?_c('div',{staticClass:"panel-body datepicker-calendar-months pt-0",class:_vm.bodyClass},_vm._l((_vm.months),function(month,index){return _c('button',{class:_vm.getClassesForMonth(index),attrs:{"data-month":index},on:{"click":function($event){_vm.selectMonth(index);}}},[_c('span',[_vm._v(_vm._s(month))])])})):_vm._e(),_vm._v(" "),(_vm.selectedView === 'years')?_c('div',{staticClass:"panel-body datepicker-calendar-years pt-0",class:_vm.bodyClass},_vm._l((_vm.years),function(year){return _c('button',{class:_vm.getClassesForYear(year),attrs:{"data-year":year},on:{"click":function($event){_vm.selectYear(year);}}},[_c('span',[_vm._v(_vm._s(year))])])})):_vm._e()])};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* component normalizer */
  function __vue_normalize__$8(
    template, style, script,
    scope, functional, moduleIdentifier,
    createInjector, createInjectorSSR
  ) {
    const component = (typeof script === 'function' ? script.options : script) || {};

    // For security concerns, we use only base name in production mode.
    component.__file = "DatePickerCalendar.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var DatePickerCalendar = __vue_normalize__$8(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
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
var script$9 = {
  name: "latte-datetime-picker",
  props: {
    id: {
      default: "date",
      required: false,
      type: String
    },
    name: {
      default: "date",
      required: false,
      type: String
    },
    palceholder: {
      default: "",
      required: false,
      type: String
    },
    value: {
      default: function _default() {
        return new Date();
      },
      required: false,
      type: Date
    }
  },
  data: function data() {
    return {
      calendarView: "dates",
      currentDate: new Date(),
      currentTime: new Date()
    };
  },
  computed: {
    current: function current() {
      var dt = new Date(this.currentDate);
      dt.setHours(this.currentTime.getHours());
      dt.setMinutes(this.currentTime.getMinutes());
      return dt;
    },
    inputValue: function inputValue() {
      return moment(this.current).format("YYYY-MM-DD[T]HH:mm");
    }
  },
  methods: {
    close: function close() {
      this.currentDate = new Date(this.value.getTime());
      this.currentTime = new Date(this.value.getTime());
      this.$refs.popup.close();
    },
    select: function select() {
      this.$emit("input", this.current);
      this.$refs.popup.close();
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler() {
        this.currentDate = new Date(this.value.getTime());
        this.currentTime = new Date(this.value.getTime());
      }
    }
  }
};

/* script */
            const __vue_script__$9 = script$9;
            
/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker"},[_c('input',{ref:"input",staticClass:"form-control",attrs:{"readonly":"","id":_vm.id,"name":_vm.name,"placeholder":_vm.placeholder,"type":"datetime-local"},domProps:{"value":_vm.inputValue}}),_vm._v(" "),_c('latte-popup',{ref:"popup",staticStyle:{"width":"384px"},attrs:{"associate-with":_vm.$refs.input}},[_c('latte-datepicker-calendar',{attrs:{"body-class":"pb-0"},on:{"view":function($event){_vm.calendarView = $event;}},model:{value:(_vm.currentDate),callback:function ($$v) {_vm.currentDate=$$v;},expression:"currentDate"}}),_vm._v(" "),(_vm.calendarView === 'dates')?_c('latte-timepicker-clock',{staticClass:"mt-0",model:{value:(_vm.currentTime),callback:function ($$v) {_vm.currentTime=$$v;},expression:"currentTime"}},[_c('button',{staticClass:"btn btn-icon btn-text btn-primary ml-3",attrs:{"slot":"after"},on:{"click":_vm.select},slot:"after"},[_c('i',{staticClass:"mdi mdi-check"})]),_vm._v(" "),_c('button',{staticClass:"btn btn-icon btn-text btn-dark",attrs:{"slot":"after"},on:{"click":_vm.close},slot:"after"},[_c('i',{staticClass:"mdi mdi-close"})])]):_vm._e()],1)],1)};
var __vue_staticRenderFns__$9 = [];

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
    component.__file = "DateTimePicker.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var DateTimePicker = __vue_normalize__$9(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

var script$a = {
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
      return this.options && this.options.group && this.options.group.pull === 'clone';
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
        return el.style.display !== 'none';
      });
      var currentDomIndex = domChildren.indexOf(event.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDomIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !event.willInsertAfter ? currentIndex : currentIndex + 1;
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
            const __vue_script__$a = script$a;
            
/* template */

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = undefined;
  /* component normalizer */
  function __vue_normalize__$a(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Draggable = __vue_normalize__$a(
    {},
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
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
var script$b = {
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
      this.width = this.$refs.grid.offsetWidth;
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
            const __vue_script__$b = script$b;
            
/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"grid",staticClass:"latte-grid",class:{'is-dragging': _vm.is_dragging},style:(_vm.styles),attrs:{"role":"grid"}},[_vm._t("default"),_vm._v(" "),_c('latte-grid-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.isDragging),expression:"isDragging"}],staticClass:"latte-grid-placeholder",attrs:{"x":_vm.placeholder.x,"y":_vm.placeholder.y,"height":_vm.placeholder.height,"width":_vm.placeholder.width,"id":"__placeholder__"}})],2)};
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
    component.__file = "Grid.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Grid = __vue_normalize__$b(
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
var script$c = {
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
      var shouldUpdate = false;
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
            shouldUpdate = true;
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
            const __vue_script__$c = script$c;
            
/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"item",staticClass:"latte-grid-item",class:{'is-draggable': _vm.isDraggable, 'is-dragging': _vm.is_dragging, 'is-resizable': _vm.isResizable, 'is-resizing': _vm.is_resizing},style:(_vm.style),attrs:{"role":"gridcell"}},[_vm._t("default"),_vm._v(" "),(_vm.resizable)?_c('div',{staticClass:"grid-item-resize-handle"}):_vm._e()],2)};
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
    component.__file = "GridItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var GridItem = __vue_normalize__$c(
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
var script$d = {
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
            const __vue_script__$d = script$d;
            
/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('latte-json-editor-view',{attrs:{"parsedData":_vm.parsedData},model:{value:(_vm.parsedData),callback:function ($$v) {_vm.parsedData=$$v;},expression:"parsedData"}})};
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
    component.__file = "JsonEditor.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var JsonEditor = __vue_normalize__$d(
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
var script$e = {
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
            const __vue_script__$e = script$e;
            
/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-iaf"},[(_vm.needName)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.keyName),expression:"keyName"}],staticClass:"form-control",attrs:{"id":"iaf-key","type":"text","placeholder":"Key"},domProps:{"value":(_vm.keyName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.keyName=$event.target.value;}}}):_vm._e(),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.formatSelected),expression:"formatSelected"}],staticClass:"custom-select ml-3",attrs:{"id":"iaf-type"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.formatSelected=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.formats),function(item,index){return _c('option',{key:index,domProps:{"value":item}},[_vm._v(_vm._s(item))])})),_vm._v(" "),(_vm.formatSelected !== 'array' && _vm.formatSelected !== 'object' && _vm.formatSelected !== 'null')?[(_vm.formatSelected === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"form-control ml-3",attrs:{"id":'iaf-value',"type":"text","placeholder":"Value"},domProps:{"value":(_vm.valueName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.valueName=$event.target.value;}}}):_vm._e(),_vm._v(" "),(_vm.formatSelected === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"form-control ml-3",attrs:{"id":'iaf-value',"type":"number","placeholder":"Value"},domProps:{"value":(_vm.valueName)},on:{"change":_vm.dealNumber,"input":function($event){if($event.target.composing){ return; }_vm.valueName=$event.target.value;}}}):_vm._e(),_vm._v(" "),(_vm.formatSelected === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueName),expression:"valueName"}],staticClass:"custom-select ml-3",attrs:{"id":'iaf-value'},on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.valueName=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},_vm.dealBoolean]}},[_c('option',{attrs:{"value":"true","selected":""}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{attrs:{"value":"true"}},[_vm._v("FALSE")])]):_vm._e()]:_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-primary ml-3",on:{"click":_vm.confirm}},[_c('i',{staticClass:"mdi mdi-check-circle"})]),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark ml-1",on:{"click":_vm.cancel}},[_c('i',{staticClass:"mdi mdi-close-circle"})])],2)};
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
    component.__file = "JsonEditorIaf.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var JsonEditorIaf = __vue_normalize__$e(
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
var script$f = {
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
            const __vue_script__$f = script$f;
            
/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-view"},[_vm._l((_vm.flowData),function(item,index){return _c('div',{key:_vm.key(item),staticClass:"json-editor json-editor-block",class:[item.type, {'hide-block': _vm.hideMyBlock[index]}]},[_c('div',{staticClass:"key"},[(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-text btn-icon btn-dark toggle",on:{"click":function($event){_vm.toggleBlock(index);}}},[_c('i',{class:['mdi', {'mdi-chevron-down': !_vm.hideMyBlock[index]}, {'mdi-chevron-right': _vm.hideMyBlock[index]}]})]):_vm._e(),_vm._v(" "),(typeof item.name === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.name),expression:"item.name"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.name)},on:{"blur":function($event){_vm.keyInputBlur(item, $event);},"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "name", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'array')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("[" + item.childParams.length + "]"))]):_vm._e(),_vm._v(" "),(item.type === 'object')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("{" + (item.childParams.length || 0) + "}"))]):_vm._e(),_vm._v(" "),(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-text btn-icon btn-dark trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"value"},[(item.type === 'object')?[_c('latte-json-editor-view',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:(item.type === 'array')?[_c('latte-json-editor-view-array',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:[(item.type === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.remark),expression:"item.remark",modifiers:{"number":true}}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", _vm._n($event.target.value));},"blur":function($event){_vm.$forceUpdate();}}}):_vm._e(),_vm._v(" "),(item.type === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"custom-select",attrs:{"name":"value"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(item, "remark", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},[_c('option',{domProps:{"value":true}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{domProps:{"value":false}},[_vm._v("FALSE")])]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})])]],2)])}),_vm._v(" "),(_vm.isAddingItem)?_c('latte-json-editor-iaf',{on:{"confirm":_vm.newItem,"cancel":_vm.cancelNewItem}}):_vm._e(),_vm._v(" "),(!_vm.isAddingItem)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",on:{"click":_vm.addItem}},[_c('i',{staticClass:"mdi mdi-plus-circle"})]):_vm._e()],2)};
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
    component.__file = "JsonEditorView.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var JsonEditorView = __vue_normalize__$f(
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
var script$g = {
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
            const __vue_script__$g = script$g;
            
/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-editor json-editor-view array"},[_vm._l((_vm.flowData),function(item,index){return _c('div',{key:index,staticClass:"json-editor json-editor-block",class:[item.type, {'hide-block': _vm.hideMyBlock[index]}]},[_c('div',{staticClass:"key"},[(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-text btn-icon btn-dark toggle",on:{"click":function($event){_vm.toggleBlock(index);}}},[_c('i',{class:['mdi', {'mdi-chevron-down': !_vm.hideMyBlock[index]}, {'mdi-chevron-right': _vm.hideMyBlock[index]}]})]):_vm._e(),_vm._v(" "),_c('span',{staticClass:"key"},[_vm._v(_vm._s(index))]),_vm._v(" "),(item.type === 'array')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("[" + item.childParams.length + "]"))]):_vm._e(),_vm._v(" "),(item.type === 'object')?_c('span',{staticClass:"json-editor json-editor-o"},[_vm._v(_vm._s("{" + (item.childParams.length || 0) + "}"))]):_vm._e(),_vm._v(" "),(item.type === 'object' || item.type === 'array')?_c('button',{staticClass:"btn btn-text btn-icon btn-dark trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"value"},[(item.type === 'object')?[_c('latte-json-editor-view',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:(item.type === 'array')?[_c('latte-json-editor-view-array',{attrs:{"parsedData":item.childParams},model:{value:(item.childParams),callback:function ($$v) {_vm.$set(item, "childParams", $$v);},expression:"item.childParams"}})]:[(item.type === 'string')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"form-control",attrs:{"type":"text"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", $event.target.value);}}}):_vm._e(),_vm._v(" "),(item.type === 'number')?_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(item.remark),expression:"item.remark",modifiers:{"number":true}}],staticClass:"form-control",attrs:{"type":"number"},domProps:{"value":(item.remark)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(item, "remark", _vm._n($event.target.value));},"blur":function($event){_vm.$forceUpdate();}}}):_vm._e(),_vm._v(" "),(item.type === 'boolean')?_c('select',{directives:[{name:"model",rawName:"v-model",value:(item.remark),expression:"item.remark"}],staticClass:"custom-select",attrs:{"name":"value"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(item, "remark", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);}}},[_c('option',{domProps:{"value":true}},[_vm._v("TRUE")]),_vm._v(" "),_c('option',{domProps:{"value":false}},[_vm._v("FALSE")])]):_vm._e(),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark trash",on:{"click":function($event){_vm.deleteItem(_vm.parsedData, item, index);}}},[_c('i',{staticClass:"mdi mdi-delete"})])]],2)])}),_vm._v(" "),(_vm.isAddingItem)?_c('latte-json-editor-iaf',{attrs:{"needName":false},on:{"confirm":_vm.newItem,"cancel":_vm.cancelNewItem}}):_vm._e(),_vm._v(" "),(!_vm.isAddingItem)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",on:{"click":_vm.addItem}},[_c('i',{staticClass:"mdi mdi-plus-circle"})]):_vm._e()],2)};
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
    component.__file = "JsonEditorViewArray.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var JsonEditorViewArray = __vue_normalize__$g(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
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
var script$h = {
  name: "latte-mega-menu",
  data: function data() {
    return {
      isOpen: false
    };
  },
  methods: {
    close: function close() {
      this.isOpen = false;
    },
    open: function open() {
      this.isOpen = true;
    },
    toggle: function toggle() {
      if (this.isOpen) this.close();else this.open();
    }
  },
  watch: {
    isOpen: function isOpen() {
      this.$emit("open", this.isOpen);
    }
  }
};

/* script */
            const __vue_script__$h = script$h;
            
/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel mega-menu",class:{'is-open': _vm.isOpen}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$g = [];

  /* style */
  const __vue_inject_styles__$h = function (inject) {
    if (!inject) return
    inject("data-v-6809e55c_0", { source: "\ndiv.mega-menu{position:fixed;left:0;right:0;padding:3rem 0;box-shadow:var(--dropdown-elevation);transition:all 480ms var(--ease-swift-out);will-change:transform;z-index:1001\n}\ndiv.mega-menu:not(.is-open){pointer-events:none;transform:translate3d(0,-100%,0);visibility:collapse\n}\ndiv.mega-menu nav.nav.nav-list div.divider{margin:9px 0\n}\ndiv.mega-menu nav.nav.nav-list div.section{margin:0;padding:9px 0;color:inherit;font-weight:500\n}\ndiv.mega-menu nav.nav.nav-list a.nav-link{height:unset;margin:0;padding:9px 0;background:0 0\n}\ndiv.mega-menu nav.nav.nav-list a.nav-link:hover{background:0 0;color:RGB(var(--color-primary))\n}", map: undefined, media: undefined });

  };
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
    component.__file = "MegaMenu.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (true) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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

        if (true && css.map) {
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
  

  
  var MegaMenu = __vue_normalize__$h(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    __vue_create_injector__$1,
    undefined
  );

//
//
//
//
//
//
var script$i = {
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
            const __vue_script__$i = script$i;
            
/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"latte-moment"},[_vm._v(_vm._s(_vm.formatted_moment))])};
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
    component.__file = "Moment.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Moment = __vue_normalize__$i(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
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
"use strict";
var actions = {};
/**
 * Dispatches an action.
 *
 * @param {String} action
 * @param {*|undefined} data
 * @param {Node|undefined} el
 * @param {Event|undefined} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function dispatch(action) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var el = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var evt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  if (typeof actions[action] === "undefined") return;
  actions[action].forEach(function (callback) {
    return callback(data, el, evt);
  });
}
/**
 * Registers an action listener.
 *
 * @param {String} action
 * @param {Function} callback
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

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
var lattePath = null;
var script$j = {
  name: "latte-notifications",
  created: function created() {
    if (lattePath !== null) return;
    var lattejs = document.querySelector("script[src*=\"latte.js\"]");
    if (lattejs === null) return;
    lattePath = lattejs.getAttribute("src").split("latte.js")[0] || null;
  },
  data: function data() {
    return {
      notifications: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    on("latte:notification", function (data) {
      if (data.title) data.title = decodeURIComponent(data.title);
      if (data.message) data.message = decodeURIComponent(data.message);

      _this.createNotification(data);
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
      var soundUri = data.sound || (lattePath !== null ? "".concat(lattePath, "/sound/notification/pipes.ogg") : null);
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
            const __vue_script__$j = script$j;
            
/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"notification-center"}},_vm._l((_vm.notifications),function(notification){return _c('div',{ref:'notification_' + notification.id,refInFor:true,staticClass:"notification",class:_vm.getNotificationClasses(notification),style:({'top': notification.top + 'px'})},[(notification.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":notification.avatar}}):_vm._e(),_vm._v(" "),(notification.type)?_c('div',{staticClass:"notification-icon"},[_c('i',{staticClass:"mdi"})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"notification-content"},[_c('div',{staticClass:"notification-body"},[(notification.title)?_c('span',{staticClass:"notification-title"},[_vm._v(_vm._s(notification.title))]):_vm._e(),_vm._v(" "),(notification.message)?_c('span',{staticClass:"notification-text"},[_vm._v(_vm._s(notification.message))]):_vm._e()]),_vm._v(" "),(notification.actions)?_c('div',{staticClass:"notification-actions"},_vm._l((notification.actions),function(a){return _c('button',_vm._b({staticClass:"btn btn-text",class:'btn-' + (a.type || 'primary'),attrs:{"data-action":a.action},on:{"click":function($event){_vm.remove(notification.id);}}},'button',_vm.makeParams(a.params || {}),false),[_c('span',[_vm._v(_vm._s(a.label))])])})):_vm._e()])])}))};
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
    component.__file = "Notifications.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Notifications = __vue_normalize__$j(
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
var TRIGGER_SIZE = 30;

function getPosition(evt) {
  if (evt.changedTouches === undefined) return {
    x: evt.clientX,
    y: evt.clientY
  };
  return {
    x: evt.changedTouches[0].clientX,
    y: evt.changedTouches[0].clientY
  };
}

var script$k = {
  name: "latte-offscreen-container",
  props: {
    position: {
      default: "left",
      required: false,
      type: String,
      validator: function validator(val) {
        return ["top", "left", "right", "bottom"].includes(val);
      }
    },
    touchEnabled: {
      default: true,
      required: false,
      type: Boolean
    }
  },
  data: function data() {
    return {
      isDragging: false,
      current: 0.0,
      previous: 0.0,
      content: null,
      overlay: null,
      currentPosition: {
        x: 0,
        y: 0
      },
      previousPosition: {
        x: 0,
        y: 0
      },
      startPosition: {
        x: 0,
        y: 0
      },
      timer: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.overlay = this.$el;
    this.content = this.$el.querySelector("div.offscreen-content");
    window.addEventListener("resize", function () {
      return _this.close();
    });
    window.addEventListener("mousewheel", function (evt) {
      return _this.onMouseWheel(evt);
    }, {
      passive: false
    });
    window.addEventListener("touchcancel", function (evt) {
      return _this.onPointerCancel(evt);
    }, {
      passive: false
    });
    window.addEventListener("touchstart", function (evt) {
      return _this.onPointerDown(evt);
    }, {
      passive: false
    });
    window.addEventListener("touchmove", function (evt) {
      return _this.onPointerMove(evt);
    }, {
      passive: false
    });
    window.addEventListener("touchend", function (evt) {
      return _this.onPointerUp(evt);
    }, {
      passive: false
    });
  },
  computed: {
    isOpen: function isOpen() {
      return this.current > 0.0;
    },
    contentClasses: function contentClasses() {
      var classes = [];
      classes.push("offscreen-".concat(this.position));
      if (this.isDragging) classes.push("is-dragging");
      if (this.isOpen) classes.push("is-open");
      return classes;
    },
    overlayClasses: function overlayClasses() {
      var classes = [];
      if (this.isDragging) classes.push("is-dragging");
      if (this.isOpen) classes.push("is-open");
      return classes;
    },
    contentStyles: function contentStyles() {
      var touchAction;
      var transform;

      switch (this.position) {
        case "top":
          touchAction = "pan-x";
          transform = "translate3d(0, ".concat((this.current - 1) * 100, "%, 0)");
          break;

        case "left":
          touchAction = "pan-y";
          transform = "translate3d(".concat((this.current - 1) * 100, "%, 0, 0)");
          break;

        case "right":
          touchAction = "pan-y";
          transform = "translate3d(".concat((this.current - 1) * -100, "%, 0, 0)");
          break;

        case "bottom":
          touchAction = "pan-x";
          transform = "translate3d(0, ".concat((this.current - 1) * -100, "%, 0)");
          break;
      }

      return {
        touchAction: touchAction,
        transform: transform
      };
    },
    overlayStyles: function overlayStyles() {
      return {
        background: "rgba(0, 0, 0, ".concat(this.current * .85, ")")
      };
    }
  },
  methods: {
    close: function close() {
      this.current = 0.0;
      this.previous = 1.0;
    },
    open: function open() {
      this.current = 1.0;
      this.previous = 0.0;
    },
    toggle: function toggle() {
      if (this.isOpen) this.close();else this.open();
    },
    calculateCurrent: function calculateCurrent() {
      var rect = this.content.getBoundingClientRect();

      switch (this.position) {
        case "top":
          return (this.currentPosition.y - this.startPosition.y) / rect.height;

        case "left":
          return (this.currentPosition.x - this.startPosition.x) / rect.width;

        case "right":
          return (this.currentPosition.x - this.startPosition.x) / rect.width * -1;

        case "bottom":
          return (this.currentPosition.y - this.startPosition.y) / rect.height * -1;
      }
    },
    checkState: function checkState() {
      this.current = Math.max(0, Math.min(1, this.calculateCurrent() + this.previous));
      if (!(this.current > 0 && this.current < 1 && !this.isDragging)) return;

      if (this.position === "top") {
        if (this.currentPosition.y >= this.previousPosition.y) this.current = 1;else this.current = 0;
      }

      if (this.position === "left") {
        if (this.currentPosition.x >= this.previousPosition.x) this.current = 1;else this.current = 0;
      }

      if (this.position === "right") {
        if (this.currentPosition.x <= this.previousPosition.x) this.current = 1;else this.current = 0;
      }

      if (this.position === "bottom") {
        if (this.currentPosition.y <= this.previousPosition.y) this.current = 1;else this.current = 0;
      }
    },
    isContentDragAvailable: function isContentDragAvailable(position) {
      if (this.current < 1) return true;
      if (!this.isWithinElement(position, this.content)) return true;
      if (this.position === "left" || this.position === "right") return Math.abs(position.x - this.currentPosition.x) > TRIGGER_SIZE;
      if (this.position === "top" || this.position === "bottom") return Math.abs(position.y - this.currentPosition.y) > TRIGGER_SIZE;
      return true;
    },
    isWithinElement: function isWithinElement(position, element) {
      return closest(document.elementFromPoint(position.x, position.y), element) !== null;
    },
    isWithinTriggerBounds: function isWithinTriggerBounds(position) {
      var rect = this.$el.getBoundingClientRect();

      switch (this.position) {
        case "top":
          return position.y - rect.top < TRIGGER_SIZE;

        case "left":
          return position.x - rect.left < TRIGGER_SIZE;

        case "right":
          return position.x > rect.left + rect.width - TRIGGER_SIZE;

        case "bottom":
          return position.y > rect.top + rect.height - TRIGGER_SIZE;
      }
    },
    onMouseWheel: function onMouseWheel(evt) {
      if (!this.isOpen) return;
      var deltaX = evt.deltaX,
          deltaY = evt.deltaY;
      if (Math.abs(deltaX) > 20 && (this.position === "left" || this.position === "right")) this.close();
      if (Math.abs(deltaY) > 20 && (this.position === "top" || this.position === "bottom")) this.close();
      if (!this.isWithinElement(getPosition(evt), this.content)) evt.preventDefault();
    },
    onPointerCancel: function onPointerCancel(evt) {
      if (!this.touchEnabled) return;
      this.isDragging = false;
      this.currentPosition = getPosition(evt);
      this.checkState();
    },
    onPointerDown: function onPointerDown(evt) {
      if (!this.touchEnabled) return;
      var position = getPosition(evt);
      if (!this.isOpen && !this.isWithinTriggerBounds(position)) return;
      this.isDragging = true;
      this.previous = this.current;
      this.currentPosition = position;
      this.previousPosition = position;
      this.startPosition = position;
      this.checkState();
    },
    onPointerMove: function onPointerMove(evt) {
      if (!this.touchEnabled) return;
      if (!this.isDragging) return;
      var position = getPosition(evt);
      if (!this.isContentDragAvailable(position)) return;
      this.previousPosition = this.currentPosition;
      this.currentPosition = position;
      this.checkState();
    },
    onPointerUp: function onPointerUp(evt) {
      if (!this.touchEnabled) return;
      if (!this.isDragging) return;
      var isSameLocation = this.currentPosition.x === this.startPosition.x && this.currentPosition.y === this.startPosition.y;
      if (!isSameLocation && evt.cancelable) evt.preventDefault();
      this.currentPosition = getPosition(evt);
      this.isDragging = false;
      if (this.previous === 1 && isSameLocation && !this.isWithinElement(this.currentPosition, this.content)) this.current = 0.0;else this.checkState();
    }
  },
  watch: {
    isOpen: function isOpen() {
      if (this.isOpen) getMainElement().classList.add("is-popup-opened");else getMainElement().classList.remove("is-popup-opened");
    }
  }
};

/* script */
            const __vue_script__$k = script$k;
            
/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"offscreen-overlay",class:_vm.overlayClasses,style:(_vm.overlayStyles)},[_c('div',{staticClass:"offscreen-content",class:_vm.contentClasses,style:(_vm.contentStyles)},[_vm._t("default")],2)])};
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
    component.__file = "OffscreenContainer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var OffscreenContainer = __vue_normalize__$k(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );

"use strict";

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
var script$l = {
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
      isVisible: false,
      parentRef: null
    };
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeChild(this.$el);
    this.parentRef.appendChild(this.$el);
  },
  destroyed: function destroyed() {
    remove(this.name);
  },
  mounted: function mounted() {
    register$1(this.name, this);
    this.parentRef = this.$el.parentNode;
    this.parentRef.removeChild(this.$el);
    document.body.appendChild(this.$el);
    if (this.opened) this.open(this.name);
  },
  methods: {
    close: function close$$1() {
      var _this = this;

      if (!this.isVisible) return;
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
      timeout(10, function () {
        needsZIndex(function (z) {
          return _this2.$el.style.setProperty("z-index", z);
        });
        _this2.isOpen = true;
      });
      dispatch("latte:overlay", {
        overlay: this,
        open: true
      });
      this.$emit("open", this);
    }
  },
  watch: {
    name: function name(n, o) {
      remove(o);
      register$1(n, this);
    },
    opened: function opened() {
      if (this.opened) this.open();else this.close();
    }
  }
};

/* script */
            const __vue_script__$l = script$l;
            
/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isVisible)?_c('div',{staticClass:"latte-overlay",class:{'is-visible': _vm.isVisible, 'is-open': _vm.isOpen},attrs:{"role":"dialog"}},[_vm._t("default")],2):_vm._e()};
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
    component.__file = "Overlay.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Overlay = __vue_normalize__$l(
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
//
//
//
//
//
//
//
//
//
var script$m = {
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
            const __vue_script__$m = script$m;
            
/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"pagination ml-auto",attrs:{"role":"navigation"}},[_vm._l((_vm.pagination),function(entry){return [_c('a',{staticClass:"pagination-item",class:{'is-current': entry.is_current, 'is-disabled': entry.is_disabled},attrs:{"role":"menuitem"},on:{"click":function($event){_vm.navigate(entry.page);}}},[(entry.is_dots)?[_vm._v("…")]:(entry.label === 'first')?[_c('i',{staticClass:"mdi mdi-chevron-double-left"})]:(entry.label === 'prev')?[_c('i',{staticClass:"mdi mdi-chevron-left"})]:(entry.label === 'next')?[_c('i',{staticClass:"mdi mdi-chevron-right"})]:(entry.label === 'last')?[_c('i',{staticClass:"mdi mdi-chevron-double-right"})]:[_vm._v(_vm._s(entry.label))]],2)]})],2)};
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
    component.__file = "Pagination.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Pagination = __vue_normalize__$m(
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
var script$n = {
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
            const __vue_script__$n = script$n;
            
/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-control"},[((_vm.fieldType)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.password)?_vm._i(_vm.password,null)>-1:(_vm.password)},on:{"change":function($event){var $$a=_vm.password,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.password=$$a.concat([$$v]));}else{$$i>-1&&(_vm.password=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.password=$$c;}}}},'input',_vm.bindings,false)):((_vm.fieldType)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":"radio"},domProps:{"checked":_vm._q(_vm.password,null)},on:{"change":function($event){_vm.password=null;}}},'input',_vm.bindings,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control-plain",attrs:{"autocomplete":_vm.autocomplete,"type":_vm.fieldType},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value;}}},'input',_vm.bindings,false)),_vm._v(" "),_c('button',{staticClass:"btn btn-text btn-icon btn-dark form-control-suffix",attrs:{"type":"button"},on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi",class:_vm.iconClass})])])};
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
    component.__file = "Password.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Password = __vue_normalize__$n(
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
window.pdfjsLib = window.pdfjsLib || undefined;
var script$o = {
  name: "latte-pdf-viewer",
  props: {
    source: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isLoading: false,
      pages: 0,
      pdf: null,
      rendered: 0
    };
  },
  mounted: function mounted() {
    this.load();
  },
  computed: {
    hasSupport: function hasSupport() {
      return pdfjsLib !== undefined;
    }
  },
  methods: {
    load: function load() {
      var _this = this;

      if (!this.hasSupport) return;
      this.isLoading = true;
      this.rendered = 0;
      pdfjsLib.getDocument(this.source).then(function (pdf) {
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
            const __vue_script__$o = script$o;
            
/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.hasSupport)?_c('div',{directives:[{name:"latte-context-menu",rawName:"v-latte-context-menu"}],staticClass:"panel pdf-viewer",class:{'is-loading': _vm.isLoading},staticStyle:{"min-height":"84px"},attrs:{"role":"presentation"}},[_vm._l((_vm.pages),function(i){return _c('div',{staticClass:"page",attrs:{"id":'page-' + i}},[_c('canvas')])}),_vm._v(" "),_c('span',{staticClass:"spinner"}),_vm._v(" "),_c('nav',{staticClass:"nav nav-list latte-context-menu"},[_c('a',{staticClass:"nav-link",attrs:{"href":_vm.source,"target":"_blank"}},[_c('i',{staticClass:"mdi mdi-open-in-new"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Open in new tab","pdf-viewer")))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.download}},[_c('i',{staticClass:"mdi mdi-download"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Download","pdf-viewer")))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.print}},[_c('i',{staticClass:"mdi mdi-printer"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Print","pdf-viewer")))])]),_vm._v(" "),_c('div',{staticClass:"divider divider-horizontal"}),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":_vm.load}},[_c('i',{staticClass:"mdi mdi-reload"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Reload","pdf-viewer")))])]),_vm._v(" "),_vm._t("menu")],2)],2):_c('div',{staticClass:"panel"},[_c('div',{staticClass:"panel-body text-center"},[_vm._v("\n\t\tPlease include PDF.js in your project.\n\t")])])};
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
    component.__file = "PdfViewer.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var PdfViewer = __vue_normalize__$o(
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
  name: "latte-popup",
  props: {
    associateWith: {
      default: undefined,
      required: false,
      type: HTMLElement | Vue | undefined,
      validator: function validator(val) {
        return val === undefined || val instanceof Vue || val instanceof HTMLElement;
      }
    },
    marginX: {
      default: 0,
      required: false,
      type: Number
    },
    marginY: {
      default: 0,
      required: false,
      type: Number
    },
    persistent: {
      default: false,
      required: false,
      type: Boolean
    },
    withArrow: {
      default: true,
      required: false,
      type: Boolean
    }
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeChild(this.$el);
    this.$el.removeOutsideEventListener("pointerdown", this.cb.onOutsideClick);
    window.removeEventListener("resize", this.cb.onResizeOrScroll);
    window.removeEventListener("scroll", this.cb.onResizeOrScroll);
  },
  data: function data() {
    var _this = this;

    return {
      cb: {
        onClick: function onClick(evt) {
          return _this.onClick(evt);
        },
        onOutsideClick: function onOutsideClick(evt) {
          return _this.onOutsideClick(evt);
        },
        onResizeOrScroll: function onResizeOrScroll(evt) {
          return _this.onResizeOrScroll(evt);
        }
      },
      isOpen: false,
      popupX: 0,
      popupY: 0,
      rect: null,
      x: 0,
      y: 0
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    // Move our element to body.
    this.$el.parentNode.removeChild(this.$el);
    document.body.appendChild(this.$el); // Update associate-with by updating our parent.

    if (this.$parent && this.$parent.$forceUpdate) this.$parent.$forceUpdate();
    this.$el.addOutsideEventListener("pointerdown", this.cb.onOutsideClick);
    window.addEventListener("resize", this.cb.onResizeOrScroll, {
      passive: true
    });
    window.addEventListener("scroll", this.cb.onResizeOrScroll, {
      passive: true
    });
    live(this.$el, "[href],[data-close]", "pointerup", function () {
      return timeout(25, function () {
        return _this2.close();
      });
    });
    on("latte:tick", function () {
      return _this2.onResizeOrScroll();
    });
    on("latte:context-menu", function () {
      return _this2.close();
    });
    on("latte:overlay", function () {
      return _this2.close();
    });
    on("latte:popup:hide", function () {
      return _this2.close();
    });
  },
  computed: {
    associatedElement: function associatedElement() {
      if (this.associateWith === undefined) return undefined;
      if (this.associateWith instanceof Vue) return this.associateWith.$el;
      return this.associateWith;
    },
    dropdownClasses: function dropdownClasses() {
      var classes = ["dropdown", "dropdown-fixed"];

      if (this.withArrow) {
        var aboveUnder = this.y > window.innerHeight / 2 ? "above" : "under";
        var position = this.x > window.innerWidth / 2 ? "right" : "left";
        classes.push("dropdown-".concat(position, "-").concat(aboveUnder));
      }

      if (this.isOpen === true) classes.push("is-open");
      return classes;
    },
    dropdownStyles: function dropdownStyles() {
      return {
        "transform": "translate3d(".concat(this.popupX, "px, ").concat(this.popupY, "px, 0)")
      };
    }
  },
  methods: {
    bindEvents: function bindEvents() {
      this.rect = this.associatedElement.getBoundingClientRect();
      this.associatedElement.addEventListener("click", this.cb.onClick, {
        passive: true
      });
    },
    unbindEvents: function unbindEvents() {
      this.rect = null;
      this.associatedElement.removeEventListener("click", this.cb.onClick, {
        passive: true
      });
    },
    close: function close() {
      this.isOpen = false;
    },
    open: function open() {
      var _this3 = this;

      needsZIndex(function (z) {
        return _this3.$el.style.setProperty("z-index", z);
      });
      this.isOpen = true;
    },
    toggle: function toggle() {
      if (this.isOpen) this.close();else this.open();
    },
    calculatePosition: function calculatePosition() {
      var pcr = this.$el.getBoundingClientRect();
      var px = this.x > window.innerWidth / 2 ? "right" : "left";
      var py = this.y > window.innerHeight / 2 ? "above" : "under";
      var l = this.x;
      var t = this.y;
      var h = this.rect !== null ? this.rect.height : 0;
      var w = this.rect !== null ? this.rect.width : 0;
      var x = l + this.marginX;
      var y = t + h + this.marginY;
      if (px === "right") x = l + w - (pcr.width + this.marginX);
      if (py === "above") y = t - (pcr.height + this.marginY);
      this.popupX = Math.round(x);
      this.popupY = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
    },
    setPosition: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    },
    onClick: function onClick() {
      this.toggle();
    },
    onOutsideClick: function onOutsideClick() {
      if (this.persistent) return;
      this.close();
    },
    onResizeOrScroll: function onResizeOrScroll() {
      if (this.associatedElement !== undefined) this.rect = this.associatedElement.getBoundingClientRect();
      this.calculatePosition();
    }
  },
  watch: {
    associateWith: function associateWith(n, o) {
      if (o !== undefined) this.unbindEvents();
      if (n !== undefined) this.bindEvents();
    },
    isOpen: function isOpen() {
      this.calculatePosition();
      dispatch("latte:tooltip:hide");

      if (this.isOpen) {
        dispatch("latte:popup:open", this);
        getMainElement().classList.add("is-popup-opened");
        this.$emit("open");
      } else {
        dispatch("latte:popup:close", this);
        getMainElement().classList.remove("is-popup-opened");
        this.$emit("close");
      }
    },
    rect: function rect() {
      if (this.rect !== null) {
        this.x = this.rect.left;
        this.y = this.rect.top;
      } else {
        this.x = 0;
        this.y = 0;
      }

      this.calculatePosition();
    }
  }
};

/* script */
            const __vue_script__$p = script$p;
            
/* template */
var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.dropdownClasses,style:(_vm.dropdownStyles)},[_c('div',{staticClass:"dropdown-content"},[_vm._t("default",null,null,this)],2)])};
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
    component.__file = "Popup.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Popup = __vue_normalize__$p(
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
//
//
//
//
//
var DASH_CAP = 69;
var script$q = {
  name: "latte-progress",
  props: {
    isIndeterminate: {
      default: false,
      required: false,
      type: Boolean
    },
    max: {
      default: 100,
      required: false,
      type: Number
    },
    min: {
      default: 0,
      required: false,
      type: Number
    },
    mode: {
      default: "bar",
      required: false,
      type: String,
      validator: function validator(value) {
        return ["bar", "ring"].includes(value);
      }
    },
    value: {
      default: 0,
      required: false,
      type: Number
    }
  },
  data: function data() {
    return {
      bar: 0,
      ring: 0
    };
  },
  mounted: function mounted() {
    this.renderProgress();
  },
  computed: {
    isBar: function isBar() {
      return this.mode === "bar";
    },
    isRing: function isRing() {
      return this.mode === "ring";
    },
    barStyle: function barStyle() {
      if (this.isIndeterminate) return {};
      return {
        width: "".concat(this.bar, "%")
      };
    },
    ringStyle: function ringStyle() {
      if (this.isIndeterminate) return "";
      return "".concat(this.ring, " 999");
    }
  },
  methods: {
    renderProgress: function renderProgress() {
      if (this.isIndeterminate) return;
      var max = this.max - this.min;
      var value = Math.max(this.min, Math.min(this.max, this.value)) - this.min;
      var p = value / max;
      if (this.isBar) this.renderProgressBar(p);else if (this.isRing) this.renderProgressRing(p);
    },
    renderProgressBar: function renderProgressBar(p) {
      this.bar = p * 100;
    },
    renderProgressRing: function renderProgressRing(p) {
      this.ring = p * DASH_CAP;
    }
  },
  watch: {
    isIndeterminate: function isIndeterminate() {
      this.renderProgress();
    },
    max: function max() {
      this.renderProgress();
    },
    mode: function mode() {
      this.renderProgress();
    },
    min: function min() {
      this.renderProgress();
    },
    value: function value() {
      this.renderProgress();
    }
  }
};

/* script */
            const __vue_script__$q = script$q;
            
/* template */
var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isBar)?_c('div',{staticClass:"progress progress-bar",class:{'is-indeterminate': _vm.isIndeterminate}},[_c('div',{staticClass:"progress-value",style:(_vm.barStyle)})]):(_vm.isRing)?_c('svg',{staticClass:"progress progress-ring",class:{'is-determinate': !_vm.isIndeterminate, 'is-indeterminate': _vm.isIndeterminate},staticStyle:{"height":"48px","width":"48px"},attrs:{"viewBox":"0 0 24 24"}},[_c('defs',[_c('linearGradient',{attrs:{"id":"wave"}},[_c('stop',{attrs:{"offset":"0%","stop-color":"transparent"}}),_vm._v(" "),_c('stop',{attrs:{"offset":"50%","stop-color":"var(--progress-wave-private)"}}),_vm._v(" "),_c('stop',{attrs:{"offset":"100%","stop-color":"transparent"}})],1)],1),_vm._v(" "),_c('circle',{staticClass:"progress-track",attrs:{"r":"11","cx":"12","cy":"12","x":"0","y":"0","fill":"transparent","stroke-width":"3"}}),_vm._v(" "),_c('circle',{staticClass:"progress-value",attrs:{"r":"11","cx":"12","cy":"12","x":"0","y":"0","fill":"transparent","stroke-width":"3","stroke-dasharray":_vm.ringStyle}})]):_vm._e()};
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
    component.__file = "Progress.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Progress = __vue_normalize__$q(
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
var script$r = {
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
            const __vue_script__$r = script$r;
            
/* template */
var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.as,_vm._g(_vm._b({tag:"component",scopedSlots:_vm._u([_vm._l((_vm.scopedSlots),function(slot){return {key:slot,fn:function(scope){return [_vm._t(slot,null,null,scope)]}}})])},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default"),_vm._v(" "),_vm._l((_vm.slots),function(slot){return _vm._t(slot,null,{slot:slot})})],2)};
var __vue_staticRenderFns__$q = [];

  /* style */
  const __vue_inject_styles__$r = undefined;
  /* scoped */
  const __vue_scope_id__$r = undefined;
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
    component.__file = "Ripple.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Ripple = __vue_normalize__$r(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    undefined,
    undefined
  );

//
var script$s = {
  name: "latte-svg-undraw",
  props: {
    color: {
      default: "#000000",
      required: false,
      type: String
    },
    url: {
      default: "",
      required: true,
      type: String
    }
  },
  data: function data() {
    return {
      svg: null
    };
  },
  mounted: function mounted() {
    this.onUrlChanged();
  },
  methods: {
    onReceivedSVG: function onReceivedSVG(response) {
      var color = this.color;
      this.svg = Vue.extend({
        template: response.replace(new RegExp(" width=\"([0-9.]+)\" height=\"([0-9.]+)\"", "g"), "").replace(/fill="#6c63ff"/g, ":fill=\"color\""),
        data: function data() {
          return {
            color: color
          };
        }
      });
    },
    onUrlChanged: function onUrlChanged() {
      var _this = this;

      request(this.url).then(function (r) {
        return r.text();
      }).then(function (r) {
        return _this.onReceivedSVG(r);
      }).catch(function (err) {
        return handleError$1(err);
      });
    }
  },
  watch: {
    color: function color() {
      if (this.$refs.svgComponent) this.$refs.svgComponent.color = this.color;
    },
    url: function url() {
      this.onUrlChanged();
    }
  }
};

/* script */
            const __vue_script__$s = script$s;
            
/* template */
var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.svg !== null)?_c(_vm.svg,{ref:"svgComponent",tag:"component"}):_vm._e()};
var __vue_staticRenderFns__$r = [];

  /* style */
  const __vue_inject_styles__$s = undefined;
  /* scoped */
  const __vue_scope_id__$s = undefined;
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
    component.__file = "SVGUndraw.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var SVGUndraw = __vue_normalize__$s(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
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
var script$t = {
  name: "latte-tab",
  props: {
    badge: {
      default: "",
      required: false,
      type: String
    },
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
            const __vue_script__$t = script$t;
            
/* template */
var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.active)?_c('div',{staticClass:"tab"},[_vm._t("default")],2):_vm._e()};
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
    component.__file = "Tab.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Tab = __vue_normalize__$t(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
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
var script$u = {
  name: "latte-tab-bar",
  data: function data() {
    return {
      tabs: []
    };
  },
  mounted: function mounted() {
    this.$parent.updateTabBars();
  },
  methods: {
    click: function click(index) {
      this.$parent.current = index;
    }
  }
};

/* script */
            const __vue_script__$u = script$u;
            
/* template */
var __vue_render__$t = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"nav nav-tabs"},_vm._l((_vm.tabs),function(tab,index){return _c('a',{staticClass:"nav-link",class:{'is-active': tab.active},on:{"click":function($event){_vm.click(index);}}},[(tab.icon !== '')?_c('i',{staticClass:"mdi",class:'mdi-' + tab.icon}):_vm._e(),_vm._v(" "),(tab.label !== '')?_c('span',[_vm._v(_vm._s(tab.label))]):_vm._e(),_vm._v(" "),(tab.badge !== '')?_c('span',{staticClass:"badge badge-primary ml-2"},[_vm._v(_vm._s(tab.badge))]):_vm._e()])}))};
var __vue_staticRenderFns__$t = [];

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* component normalizer */
  function __vue_normalize__$u(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var TabBar = __vue_normalize__$u(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
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
var script$v = {
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
      if (this.tabs[this.current]) this.tabs[this.current].active = true;
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
            const __vue_script__$v = script$v;
            
/* template */
var __vue_render__$u = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tab-container"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$u = [];

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* component normalizer */
  function __vue_normalize__$v(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var TabContainer = __vue_normalize__$v(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
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
var script$w = {
  name: "latte-timepicker-clock",
  props: {
    value: {
      default: function _default() {
        return new Date();
      },
      required: false,
      type: Date
    }
  },
  data: function data() {
    return {
      selectedHour: 1,
      selectedMinute: 0,
      selectedMeridiem: "am"
    };
  },
  computed: {
    hours: function hours() {
      var hours = [];

      for (var hour = this.isAMPM ? 1 : 0; hour <= (this.isAMPM ? 12 : 23); hour++) {
        hours.push(hour);
      }

      return hours;
    },
    minutes: function minutes() {
      var minutes = [];

      for (var minute = 0; minute <= 59; minute++) {
        minutes.push(minute);
      }

      return minutes;
    },
    isAMPM: function isAMPM() {
      return moment().localeData().longDateFormat("LT").endsWith("A");
    }
  },
  methods: {
    updateTime: function updateTime() {
      var date = new Date(this.value.getTime());
      date.setHours((this.isAMPM && this.selectedMeridiem === "pm" && this.selectedHour < 12 ? this.selectedHour + 12 : this.isAMPM && this.selectedMeridiem === "am" && this.selectedHour === 12 ? 0 : this.selectedHour) % 24);
      date.setMinutes(this.selectedMinute);
      this.$emit("input", date);
    }
  },
  watch: {
    selectedHour: function selectedHour() {
      this.updateTime();
    },
    selectedMinute: function selectedMinute() {
      this.updateTime();
    },
    selectedMeridiem: function selectedMeridiem() {
      this.updateTime();
    },
    value: {
      immediate: true,
      handler: function handler() {
        this.selectedHour = this.value.getHours();
        this.selectedMinute = this.value.getMinutes();
        this.selectedMeridiem = this.value.getHours() >= 12 ? "pm" : "am";
      }
    }
  }
};

/* script */
            const __vue_script__$w = script$w;
            
/* template */
var __vue_render__$v = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel panel-blank timepicker-clock"},[_c('div',{staticClass:"panel-header"},[_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedHour),expression:"selectedHour"}],staticClass:"custom-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedHour=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.hours),function(hour){return _c('option',{domProps:{"value":hour}},[_vm._v(_vm._s(hour.toString().padStart(2, "0")))])})),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedMinute),expression:"selectedMinute"}],staticClass:"custom-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedMinute=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.minutes),function(minute){return _c('option',{domProps:{"value":minute}},[_vm._v(_vm._s(minute.toString().padStart(2, "0")))])})),_vm._v(" "),(_vm.isAMPM)?_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.selectedMeridiem),expression:"selectedMeridiem"}],staticClass:"custom-select",on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.selectedMeridiem=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},[_c('option',{attrs:{"value":"am"}},[_vm._v("AM")]),_vm._v(" "),_c('option',{attrs:{"value":"pm"}},[_vm._v("PM")])]):_vm._e(),_vm._v(" "),_vm._t("after")],2)])};
var __vue_staticRenderFns__$v = [];

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
    component.__file = "TimePickerClock.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var TimePickerClock = __vue_normalize__$w(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );

//
var script$x = {
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
            const __vue_script__$x = script$x;
            
/* template */
var __vue_render__$w = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view"},_vm._l((_vm.children),function(child,key){return _c('latte-tree-view-item',{key:key,attrs:{"id":child.id,"parent_id":child.parent_id,"icon":child.icon,"name":child.name,"children":child.children || []},on:{"change":function($event){_vm.click($event);}}})}))};
var __vue_staticRenderFns__$w = [];

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
    component.__file = "TreeView.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var TreeView = __vue_normalize__$x(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
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
var script$y = {
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
            const __vue_script__$y = script$y;
            
/* template */
var __vue_render__$x = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view-item"},[_c('div',{staticClass:"tree-view-item-label",class:{'is-expanded': _vm.isExpanded},on:{"click":function($event){_vm.click(_vm.id);}}},[(_vm.children.length > 0)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark btn-sm",on:{"click":_vm.toggle}},[_c('i',{staticClass:"mdi mdi-chevron-right"})]):_vm._e(),_vm._v(" "),_c('i',{class:['tree-view-item-label-icon', 'mdi', 'mdi-' + _vm.icon]}),_vm._v(" "),_c('span',{staticClass:"tree-view-item-label-label"},[_vm._v(_vm._s(_vm.name))])]),_vm._v(" "),(_vm.children.length > 0 && _vm.isExpanded)?_c('div',{staticClass:"tree-view-item-children"},_vm._l((_vm.children),function(child,key){return _c('latte-tree-view-item',{key:key,attrs:{"id":child.id,"parent_id":child.parent_id,"icon":child.icon,"name":child.name,"children":child.children || []},on:{"change":function($event){_vm.click($event);}}})})):_vm._e()])};
var __vue_staticRenderFns__$x = [];

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
    component.__file = "TreeViewItem.vue";

    if (!component.render) {
      component.render = template.render;
      component.staticRenderFns = template.staticRenderFns;
      component._compiled = true;

      if (functional) component.functional = true;
    }

    component._scopeId = scope;

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var TreeViewItem = __vue_normalize__$y(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
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
var script$z = {
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
        return ["photo", "list"].includes(value);
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
            const __vue_script__$z = script$z;
            
/* template */
var __vue_render__$y = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"drop-container uploader",class:_vm.containerClasses,on:{"dragenter":_vm.onDragEnter,"dragleave":_vm.onDragLeave,"drop":_vm.onDrop}},[(!_vm.isDraggingOver)?_vm._t("drop-here",[_vm._v("Drop here to upload")],{uploader:this}):_vm._t("let-go",[_vm._v("Let go to upload")],{uploader:this}),_vm._v(" "),(!_vm.isMultiple && _vm.previewMode === 'photo' && _vm.files.length === 0)?[_c('img',{attrs:{"src":"","alt":""}})]:_vm._e()],2)};
var __vue_staticRenderFns__$y = [];

  /* style */
  const __vue_inject_styles__$z = function (inject) {
    if (!inject) return
    inject("data-v-760a0a43_0", { source: "\ndiv.drop-container{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border:2px dashed var(--outline-color-secondary);border-radius:var(--border-radius);text-align:center\n}\ndiv.drop-container.is-dragging>*{pointer-events:none\n}\ndiv.drop-container.is-dragging{background-color:rgba(var(--color-dark),.05);border-color:rgba(var(--color-dark),.1)\n}\ndiv.drop-container.is-dragging-over{background-color:rgba(var(--color-primary),.3);border-color:rgba(var(--color-primary),.1)\n}", map: undefined, media: undefined })
,inject("data-v-760a0a43_1", { source: "", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$z = "data-v-760a0a43";
  /* module identifier */
  const __vue_module_identifier__$z = undefined;
  /* functional template */
  const __vue_is_functional_template__$z = false;
  /* component normalizer */
  function __vue_normalize__$z(
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

    if (true) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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

        if (true && css.map) {
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
  

  
  var Uploader = __vue_normalize__$z(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$z,
    __vue_script__$z,
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    __vue_create_injector__$2,
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
var script$A = {
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
            const __vue_script__$A = script$A;
            
/* template */
var __vue_render__$z = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"drop-container uploader uploader-photo",class:_vm.containerClasses,on:{"dragenter":_vm.onDragEnter,"dragleave":_vm.onDragLeave,"drop":_vm.onDrop}},[(_vm.files.length === 1)?[_c('img',{staticClass:"preview-image single",attrs:{"src":_vm.urls[0],"alt":"Photo"}})]:_vm._e(),_vm._v(" "),(!_vm.isDraggingOver)?_vm._t("drop-here",[_vm._v("Drop here to upload")],{uploader:this}):_vm._t("let-go",[_vm._v("Let go to upload")],{uploader:this}),_vm._v(" "),_c('input',{ref:"fileInput",staticClass:"d-none",attrs:{"type":"file","accept":"image/*","name":_vm.name},on:{"change":_vm.onFilesSelected}})],2)};
var __vue_staticRenderFns__$z = [];

  /* style */
  const __vue_inject_styles__$A = function (inject) {
    if (!inject) return
    inject("data-v-69cfac5b_0", { source: "\ndiv.drop-container{position:relative;display:flex;align-items:center;justify-content:center;background-color:transparent;border:2px dashed var(--outline-color-secondary);border-radius:var(--border-radius);text-align:center\n}\ndiv.drop-container.is-dragging>*{pointer-events:none\n}\ndiv.drop-container.is-dragging{background-color:rgba(var(--color-dark),.05);border-color:rgba(var(--color-dark),.1)\n}\ndiv.drop-container.is-dragging-over{background-color:rgba(var(--color-primary),.3);border-color:rgba(var(--color-primary),.1)\n}", map: undefined, media: undefined })
,inject("data-v-69cfac5b_1", { source: "\ndiv.uploader[data-v-69cfac5b]{z-index:0\n}\ndiv.uploader div.uploader-info[data-v-69cfac5b]{z-index:1\n}\ndiv.uploader img.preview-image.single[data-v-69cfac5b]{position:absolute;display:block;height:100%;width:100%;top:0;left:0;right:0;bottom:0;border-radius:inherit;object-fit:cover;object-position:center center;pointer-events:none;z-index:0\n}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$A = "data-v-69cfac5b";
  /* module identifier */
  const __vue_module_identifier__$A = undefined;
  /* functional template */
  const __vue_is_functional_template__$A = false;
  /* component normalizer */
  function __vue_normalize__$A(
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

    if (true) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  function __vue_create_injector__$3() {
    const head = document.head || document.getElementsByTagName('head')[0];
    const styles = __vue_create_injector__$3.styles || (__vue_create_injector__$3.styles = {});
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

        if (true && css.map) {
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
  

  
  var UploaderPhoto = __vue_normalize__$A(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$A,
    __vue_script__$A,
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    __vue_create_injector__$3,
    undefined
  );

"use strict";
/**
 * Replaces params in a string.
 *
 * @param {String} string
 * @param {Array} params
 *
 * @returns {*}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function replace(string) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  for (var i = 0; i < params.length; i++) {
    string = string.replace(new RegExp("@".concat(i), 'g'), params[i]);
  }

  return string;
}
/**
 * Translates a string.
 *
 * @param {String} domain
 * @param {String} string
 * @param {Array} params
 *
 * @returns {String}
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */

function translate(domain, string) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var translations = window.LatteI18n || {};
  if (translations === null || typeof translations[domain] === "undefined" || typeof translations[domain][string] === "undefined") return replace(string, params);
  return replace(translations[domain][string], params);
}
Vue.filter("i18n", function (value) {
  var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";

  for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    params[_key - 2] = arguments[_key];
  }

  return Latte.i18n.translate(domain, value, params);
});
var i18n = {
  replace: replace,
  translate: translate
};

"use strict";
function initializeNotices() {
  var notices = Array.from(document.querySelectorAll("div.notice"));
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
  return entity["@type"] === "Latte\\Framework\\Entity\\Notice";
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
var script$B = {
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
        if (typeof this.currentFile.variants !== "undefined" && typeof this.currentFile.variants[3] !== "undefined") return this.currentFile.variants[3].path;else return this.currentFile.path;
      }

      return this.noPicture;
    }
  },
  methods: {
    cancel: function cancel() {
      URL.revokeObjectURL(this.previewUrl);
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
        create(translate("file-manager", "Invalid file selected."), "error", true);
        return;
      }

      var previewUrl = URL.createObjectURL(this.$refs.file_input.files[0]);
      if (this.previewUrl === previewUrl) return;
      if (this.previewUrl !== null) URL.revokeObjectURL(this.previewUrl);
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
            const __vue_script__$B = script$B;
            
/* template */
var __vue_render__$A = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"latte-drop-container latte-upload-user-photo",attrs:{"id":_vm.uniqueId},on:{"drop":_vm.onDrop}},[_c('div',{staticClass:"row no-gutters"},[_c('div',{staticClass:"col align-self-center text-center",staticStyle:{"flex-grow":"0"}},[_c('img',{staticClass:"avatar avatar-medium",attrs:{"src":_vm.imageSource,"alt":"Photo"},on:{"load":_vm.onImageLoaded}}),_vm._v(" "),(_vm.isLoading)?_c('span',{staticClass:"spinner spinner-primary above-parent"}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col d-flex align-self-center mt-3 mt-lg-0 ml-0 ml-lg-auto",staticStyle:{"flex-grow":"0"}},[_c('button',{staticClass:"btn btn-contained btn-primary",attrs:{"type":"button"},on:{"click":_vm.selectFile}},[_c('i',{staticClass:"mdi mdi-plus-circle"}),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Select","file-manager")))])]),_vm._v(" "),(_vm.currentFile !== null && _vm.previewUrl === null)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",attrs:{"type":"button"},on:{"click":_vm.remove}},[_c('i',{staticClass:"mdi mdi-delete"})]):_vm._e(),_vm._v(" "),(_vm.previewUrl !== null)?_c('button',{staticClass:"btn btn-text btn-icon btn-dark",attrs:{"type":"button"},on:{"click":_vm.cancel}},[_c('i',{staticClass:"mdi mdi-close"})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"drop-here",class:{'is-droppable': _vm.isDroppable}},[_vm._v(_vm._s(_vm._f("i18n")("Place photo here to upload.","file-manager")))]),_vm._v(" "),_c('input',{ref:"file_id",attrs:{"type":"hidden","name":_vm.name + '_id'},domProps:{"value":_vm.fileId}}),_vm._v(" "),_c('input',{ref:"file_input",staticClass:"d-none",attrs:{"type":"file","accept":"image/*","name":_vm.name + '_file',"id":_vm.name},on:{"change":_vm.onFileSelected}})])};
var __vue_staticRenderFns__$A = [];

  /* style */
  const __vue_inject_styles__$B = undefined;
  /* scoped */
  const __vue_scope_id__$B = undefined;
  /* module identifier */
  const __vue_module_identifier__$B = undefined;
  /* functional template */
  const __vue_is_functional_template__$B = false;
  /* component normalizer */
  function __vue_normalize__$B(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var UploadUserPhoto = __vue_normalize__$B(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$B,
    __vue_script__$B,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
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
DatePickerCalendar: DatePickerCalendar,
DateTimePicker: DateTimePicker,
Draggable: Draggable,
Grid: Grid,
GridItem: GridItem,
JsonEditor: JsonEditor,
JsonEditorIaf: JsonEditorIaf,
JsonEditorView: JsonEditorView,
JsonEditorViewArray: JsonEditorViewArray,
MegaMenu: MegaMenu,
Moment: Moment,
Notifications: Notifications,
OffscreenContainer: OffscreenContainer,
Overlay: Overlay,
Pagination: Pagination,
Password: Password,
PdfViewer: PdfViewer,
Popup: Popup,
Progress: Progress,
Ripple: Ripple,
SVGUndraw: SVGUndraw,
Tab: Tab,
TabBar: TabBar,
TabContainer: TabContainer,
TimePickerClock: TimePickerClock,
TreeView: TreeView,
TreeViewItem: TreeViewItem,
Uploader: Uploader,
UploaderPhoto: UploaderPhoto,
UploadUserPhoto: UploadUserPhoto
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
  name: "click-away",
  bind: bind,
  unbind: unbind,
  update: update
};

var ContextMenu = {
  name: "latte-context-menu",
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



var Directives = /*#__PURE__*/Object.freeze({
ClickAway: ClickAway,
ContextMenu: ContextMenu
});

var script$C = {
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
            const __vue_script__$C = script$C;
            
/* template */

  /* style */
  const __vue_inject_styles__$C = undefined;
  /* scoped */
  const __vue_scope_id__$C = undefined;
  /* module identifier */
  const __vue_module_identifier__$C = undefined;
  /* functional template */
  const __vue_is_functional_template__$C = undefined;
  /* component normalizer */
  function __vue_normalize__$C(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Dashboard = __vue_normalize__$C(
    {},
    __vue_inject_styles__$C,
    __vue_script__$C,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    undefined,
    undefined
  );

var script$D = {
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
            const __vue_script__$D = script$D;
            
/* template */

  /* style */
  const __vue_inject_styles__$D = undefined;
  /* scoped */
  const __vue_scope_id__$D = undefined;
  /* module identifier */
  const __vue_module_identifier__$D = undefined;
  /* functional template */
  const __vue_is_functional_template__$D = undefined;
  /* component normalizer */
  function __vue_normalize__$D(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Login = __vue_normalize__$D(
    {},
    __vue_inject_styles__$D,
    __vue_script__$D,
    __vue_scope_id__$D,
    __vue_is_functional_template__$D,
    __vue_module_identifier__$D,
    undefined,
    undefined
  );

//
var USER_CACHE = {};
var script$E = {
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
      var classes = ["dropdown", "dropdown-fixed", "dropdown-".concat(position, "-").concat(aboveUnder)];
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
            const __vue_script__$E = script$E;
            
/* template */
var __vue_render__$B = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-away",rawName:"v-click-away",value:(_vm.closeByClickAway),expression:"closeByClickAway"}],ref:"dropdown",staticClass:"panel",class:_vm.dropdownClasses,style:(_vm.dropdownStyle)},[(!_vm.isLoading)?_c('div',{staticClass:"dropdown-content profile-popover"},[_c('div',{staticClass:"panel-header"},[_c('img',{staticClass:"avatar mr-3",staticStyle:{"font-size":"36px"},attrs:{"src":_vm.user.photo.thumb_128,"alt":_vm.user.name}}),_vm._v(" "),_c('span',{staticClass:"panel-title"},[_vm._v(_vm._s(_vm.user.name))])]),_vm._v(" "),_c('nav',{staticClass:"nav nav-list"},[_c('a',{staticClass:"nav-link",attrs:{"href":"#"}},[_c('i',{staticClass:"mdi mdi-phone"}),_c('span',[_vm._v("Call "+_vm._s(_vm.user["firstname"]))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",attrs:{"href":"#"}},[_c('i',{staticClass:"mdi mdi-email"}),_c('span',[_vm._v("Email "+_vm._s(_vm.user["firstname"]))])]),_vm._v(" "),_c('a',{staticClass:"nav-link",attrs:{"href":_vm.profileUrl}},[_c('i',{staticClass:"mdi mdi-account-card-details"}),_c('span',[_vm._v("View profile")])])])]):_c('div',{staticClass:"dropdown-content px-5 py-3"},[_c('span',{staticClass:"spinner spinner-primary"})])])};
var __vue_staticRenderFns__$B = [];

  /* style */
  const __vue_inject_styles__$E = undefined;
  /* scoped */
  const __vue_scope_id__$E = undefined;
  /* module identifier */
  const __vue_module_identifier__$E = undefined;
  /* functional template */
  const __vue_is_functional_template__$E = false;
  /* component normalizer */
  function __vue_normalize__$E(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var ProfilePopover = __vue_normalize__$E(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$E,
    __vue_script__$E,
    __vue_scope_id__$E,
    __vue_is_functional_template__$E,
    __vue_module_identifier__$E,
    undefined,
    undefined
  );



var Views = /*#__PURE__*/Object.freeze({
Dashboard: Dashboard,
Login: Login,
ProfilePopover: ProfilePopover
});

"use strict";
function spaceship(a, b) {
  if (a === null || b === null || _typeof(a) !== _typeof(b)) return null;
  if (typeof a === "string") return a.localeCompare(b);
  if (a > b) return 1;else if (a < b) return -1;
  return 0;
}
var operators = {
  spaceship: spaceship
};

"use strict";
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
  PROCEED: 512,
  ALLOW: 1024,
  DENY: 2048
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
  classes: ["btn-contained", "btn-error"],
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
}, {
  id: Buttons.ALLOW,
  icon: "check-circle",
  label: "Allow",
  classes: ["btn-contained", "btn-primary"],
  weight: 1
}, {
  id: Buttons.DENY,
  icon: "close-circle",
  label: "Deny",
  classes: ["btn-text", "btn-dark"],
  weight: 0
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
    needsZIndex(function (z) {
      return overlay.style.setProperty("z-index", z);
    });
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
          Latte.actions.dispatch("latte:overlay", {
            overlay: overlay,
            open: false
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
    Latte.actions.dispatch("latte:overlay", {
      overlay: overlay,
      open: true
    });
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

//
var script$F = {
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
        widgetDeleteConfirmationTitle: "Are you sure?",
        widgetDeleteConfirmationBody: "This widget will be deleted permanently!"
      }
    };
  },
  methods: {
    removeWidget: function removeWidget() {
      var _this = this;

      confirm(translate("widgets", "Delete this widget?"), translate("widgets", "It will be deleted permanently and is not recoverable.")).then(function (r) {
        if (r.button !== Buttons.OK) return;

        _this.$emit("remove", _this.widgetId);
      });
    }
  }
};

/* script */
            const __vue_script__$F = script$F;
            
/* template */
var __vue_render__$C = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel widget",class:{'is-custom-body': _vm.customBody},attrs:{"tabindex":"0"}},[_c('div',{staticClass:"panel-header"},[_c('div',{staticClass:"widget-drag-handle grid-item-drag-handle"}),_vm._v(" "),_vm._t("custom_title"),_vm._v(" "),_c('div',{staticClass:"ml-auto d-flex flex-row align-items-center"},[_vm._t("title"),_vm._v(" "),_c('latte-button-dropdown',{attrs:{"icon":"dots-vertical","small":true,"type":"list"}},[_c('nav',{staticClass:"nav nav-list"},[_vm._t("widget_menu"),_vm._v(" "),_c('a',{staticClass:"nav-link",on:{"click":function($event){_vm.removeWidget();}}},[_c('i',{staticClass:"mdi mdi-delete"}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm._f("i18n")("Delete")))])])],2)])],2)],2),_vm._v(" "),_c('div',{staticClass:"panel-body"},[_vm._t("content")],2),_vm._v(" "),_vm._t("footer")],2)};
var __vue_staticRenderFns__$C = [];

  /* style */
  const __vue_inject_styles__$F = undefined;
  /* scoped */
  const __vue_scope_id__$F = undefined;
  /* module identifier */
  const __vue_module_identifier__$F = undefined;
  /* functional template */
  const __vue_is_functional_template__$F = false;
  /* component normalizer */
  function __vue_normalize__$F(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var Widget = __vue_normalize__$F(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$F,
    __vue_script__$F,
    __vue_scope_id__$F,
    __vue_is_functional_template__$F,
    __vue_module_identifier__$F,
    undefined,
    undefined
  );

//
var script$G = {
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
            const __vue_script__$G = script$G;
            
/* template */
var __vue_render__$D = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('latte-widget',_vm._b({staticClass:"widget-today",attrs:{"custom-body":true},on:{"remove":_vm.onRemove}},'latte-widget',_vm.$props,false),[_c('div',{staticClass:"widget-today-datetime",attrs:{"slot":"content"},slot:"content"},[_c('div',{staticClass:"date"},[_c('span',{staticClass:"day text-capitalize"},[_vm._v(_vm._s(_vm.currentDay))]),_vm._v(" "),_c('span',{staticClass:"date"},[_vm._v(_vm._s(_vm.currentDate))]),_vm._v(" "),_c('span',{staticClass:"monthyear text-capitalize"},[_vm._v(_vm._s(_vm.currentMonth)+" "+_vm._s(_vm.currentYear)+" — Week "+_vm._s(_vm.currentWeekNumber))])]),_vm._v(" "),_c('div',{staticClass:"time"},[_c('span',{attrs:{"id":"hours"}},[_vm._v(_vm._s(_vm.currentTimeHours))]),_c('span',{staticClass:"dots"},[_vm._v(":")]),_c('span',{attrs:{"id":"minutes"}},[_vm._v(_vm._s(_vm.currentTimeMinutes))]),_c('span',{attrs:{"id":"seconds"}},[_c('span',{staticClass:"dots"},[_vm._v(":")]),_vm._v(_vm._s(_vm.currentTimeSeconds))])])])])};
var __vue_staticRenderFns__$D = [];

  /* style */
  const __vue_inject_styles__$G = undefined;
  /* scoped */
  const __vue_scope_id__$G = undefined;
  /* module identifier */
  const __vue_module_identifier__$G = undefined;
  /* functional template */
  const __vue_is_functional_template__$G = false;
  /* component normalizer */
  function __vue_normalize__$G(
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

    if (false) {
      let hook;
      if (false) {
        // In SSR.
        hook = function(context) {
          // 2.3 injection
          context =
            context || // cached call
            (this.$vnode && this.$vnode.ssrContext) || // stateful
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
          // 2.2 with runInNewContext: true
          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          }
          // inject component styles
          if (style) {
            style.call(this, createInjectorSSR(context));
          }
          // register component module identifier for async chunk inference
          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        component._ssrRegister = hook;
      }
      else if (style) {
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
  
  /* style inject SSR */
  

  
  var WidgetToday = __vue_normalize__$G(
    { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
    __vue_inject_styles__$G,
    __vue_script__$G,
    __vue_scope_id__$G,
    __vue_is_functional_template__$G,
    __vue_module_identifier__$G,
    undefined,
    undefined
  );



var Widgets = /*#__PURE__*/Object.freeze({
Widget: Widget,
WidgetToday: WidgetToday
});

"use strict";

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

"use strict";
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
    data: function data() {
      return {
        any: {}
      };
    },
    mounted: function mounted() {
      initializeTick();
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

function initializeTick() {
  interval(100, function () {
    return dispatch("latte:tick", window.performance.now());
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
  var params = {};
  var data = new URLSearchParams(hash);
  data.forEach(function (value, key) {
    var vars = {};

    if (value.indexOf("/") > -1) {
      var ad = value.split("/");
      value = ad.shift();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = ad[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var d = _step.value;
          var kv = d.split(":", 2);
          vars[kv[0]] = kv[1];
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
    }

    params[key] = {
      value: value,
      vars: vars
    };
  });
  dispatch("latte:hash-change", params);
}

function removeQueryString() {
  var queryString = window.location.search.substr(1);
  if (queryString === "") return;
  if (queryString.substr(0, 6) === "saved=") history.replaceState(null, '', window.location.pathname || window.location.path);
}

"use strict";

function initializeForms() {
  document.querySelectorAll("form[method=\"post\"]").forEach(function (form) {
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

"use strict";

function initializePanels() {
  document.querySelectorAll("div.panel > table").forEach(function (t) {
    return t.parentNode.classList.add("panel-table");
  });
  document.querySelectorAll("div.panel.panel-toggleable").forEach(function (panel) {
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

"use strict";
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

"use strict";

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

"use strict";

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

"use strict";
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
  string: string,
  vue: Vue
};

"use strict";
window.LatteMomentLocale = window.LatteMomentLocale || "en";
Object.values(Directives).forEach(function (d) {
  return Vue.directive(d.name, d);
});
Object.values(Components).forEach(function (c) {
  return Vue.component(c.name, c);
});
Object.values(Views).forEach(function (v) {
  return Vue.component(v.name, v);
});
Object.values(Widgets).forEach(function (w) {
  return Vue.component(w.name, w);
});
moment.locale(window.LatteMomentLocale);
window.addEventListener("DOMContentLoaded", function () {
  createRootComponent();
  initializeForms();
  initializeNotices();
  initializePanels();
  initializeTooltips();
});

}());
