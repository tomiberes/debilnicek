'use strict';

/**
 * Bones/Parts can listen to specific screen media query event and adjust it's behaviour accordingly
 *
 * type is a number 1 - 4, see SCREEN mapping,
 * this way the parts can adjust for a set of screens eg.:
 * if (type > 1) {
 *   // Everything expect phone
 * }
 */
var Screen = module.exports = {
  type: 0,
  QUERY: {
    phone: '(min-device-width: 320px) and (max-device-width: 480px)',
    tablet: '(min-device-width : 768px) and (max-device-width : 1024px)',
    desktop: '(min-width : 1224px)',
    large: '(min-width : 1824px)'
  },
  SCREEN: {
    phone: 1,
    tablet: 2,
    desktop: 3,
    large: 4
  },

  mediaQuery: function() {
    // Cache query should be done only once per application startup
    if (Screen.type !== 0) return Screen.type;
    if (matchMedia(Screen.QUERY.phone).matches) {
      Screen.type = Screen.SCREEN.phone;
      return Screen.type;
    }
    if (matchMedia(Screen.QUERY.tablet).matches) {
      Screen.type = Screen.SCREEN.tablet;
      return Screen.type;
    }
    if (matchMedia(Screen.QUERY.desktop).matches) {
      Screen.type = Screen.SCREEN.desktop;
      return Screen.type;
    }
    if (matchMedia(Screen.QUERY.large).matches) {
      Screen.type = Screen.SCREEN.large;
      return Screen.type;
    }
    // No queries were matched
    return false;
  },

  setType: function(t) {
    Screen.type = t;
    return Screen.type;
  }
};
