/**
 * Event aggregator use unly if it's required to hook on these events.
 *
 */

'use strict';

var _ = require('underscore'),
    Backbone = require('backbone');

// Singleton module
var Mediator = module.exports = (function() {
  var instance;

  function init() {
    return _.extend({}, instance, Backbone.Events);
  }

  function getInstance() {
    if (!instance) {
      instance = init();
    }
    return instance;
  }

  return getInstance();

})();
