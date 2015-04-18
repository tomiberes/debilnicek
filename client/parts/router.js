'use strict';

var Backbone = require('backbone'),
    Skeleton = require('./skeleton/view');

module.exports = Backbone.Router.extend({

  routes: {

  },

  // Example router init with skeleton reference assignement
  initialize: function(options) {
    this.skeleton = new Skeleton({ router: this });
  },

  home: function() {
    return;
  },

});
