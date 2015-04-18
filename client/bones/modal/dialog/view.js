'use strict';

var $ = require('jquery'),
    BoneView = require('../../bone/view'),
    Mediator = require('../../util/mediator');

var ModalDialogBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'modal-dialog',

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
    this.setSize(this.options.size);
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    this.$el.css(this.size);
    this.center(this.options.center);
    return this;
  },

  setSize: function(size) {
    if (!size) size =  { width: '300px', height: '200px' };
    this.size = size;
    return this.size;
  },

  center: function($el) {
    var left, top;
    if ($el) {
      left = $el.position().left + (($el.width() - this.$el.width()) / 2);
      top = $el.position().top + (($el.height() - this.$el.height()) / 2);
    } else {
      $el = $(window);
      left = ($el.width() - this.$el.width()) / 2;
      top = ($el.height() - this.$el.height()) / 2;
    }
    this.$el.css({ left: left, top: top });
  },

  dismiss: function() {
    Mediator.trigger(this._prefix + ':modal', this, 'dialog');
  },

  accept: function() {
    this.trigger('accept');
    this.dismiss();
  },

  deny: function() {
    this.trigger('deny');
    this.dismiss();
  },

}, {

  // Static methods

});
