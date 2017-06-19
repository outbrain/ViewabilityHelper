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

export class ViewabilityHelper {

  constructor(element, callback, options) {
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
    this.hasIntersectionObserverSupport = (typeof (window['IntersectionObserver']) === 'function');
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
    for (let key in options) {
      if (options.hasOwnProperty(key)) {
        this.options[key] = options[key];
      }
    }
  }

  /**
   * Callback function for scroll event
   */
  windowScrolled() {
    if (!this.posScrollLock) {
      this.searchForExposedElement();
      setTimeout(() => {
        this.posScrollLock = false;
      }, this.options['scrollDimmer']);
      this.posScrollLock = true;
    }
  }

  /**
   * Searches for the element in the viewport
   */
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

  /**
   * Observes an element using the Intersection Observer API
   */
  observeElement() {
    const options = {
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

  /**
   * Start Observing an element
   * Way of observing the element decided using the feature flag
   */
  observe() {
    if (this.hasIntersectionObserverSupport) {
      this.observeElement();
    } else {
      this.posCalcObj = new PositionCalculation();
      window['ViewabilityHelper'].Helpers.addDomEvent(window, 'scroll', this.windowScrolled);
      this.windowScrolled();
    }
  }

}

class DomHelper {
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
}


class PositionCalculation {

  constructor() {
    this.viewPortSize = {height: 0, width: 0};

    // First time
    this.setViewPortSizeGlobal();

    // Only when window resize call the setters
    DomHelper.addDomEvent(window, 'resize', () => {
      this.setViewPortSizeGlobal();
    });

  }

  /**
   * Finds the user viewport size
   */
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

  /**
   * Determines if an element is in the viewport or not
   * @param ele
   * @param percentage
   * @returns {boolean}
   */
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

}