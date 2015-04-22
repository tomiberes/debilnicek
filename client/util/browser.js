'use strict';

var Browser = module.exports = {};

// Browser detection
Browser.isWebKit = /WebKit\//.test(navigator.userAgent);
Browser.isGecko = /Gecko\//.test(navigator.userAgent);
Browser.isMSIE = /Trident\//.test(navigator.userAgent);

Browser.isMobile = /Mobi/i.test(navigator.userAgent);

Browser.isAndroid = /Android/i.test(navigator.userAgent);
Browser.isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
Browser.isIEMobile = /IEMobile/i.test(navigator.userAgent);
