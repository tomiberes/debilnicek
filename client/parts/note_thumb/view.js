'use strict';

var $ = require('jquery'),
    Bone = require('../../bones').Bone,
    Mediator = require('../../bones').Mediator,
    Browser = require('../../util/browser');

var NoteThumbView = module.exports = Bone.extend({

  tagName: 'li',

  className: 'note-thumb',

  template: require('./template.hbs'),

  events: {
    'click': 'selectNote'
  },

  selectedClass: '',

  initialize: function(options) {
    Bone.prototype.initialize.apply(this, arguments);
    this.$el.data('note-id', this.model.get('id'));
    this.model.on('change', this.render, this);
    this.render(options);
  },

  teardown: function() {
    this.model.off('change', this.render, this);
  },

  render: function(options) {
    Bone.prototype.initialize.apply(this, arguments);
    this.$el.html(this.template(this.model.toJSON()));
    this.detectBrowser();
    return this;
  },

  detectBrowser: function(type) {
    if (Browser.isMobile || Browser.isAndroid) {
      this.selectedClass = 'selected-masked';
      this.$el.on('click', function($ev) {
        Mediator.trigger('bone:menu:side:hide');
        Mediator.trigger('bone:mask:off');
      });
    } else {
      this.selectedClass = 'selected';
    }
  },

  selectNote: function($ev) {
    Mediator.trigger('deb:note:set', this.model);
    this.selected();
  },

  selected: function() {
    this.$el.parent().find('.' + this.selectedClass).removeClass(this.selectedClass);
    this.$el.addClass(this.selectedClass);
  },

  highlight: function() {

  },

});
