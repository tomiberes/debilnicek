'use strict';

var _ = require('underscore'),
    Backbone = require('backbone'),
    Skeleton = require('../../bones').Skeleton,
    Mediator = require('../../bones').Mediator,
    HeaderView = require('../header/view'),
    NoteThumbListView = require('../note_thumb_list/view'),
    NoteView = require('../note/view'),
    Sync = require('../../sync'),
    Logger = require('../../util/logger'),
    Browser = require('../../util/browser'),
    Resize = require('../../util/resize'),
    Note = require('../../models/note'),
    Notes = require('../../collections/notes');

var SkeletonView = module.exports = Skeleton.extend({

  // App data reference
  data: {
    notes: null,
  },

  initialize: function(options) {
    Skeleton.prototype.initialize.apply(this, arguments);
    // Inherit parent events
    _.extend({}, Skeleton.prototype.events, this.events);
    // init local sync, get logged user or use default one
    Sync.local.init();
    this.fetchNotes();
    this.render(options);
  },

  render: function(options) {
    Skeleton.prototype.render.apply(this, arguments);
    this.header(new HeaderView());
    this.menu(new NoteThumbListView());
    this.pages.show(new NoteView());
    this.detectBrowser();
    return this;
  },

  detectBrowser: function() {
    Resize.init().onLoad();
    if (Browser.isMobile || Browser.isAndroid) {
      Resize.onChangeMobile();
    } else {
      Resize.onChangeDesktop();
    }
  },

  fetchNotes: function() {
    this.data.notes = new Notes({ setup: Sync.local.notes().setup });
    // Get all notes, create new flag false
    Mediator.trigger('deb:notes:query', '', false);
  },

});
