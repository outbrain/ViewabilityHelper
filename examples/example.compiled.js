/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports["viewability-helper"] = t() : e["viewability-helper"] = t();
}(undefined, function () {
  return function (e) {
    function t(i) {
      if (n[i]) return n[i].exports;var o = n[i] = { i: i, l: !1, exports: {} };return e[i].call(o.exports, o, o.exports, t), o.l = !0, o.exports;
    }var n = {};return t.m = e, t.c = n, t.i = function (e) {
      return e;
    }, t.d = function (e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 0);
  }([function (e, t, n) {
    "use strict";
    function i(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }Object.defineProperty(t, "__esModule", { value: !0 });var o = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];for (var i in n) {
          Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        }
      }return e;
    },
        r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        s = function () {
      function e() {
        i(this, e);
      }return r(e, null, [{ key: "addDomEvent", value: function value(e, t, n) {
          e.addEventListener ? e.addEventListener(t, n, !0) : e.attachEvent && "function" == typeof e.attachEvent && e.attachEvent("on" + t, function () {
            n.call(e);
          });
        } }, { key: "removeDomEvent", value: function value(e, t, n) {
          e.removeEventListener ? e.removeEventListener(t, n, !0) : e.detachEvent && e.detachEvent("on" + t, n);
        } }]), e;
    }(),
        l = function () {
      function e() {
        i(this, e), this.viewPortSize = { height: 0, width: 0 }, this.setViewPortSizeGlobal(), s.addDomEvent(window, "resize", this.setViewPortSizeGlobal);
      }return r(e, [{ key: "setViewPortSizeGlobal", value: function value() {
          var e = void 0,
              t = void 0,
              n = void 0,
              i = void 0;i = { height: 0, width: 0 }, e = void 0 !== window.innerWidth, t = void 0 !== document.documentElement && void 0 !== document.documentElement.clientWidth && 0 !== document.documentElement.clientWidth, n = !1 === e && !1 === t, e ? (i.height = window.innerHeight, i.width = window.innerWidth) : t ? (i.height = document.documentElement.clientHeight, i.width = document.documentElement.clientWidth) : n && (i.height = document.getElementsByTagName("body")[0].clientHeight, i.width = document.getElementsByTagName("body")[0].clientWidth), this.viewPortSize = i;
        } }, { key: "getViewportSizeGlobal", value: function value() {
          return this.viewPortSize;
        } }, { key: "isInViewport", value: function value(e, t) {
          if (!e || t < 0 || t > 100) return !1;var n = e.getBoundingClientRect(),
              i = this.getViewportSizeGlobal().height,
              o = e.clientHeight,
              r = void 0;return r = Math.round(o * t / 100), r = r > i ? i - 1 : r, n.top + r <= i && n.bottom - r >= 0;
        } }]), e;
    }(),
        c = function () {
      function e(t, n, r) {
        i(this, e), this._element = t, this._callback = n, this._posCalcObj = {}, this._elementIsViewed = !1, this._posScrollLock = !1, this._hasIntersectionObserverSupport = "function" == typeof window.IntersectionObserver, this._options = { callbackParams: [], rootMargin: "0px", intersectPercentage: 0, scrollDimmer: 200, unobserve: !1, threshold: [1] }, this._options = o({}, this._options, r);
      }return r(e, [{ key: "windowScrolled", value: function value() {
          var e = this;this._posScrollLock || (this.searchForExposedElement(), setTimeout(function () {
            e._posScrollLock = !1;
          }, this._options.scrollDimmer), this._posScrollLock = !0);
        } }, { key: "searchForExposedElement", value: function value() {
          this._posCalcObj || (this._posCalcObj = new l()), this._posCalcObj.isInViewport(this._element, this._options.intersectPercentage) ? this._elementIsViewed || (this._elementIsViewed = !0, this._callback.apply(this, this._options.callbackParams), this._options.unobserve && (s.removeDomEvent(window, "scroll", this.windowScrolled), delete this._posCalcObj)) : this._elementIsViewed = !1;
        } }, { key: "observeElement", value: function value() {
          var e = { rootMargin: this._options.rootMargin, threshold: this._options.threshold };new window.IntersectionObserver(this.observerCallback.bind(this), e).observe(this._element);
        } }, { key: "observerCallback", value: function value(e, t) {
          e && e[0] && e[0].intersectionRatio > this._options.intersectPercentage && (this._callback.apply(this, this._options.callbackParams), this._options.unobserve && (t.unobserve(e[0].target), t.disconnect()));
        } }, { key: "observe", value: function value() {
          this._hasIntersectionObserverSupport ? this.observeElement() : (this._posCalcObj = new l(), s.addDomEvent(window, "scroll", this.windowScrolled.bind(this)), this.windowScrolled());
        } }]), e;
    }();t.default = c, e.exports = t.default;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ViewabilityHelper = __webpack_require__(0);

var myObserver = new ViewabilityHelper(document.getElementById('cube'), function () {
    console.log('Observed');
}, { threshold: [0], unobserve: true });

myObserver.observe();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=example.compiled.js.map