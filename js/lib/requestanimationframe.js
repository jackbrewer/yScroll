// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
// JSLinted and optimized by Jens Hedqvist

/*jslint browser: true */

(function (win) {
  "use strict";

  var lastTime = 0,
    vendors = ['ms', 'moz', 'webkit', 'o'], // The current vendor prefixes
    nameSpaceSuffix = 'AnimationFrame', // The namespace is stored for minification optimizations
    vendor, // The current vendor in the loop, stored for lookup performance
    x = 0; // The loop start value

  for (x; x < vendors.length && !win.requestAnimationFrame; x += 1) {
    vendor = vendors[x];
    win.requestAnimationFrame = win[vendor + 'Request' + nameSpaceSuffix];
    win.cancelAnimationFrame = win[vendor + 'Cancel' + nameSpaceSuffix]  || win[vendor + 'CancelRequest' + nameSpaceSuffix];
  }

  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = win.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!win.cancelAnimationFrame) {
    win.cancelAnimationFrame = function (id) {
      win.clearTimeout(id);
    };
  }

}(window));