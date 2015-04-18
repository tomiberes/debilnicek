'use strict';

var BoneView = require('../../bone/view'),
    Mediator = require('../../util/mediator');

// new ModalRevealBone({ size: { width: String, height: String } });
var ModalRevealBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'modal-reveal',

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
    this.setSize(this.options.size);
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    this.$el.css(this.size);
    return this;
  },

  // Size is a percentage of screen, app developers decide how to use it,
  // hint: to set max-width in px with css
  setSize: function(size) {
    if (!size) size = { width: '100%', height: '100%' };
    this.size = size;
    return this.size;
  },

  dismiss: function() {
    Mediator.trigger(this._prefix + ':modal', this, 'reveal');
  },

}, {

  // Static methods

});
