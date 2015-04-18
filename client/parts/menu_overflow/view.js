'use strict';

var Bone = require('../../bones').Bone,
    Mediator = require('../../bones').Mediator;

var MenuOverflowBone = module.exports = Bone.extend({

  tagName: 'div',

  className: 'menu-overflow',

  template: require('./template.hbs'),

  events: {
    'click :button': 'trigger',
    'click #download-note': 'downloadNote',
    'click #delete-note': 'deleteNote'
  },

  open: false,

  initialize: function(options) {
    Bone.prototype.initialize.apply(this, arguments);
    Mediator.on('bone:mask:on', this.hide, this);
    this.render(options);
  },

  teardown: function() {
    Mediator.off('bone:mask:on', this.hide, this);
  },

  render: function(options) {
    Bone.prototype.render.apply(this, arguments);
    this.$el.html(this.template);
    return this;
  },

  trigger: function() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  },

  show: function(type) {
    this.open = true;
    this.$el.show();
    // this.$el.addClass('animation-page-moveFromTop animation-fadeIn').show();
  },

  hide: function(type) {
    this.open = false;
    this.$el.hide();
    // this.$el.hide().removeClass('animation-page-moveFromTop animation-fadeIn');
  },

  deleteNote: function($ev) {
    Mediator.trigger('deb:note:delete');
  },

  downloadNote: function($ev) {
    Mediator.trigger('deb:note:download');
  },

});
