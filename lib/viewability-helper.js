(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("viewability-helper", [], factory);
	else if(typeof exports === 'object')
		exports["viewability-helper"] = factory();
	else
		root["viewability-helper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomHelper = function () {
  function DomHelper() {
    _classCallCheck(this, DomHelper);
  }

  _createClass(DomHelper, null, [{
    key: 'addDomEvent',
    value: function addDomEvent(ele, event, func) {
      if (ele.addEventListener) {
        // Good Guys
        ele.addEventListener(event, func, true);
      } else if (ele.attachEvent && typeof ele.attachEvent === 'function') {
        //Internet Explorer
        ele.attachEvent('on' + event, function () {
          func.call(ele);
        });
      }
    }
  }, {
    key: 'removeDomEvent',
    value: function removeDomEvent(ele, event, func) {
      if (ele.removeEventListener) {
        // Good Guys
        ele.removeEventListener(event, func, true);
      } else if (ele.detachEvent) {
        //Internet Explorer
        ele.detachEvent('on' + event, func);
      }
    }
  }]);

  return DomHelper;
}();

var PositionCalculation = function () {
  function PositionCalculation() {
    var _this = this;

    _classCallCheck(this, PositionCalculation);

    this.viewPortSize = { height: 0, width: 0 };

    // First time
    this.setViewPortSizeGlobal();

    // Only when window resize call the setters
    DomHelper.addDomEvent(window, 'resize', function () {
      _this.setViewPortSizeGlobal();
    });
  }

  /**
   * Finds the user viewport size
   */


  _createClass(PositionCalculation, [{
    key: 'setViewPortSizeGlobal',
    value: function setViewPortSizeGlobal() {
      var isStdBrowser = void 0,
          isIE = void 0,
          isOldIE = void 0,
          result = void 0;

      result = {
        height: 0,
        width: 0
      };

      // the more standard compliant browsers
      isStdBrowser = window.innerWidth !== undefined;
      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
      isIE = document.documentElement !== undefined && document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0;
      isOldIE = isStdBrowser === false && isIE === false; // older versions of IE

      if (isStdBrowser) {
        result.height = window.innerHeight;
        result.width = window.innerWidth;
      } else if (isIE) {
        result.height = document.documentElement.clientHeight;
        result.width = document.documentElement.clientWidth;
      } else if (isOldIE) {
        result.height = document.getElementsByTagName('body')[0].clientHeight;
        result.width = document.getElementsByTagName('body')[0].clientWidth;
      }

      this.viewPortSize = result;
    }
  }, {
    key: 'getViewportSizeGlobal',
    value: function getViewportSizeGlobal() {
      return this.viewPortSize;
    }

    /**
     * Determines if an element is in the viewport or not
     * @param ele
     * @param percentage
     * @returns {boolean}
     */

  }, {
    key: 'isInViewport',
    value: function isInViewport(ele, percentage) {
      if (!ele || percentage < 0 || percentage > 100) {
        return false;
      }

      var rect = ele.getBoundingClientRect(),
          viewPort = this.getViewportSizeGlobal().height,
          eleHeight = ele.clientHeight,
          eleHeightByPercentage = void 0;

      eleHeightByPercentage = Math.round(eleHeight * percentage / 100); // Calculate the height by the percentage
      eleHeightByPercentage = eleHeightByPercentage > viewPort ? viewPort - 1 : eleHeightByPercentage; // When viewport is smaller than the element height
      return rect.top + eleHeightByPercentage <= viewPort && rect.bottom - eleHeightByPercentage >= 0;
    }
  }]);

  return PositionCalculation;
}();

var ViewabilityHelper = function () {
  function ViewabilityHelper(element, callback, options) {
    _classCallCheck(this, ViewabilityHelper);

    // The element to watch
    this._element = element;
    // Callback function
    this._callback = callback;
    // Position Calculation Object
    this.posCalcObj = null;
    // Flag if element is in view
    this.elementIsViewed = false;
    // Dimmer flag for scroll
    this.posScrollLock = false;
    // Feature flag for the intersection observer API
    this.hasIntersectionObserverSupport = typeof window['IntersectionObserver'] === 'function';
    // options object
    this.options = {
      'callbackParams': [],
      'rootMargin': '0px',
      'intersectPercentage': 0,
      'scrollDimmer': 200,
      'unobserve': false,
      'threshold': [1]
    };

    // merge options with argument options
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key];
      }
    }
  }

  /**
   * Callback function for scroll event
   */


  _createClass(ViewabilityHelper, [{
    key: 'windowScrolled',
    value: function windowScrolled() {
      var _this2 = this;

      if (!this.posScrollLock) {
        this.searchForExposedElement();
        setTimeout(function () {
          _this2.posScrollLock = false;
        }, this.options['scrollDimmer']);
        this.posScrollLock = true;
      }
    }

    /**
     * Searches for the element in the viewport
     */

  }, {
    key: 'searchForExposedElement',
    value: function searchForExposedElement() {
      var isInsidePos = this.posCalcObj.isInViewport(this._element, this.options['intersectPercentage']);
      // Take the closeness status of the element
      if (isInsidePos) {
        if (!this.elementIsViewed) {
          this.elementIsViewed = true;
          this._callback.apply(this, this.options['callbackParams']);
          if (this.options['unobserve']) {
            this.Helpers.removeDomEvent(window, 'scroll', this.windowScrolled);
            delete this.posCalcObj;
          }
        }
      } else {
        this.elementIsViewed = false;
      }
    }

    /**
     * Observes an element using the Intersection Observer API
     */

  }, {
    key: 'observeElement',
    value: function observeElement() {
      var options = {
        rootMargin: this.options['rootMargin'],
        threshold: this.options['threshold']
      },
          observer = new window['IntersectionObserver'](this.observerCallback.bind(this), options);
      observer.observe(this._element);
    }

    /**
     * Intersection Observer Callback
     * @param entries
     * @param observer
     */

  }, {
    key: 'observerCallback',
    value: function observerCallback(entries, observer) {
      if (entries && entries[0] && entries[0]['intersectionRatio'] > this.options['intersectPercentage']) {
        this._callback.apply(this, this.options['callbackParams']);
        if (this.options['unobserve']) {
          // Stop observing intersections for the current widget
          observer['unobserve'](entries[0]['target']);
          // Stop observing threshold
          observer['disconnect']();
        }
      }
    }

    /**
     * Start Observing an element
     * Way of observing the element decided using the feature flag
     */

  }, {
    key: 'observe',
    value: function observe() {
      if (this.hasIntersectionObserverSupport) {
        this.observeElement();
      } else {
        this.posCalcObj = new PositionCalculation();
        DomHelper.addDomEvent(window, 'scroll', this.windowScrolled);
        this.windowScrolled();
      }
    }
  }]);

  return ViewabilityHelper;
}();

exports.default = ViewabilityHelper;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=viewability-helper.js.map