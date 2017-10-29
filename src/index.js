
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
    DomHelper.addDomEvent(window, 'resize', this.setViewPortSizeGlobal);

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
    isStdBrowser = typeof window.innerWidth !== 'undefined';
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

export class ViewabilityHelper {

  constructor(element, callback, options) {
    // The element to watch
    this._element = element;
    // Callback function
    this._callback = callback;
    // Position Calculation Object
    this._posCalcObj = {};
    // Flag if element is in view
    this._elementIsViewed = false;
    // Dimmer flag for scroll
    this._posScrollLock = false;
    // Feature flag for the intersection observer API
    this._hasIntersectionObserverSupport = (typeof (window['IntersectionObserver']) === 'function');
    // _options object
    this._options = {
      'callbackParams': [],
      'rootMargin': '0px',
      'intersectPercentage': 0,
      'scrollDimmer': 200,
      'unobserve': false,
      'threshold': [1]
    };

    // merge _options with argument _options
    this._options = {...this._options, ...options};
  }

  /**
   * Callback function for scroll event
   */
  windowScrolled() {
    if (!this._posScrollLock) {
      this.searchForExposedElement();
      setTimeout(() => {
        this._posScrollLock = false;
      }, this._options['scrollDimmer']);
      this._posScrollLock = true;
    }
  }

  /**
   * Searches for the element in the viewport
   */
  searchForExposedElement() {
    if (!this._posCalcObj) {
      this._posCalcObj = new PositionCalculation();
    }
    let isInsidePos = this._posCalcObj.isInViewport(this._element, this._options['intersectPercentage']);
    // Take the closeness status of the element
    if (isInsidePos) {
      if (!this._elementIsViewed) {
        this._elementIsViewed = true;
        this._callback.apply(this, this._options['callbackParams']);
        if (this._options['unobserve']) {
          DomHelper.removeDomEvent(window, 'scroll', this.windowScrolled);
          delete this._posCalcObj;
        }
      }
    } else {
      this._elementIsViewed = false;
    }
  }

  /**
   * Observes an element using the Intersection Observer API
   */
  observeElement() {
    const options = {
        rootMargin: this._options['rootMargin'],
        threshold: this._options['threshold']
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
    if (entries && entries[0] && entries[0]['intersectionRatio'] > this._options['intersectPercentage']) {
      this._callback.apply(this, this._options['callbackParams']);
      if (this._options['unobserve']) {
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
    if (this._hasIntersectionObserverSupport) {
      this.observeElement();
    } else {
      this._posCalcObj = new PositionCalculation();
      DomHelper.addDomEvent(window, 'scroll', this.windowScrolled.bind(this));
      this.windowScrolled();
    }
  }

}

