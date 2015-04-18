'use strict';

var BoneView = require('../bone/view');

var ContentBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'content',

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
    // Triggered by `pages` utility on page slide animation
    this.on('animation:complete', this.animationComplete, this);
  },

  teardown: function() {
    this.off('animation:complete', this.animationComplete, this);
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    return this;
  },

  // Dummy method, to be overridden by child classes
  animationComplete: function() {
    return;
  }

}, {

  // Static methods

});
