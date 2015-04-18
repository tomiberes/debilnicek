var _ = require('underscore'),
    Backbone = require('backbone'),
    Batoh = require('batoh'),
    Mediator = require('../bones/').Mediator,
    Note = require('../models/note'),
    Sync = require('../sync');

var Notes = module.exports = Backbone.Collection.extend({

  model: Note,

  setup: null,

  store: 'notes',

  url: '/notes',

  initialize: function(options) {
    this.setup = options.setup;
    Mediator.on('deb:notes:query', function(query, create) {
      this.searchNotes(query, create);
    }, this);
    this.on('reset', function() {
      Mediator.trigger('deb:notes:set', this);
    }, this);
  },

  createNote: function(title) {
    var self = this;
    this.create({
      title: title,
      content: '',
      modified: Date.now()
    }, {
      success:function(model) {
        self.reset(model);
        Mediator.trigger('deb:message', 'saved');
        Mediator.trigger('deb:note:set', model);
      },
    });
  },

  searchNotes: function(query, create) {
    var self = this; // Backspace event changes scope to global, window
    query = query.trim();
    this.idbQuery(query, function(err, matched, exact) {
      if (err) return;
      if (create && !exact) {
        if (query.length === 0) return; // Do not create note with empty title
        self.createNote(query);
      } else {
        self.reset(matched); // Reset with filtered results
        Mediator.trigger('deb:note:set', self.first());
      }
    });
  },

  idbQuery: function(pattern, callback) {
    var db = Sync.local.notes();
    var store = this.store;
    var reExact = new RegExp('^' + pattern + '$', 'i');
    var reContains = new RegExp(pattern, 'i');
    var exact = false;
    var matched = [];
    var titleMatch = [];
    var contentMatch =[];
    var query = {
      index: 'modified',
      range: Batoh.IDBKeyRange.upperBound(Number.POSITIVE_INFINITY, true),
      direction: 'prev',
    };
    var each = function(record) {
      if (reExact.test(record.title)) {
        exact = true;
        titleMatch.unshift(record);
      } else if (reContains.test(record.title)) {
        titleMatch.push(record);
      } else if (reContains.test(record.content)) {
        contentMatch.push(record);
      }
      return record;
    };
    db.open(function(err) {
      if (err) return callback(err);
      db.query(store, query, each, function(err, result) {
        if (err) return callback(err);
        db.close();
        matched = titleMatch.concat(contentMatch);
        return callback(null, matched, exact);
      });
    });
  },

});
