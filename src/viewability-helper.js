/*
 Copyright 2017 Outbrain Inc
 Author: Liron Zluf

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
  'use strict';

  window['ViewabilityHelper'] = class {

    constructor(element, callback, options) {
      this._element = element;
      this._callback = callback;
      this.posCalcObj = null;
      this.elementIsViewed = false;
      this.posScrollLock = false;
      this.hasIntersectionObserverSupport = (typeof (window['IntersectionObserver']) === 'function');
      this.options = {
        'callbackParams': [],
        'rootMargin': '0px',
        'intersectPercentage': 0,
        'scrollDimmer': 200,
        'unobserve': false,
        'threshold': [1]
      };

      for (let key in options) {
        if (options.hasOwnProperty(key)) {
          this.options[key] = options[key];
        }
      }
    }

    windowScrolled() {
      if (!this.posScrollLock) {
        this.searchForExposedElement();
        setTimeout(() => {
          this.posScrollLock = false;
        }, this.options['scrollDimmer']);
        this.posScrollLock = true;
      }
    }

    searchForExposedElement() {
      let isInsidePos = this.posCalcObj.isInViewport(this._element, this.options['intersectPercentage']); // Take the closeness status of the element
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

    observeElement() {
      const options = {
          rootMargin: this.options['rootMargin'],
          threshold: this.options['threshold']
        },
        observer = new window['IntersectionObserver'](this.observerCallback.bind(this), options);
      observer.observe(this._element);
    }

    observerCallback(entries, observer) {
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

    observe() {
      if (this.hasIntersectionObserverSupport) {
        this.observeElement();
      } else {
        this.posCalcObj = new window['ViewabilityHelper'].PositionCalculation();
        window['ViewabilityHelper'].Helpers.addDomEvent(window, 'scroll', this.windowScrolled);
        this.windowScrolled();
      }
    }

  };

  window['ViewabilityHelper'].Helpers = class {
    static addDomEvent(ele, event, func) {
      if (ele.addEventListener) { // Good Guys
        ele.addEventListener(event, func, true);
      }
      else if (ele.attachEvent && (typeof ele.attachEvent === 'function')) { //Internet Explorer
        ele.attachEvent('on' + event, () => {
          func.call(ele);
        });
      }
    }

    static removeDomEvent(ele, event, func) {
      if (ele.removeEventListener) { // Good Guys
        ele.removeEventListener(event, func, true);
      }
      else if (ele.detachEvent) { //Internet Explorer
        ele.detachEvent('on' + event, func);
      }
    }
  };


  window['ViewabilityHelper'].PositionCalculation = class {

    constructor() {
      this.viewPortSize = {height: 0, width: 0};

      // First time
      this.setViewPortSizeGlobal();

      // Only when window resize call the setters
      window['ViewabilityHelper'].Helpers.addDomEvent(window, 'resize', () => {
        this.setViewPortSizeGlobal();
      });

    }

    setViewPortSizeGlobal() {
      let isStdBrowser, isIE, isOldIE, result;

      result = {
        height: 0,
        width: 0
      };

      // the more standard compliant browsers
      isStdBrowser = window.innerWidth !== undefined;
      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
      isIE = (document.documentElement !== undefined) && (document.documentElement.clientWidth !== undefined) && (document.documentElement.clientWidth !== 0);
      isOldIE = (isStdBrowser === false) && (isIE === false); // older versions of IE

      if (isStdBrowser) {
        result.height = window.innerHeight;
        result.width = window.innerWidth;
      }
      else if (isIE) {
        result.height = document.documentElement.clientHeight;
        result.width = document.documentElement.clientWidth;
      }
      else if (isOldIE) {
        result.height = document.getElementsByTagName('body')[0].clientHeight;
        result.width = document.getElementsByTagName('body')[0].clientWidth;
      }

      this.viewPortSize = result;
    }

    getViewportSizeGlobal() {
      return this.viewPortSize;
    }

    isInViewport(ele, percentage) {
      if (!ele || percentage < 0 || percentage > 100) {
        return false;
      }

      let rect = ele.getBoundingClientRect(),
        viewPort = this.getViewportSizeGlobal().height,
        eleHeight = ele.clientHeight,
        eleHeightByPercentage;

      eleHeightByPercentage = Math.round((eleHeight * percentage) / 100); // Calculate the height by the percentage
      eleHeightByPercentage = eleHeightByPercentage > viewPort ? (viewPort - 1) : eleHeightByPercentage; // When viewport is smaller than the element height
      return ((rect.top + eleHeightByPercentage) <= viewPort && (rect.bottom - eleHeightByPercentage) >= 0);
    }

  };

}());