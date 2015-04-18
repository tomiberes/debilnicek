'use strict';

var BoneView = require('../bone/view');

var HeaderBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'header',

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
