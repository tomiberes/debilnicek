'use strict';

var ModalDialogBone = require('../../bones').ModalDialog,
    Mediator = require('../../bones').Mediator,
    Screen = require('../../util/screen');

var DialogDecideView = module.exports = ModalDialogBone.extend({

  template: require('./template.hbs'),

  events: {
    'click .accept': 'accept',
    'click .deny': 'deny',
  },

  initialize: function(options) {
    ModalDialogBone.prototype.initialize.apply(this, arguments);
    Mediator.trigger('bone:mask:on');
    Mediator.once('bone:mask:off', function() {
      Mediator.trigger('bone:modal', this, 'dialog');
    }, this);
    this.render(options);
    this.setContent(this.options.content);
  },

  render: function(options) {
    ModalDialogBone.prototype.render.apply(this, arguments);
    this.$el.html(this.template());
    this.$content = this.$el.find('span');
    return this;
  },

  // Override with custom dismiss action, `mask:off` will trigger `modal:dialog`
  // effectively removing this View and unmasking at same time
  dismiss: function() {
    Mediator.trigger('bone:mask:off');
  },

  setContent: function(content) {
    this.$content.text(content);
  },

});
