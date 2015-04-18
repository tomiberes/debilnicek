'use strict';

var _ = require('underscore'),
    BoneView = require('../../bone/view'),
    Mediator = require('../../util/mediator');

var MenuSideBone = module.exports = BoneView.extend({

  tagName: 'div',

  className: 'menu-side',

  // Default menu type
  type: 'left',

  open: false,

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
    Mediator.on(this._prefix + ':menu:side:show', this.show, this);
    Mediator.on(this._prefix + ':menu:side:hide', this.hide, this);
  },

  teardown: function() {
    Mediator.off(this._prefix + ':menu:side:show', this.show, this);
    Mediator.off(this._prefix + ':menu:side:hide', this.show, this);
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    return this;
  },

  show: function() {
    if (this.open) return;
    this.$el.addClass('menu-side-' + this.type + '-open');
    this.open = true;
  },

  hide: function() {
    if (!this.open) return;
    this.$el.removeClass('menu-side-' + this.type + '-open');
    this.open = false;
  },

}, {

  // Static methods

});
