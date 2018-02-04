# ViewabilityHelper

[![Build Status](https://travis-ci.org/outbrain/ViewabilityHelper.svg?branch=master)](https://travis-ci.org/outbrain/ViewabilityHelper) [![npm version](https://badge.fury.io/js/viewability-helper.svg)](https://badge.fury.io/js/viewability-helper)


Lightweight cross-browser library that enables you to create a watcher for a given element, and get back a callback when it has entered the viewport

Viewability Helper uses [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API "Intersection Observer API") if available. If it's not, the library makes the calculations itself.
Browser support for the Intersection Observer API can be found [here](http://caniuse.com/#search=intersectionobserver "here").

*Note:* Not working when Intersection Observer is not supported and the script is running inside an iframe.

# Install

```js
npm install --save viewability-helper
```

# Usage

```js
// import the module
import ViewabilityHelper from 'viewability-helper';
// -or-
const ViewabilityHelper = require('viewability-helper');

// Create a new observer for an element with a callback function
const myObserver = new ViewabilityHelper(element, callback);
// Fire in the hole!
myObserver.observe();

// With options
myObserver = new ViewabilityHelper(element, callback, {callbackParams: ['Element number 1']});

```


# Options

**callbackParams** (Array) - List of parameters passed to the callback function

**intersectPercentage** (String) - Intersection percentage, ex: "0", "0.2" etc..

**scrollDimmer** (Integer) - Interval for triggering element viewability watch (msec)

**unobserve** (Boolean) - Should the observer keep observing the element after first viewability event or not

**rootMargin** (String) - For Intersection Observer API, The root element margin

**threshold** (Array) - For Intersection Observer API, List of intersection ratio thresholds of the element with the viewport



# Contribute

Please first fork this repository, make your changes and then create a pull request.

Start by 
```js
npm install
```

And then build it with
```js
npm run dev
```
