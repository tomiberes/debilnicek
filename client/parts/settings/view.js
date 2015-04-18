'use strict';

var ModalRevealBone = require('../../bones').ModalReveal,
    Mediator = require('../../bones').Mediator,
    Screen = require('../../util/screen');

var SettingsView = module.exports = ModalRevealBone.extend({

  template: require('./template.hbs'),

  events: {
    'click #settings-close': 'dismiss',
  },

  initialize: function(options) {
    ModalRevealBone.prototype.initialize.apply(this, arguments);
    this.getSize();
    this.render(options);
  },

  render: function(options) {
    ModalRevealBone.prototype.render.apply(this, arguments);
    this.$el.html(this.template());
    return this;
  },

  getSize: function() {
    switch (Screen.mediaQuery()) {
      case 1:
        this.size = { width: '100%', height: '100%'};
        break;
      case 2:
        this.size = { width: '100%', height: '100%'};
        break;
      case 3:
        this.size = { width: '50%', height: '50%' };
        break;
      case 4:
        this.size = { width: '40%', height: '50%' };
        break;
      default:
        this.size = { width: '50%', height: '50%' };
        break;
    }
  },

});
