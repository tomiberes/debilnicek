'use strict';

var _ = require('underscore'),
    HeaderBone = require('../../bones').Header,
    Mediator = require('../../bones').Mediator,
    Browser = require('../../util/browser'),
    MenuOverflowView = require('../menu_overflow/view');

var HeaderView = module.exports = HeaderBone.extend({

  template: require('./template.hbs'),

  events: {
    'keyup #search-create-input': 'filterNotes',
    'keydown #search-create-input': 'searchCreateNote',
    'click #header-action-more': 'menuOveflow',
  },

  initialize: function(options) {
    HeaderBone.prototype.initialize.apply(this, arguments);
    // Mediator.on('deb:message', this.setMessage, this);
    this.menuOverflowView = new MenuOverflowView(this.$el);
    this.render(options);
  },

  render: function(options) {
    HeaderBone.prototype.render.apply(this, arguments);
    this.$el.html(this.template);
    this.$el.append(this.menuOverflowView.$el);
    this.$searchCreateInput = this.$el.find('#search-create-input');
    this.$message = this.$el.find('#header-message').children().eq(0);
    this.detectBrowser();
    return this;
  },

  detectBrowser: function() {
    if (Browser.isMobile || Browser.isAndroid) {
      this.$searchCreateInput.on('focus', function($ev) {
        Mediator.trigger('bone:menu:side:show');
        Mediator.trigger('bone:mask:on');
      });
    }
  },

  filterNotes: function($ev) {
    var query = this.$searchCreateInput.val();
    Mediator.trigger('deb:notes:query', query, false);
  },

  searchCreateNote: function($ev) {
    if ($ev.keyCode === 13) {
      $ev.preventDefault();
      var query = this.$searchCreateInput.val();
      Mediator.trigger('deb:notes:query', query, true);
    }
  },

  setMessage: function(message) {
    var $message = this.$message;
    // Trigger reflow by $.width(), instead of listening to `animationend`
    $message.removeClass('message-fade').width();
    $message.text(message).addClass('message-fade');
  },

  clearMessage: function() {
    this.$message.text('');
  },

  menuOveflow: function($ev) {
    this.menuOverflowView.trigger();
  },

});
