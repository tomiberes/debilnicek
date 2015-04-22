'use strict';

var $ = require('jquery'),
    _ = require('underscore'),
    Mediator = require('../../bones').Mediator,
    MenuSideBone = require('../../bones').MenuSide,
    NoteThumbView = require('../note_thumb/view'),
    Browser = require('../../util/browser');

var NoteListView = module.exports = MenuSideBone.extend({

  template: require('./template.hbs'),

  type: 'left',

  subviews: [],

  initialize: function(options) {
    MenuSideBone.prototype.initialize.apply(this, arguments);
    Mediator.on('deb:notes:set', this.noteThumbs , this);
    this.render(options);
  },

  teardown: function() {
    Mediator.off('deb:notes:set', this.noteThumbs , this);
  },

  render: function(options) {
    MenuSideBone.prototype.render.apply(this, arguments);
    this.$el.html(this.template);
    this.$el.addClass('menu-side-left');
    this.$thumbList = this.$el.find('.note-thumb-list');
    this.detectBrowser();
    return this;
  },

  detectBrowser: function(type) {
    if (Browser.isMobile || Browser.isAndroid) {
      this.hide();
      Mediator.on('bone:mask:off', function() {
        this.hide();
      }, this);
    } else {
      this.show();
    }
  },

  // Replace current notes list with new ones
  noteThumbs: function(notes) {
    this.closeSubviews();
    if (!notes.isEmpty()) {
      var self = this;
      notes.each(function(note) { self.addNoteThumb(note); });
    }
    // TODO: find better way then through generic subviews
    if (this.subviews.length > 0) this.subviews[0].selected();
  },

  // Add note to list
  addNoteThumb: function(note) {
    if (!note) return;
    var noteThumbView = new NoteThumbView({ model: note });
    this.subviews.push(noteThumbView);
    this.$thumbList.append(noteThumbView.$el);
    return NoteListView;
  },

});
