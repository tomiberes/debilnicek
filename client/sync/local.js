'use strict';

// object <-> indexeddb sync
var Backbone = require('backbone'),
    Batoh = require('batoh'),
    User = require('./user');

Backbone.sync = Batoh.backboneSync;

// Executed on application startup, when local is required from Notes
var _notes,
    _logs;

function init() {
  var user = User.get();
  _notes = new Batoh.Pocket(notesSetup(user));
  _logs = new Batoh.Pocket(logsSetup(user));
}

function notes() {
  return _notes;
}

function logs() {
  return _logs;
}

function notesSetup(user) {
  return {
    database: user.name,
    version: 1,
    stores: {
      notes: {
        keyPath: 'id',
        autoIncrement: false,
        indexes: [
            {
              name: 'title',
              keyPath: 'title',
              unique: false
            },
            {
              name: 'timestamp',
              keyPath: 'timestamp'
            },
            {
              name: 'modified',
              keyPath: 'modified'
            }
          ]
      }
    }
  };
}

function logsSetup(user) {
  return {
    database: user.name + '_logs',
    version: 1,
    stores: {
      events: {
        keyPath: 'id',
        autoIncrement: false,
        indexes: []
      }
    }
  };
}

module.exports = {
  init: init,
  notes: notes,
  logs: logs,
};
