'use strict';

var _ = require('underscore'),
    Backbone = require('backbone');

var Bone = module.exports = Backbone.View.extend({

  _prefix: 'bone',

  initialize: function(options) {
    this.options = options || {};
  },

  teardown: function() {
    return;
  },

  // Extended version of removing view with cleanup, to prevent leaks
  close: function() {
    if (this.subviews) this.closeSubviews();
    if (this.teardown) this.teardown();
    this.remove();
    this.unbind();
  },

  closeSubviews: function() {
    _.invoke(this.subviews, 'close');
    this.subviews.length = 0;
  }

}, {

  // Static methods

});
