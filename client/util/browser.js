'use strict';

var Browser = module.exports = {};

// Browser detection
Browser.isWebKit = /WebKit\//.test(navigator.userAgent);
Browser.isGecko = /Gecko\//.test(navigator.userAgent);
Browser.isMSIE = /Trident\//.test(navigator.userAgent);
