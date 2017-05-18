# ViewabilityHelper

[![Build Status](https://travis-ci.org/outbrain/ViewabilityHelper.svg?branch=master)](https://travis-ci.org/outbrain/ViewabilityHelper) [![npm version](https://badge.fury.io/js/viewability-helper.svg)](https://badge.fury.io/js/viewability-helper)


Lightweight cross-browser library that enables you to create a watcher for a given element, and get back a callback when it has entered the viewport

It uses Intersection Observer API if available, and if not, it calculates it by itself.

Not working when Intersection Observer is not supported and the script is running inside an iframe.
 
Written in ES6 and compiled to ES2015 using Babel.

# Install

```js
npm install --save viewability-helper
```

# Contribute

Start by 
```js
npm install
```

And then run with
```js
npm start
```