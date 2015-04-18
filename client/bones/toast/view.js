'use strict';

var BoneView = require('../bone/view');

var ToastBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'toast',

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    return this;
  },

}, {

  // Static methods

});
