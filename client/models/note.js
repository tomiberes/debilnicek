var Backbone = require('backbone'),
    Mediator = require('../bones').Mediator;

var Note = module.exports = Backbone.Model.extend({

  defaults: {
    title: 'title',
    content: '',
    timestamp: '',
    modified: '',
    dirty: true,
    deleted: false
  },

  initialize: function() {
    this.on('change:content', this.thumb, this);
  },

  thumb: function() {
    var thumb = Note.thumbText(this.get('content').slice(0, 100));
    this.set({ 'thumb': thumb });
  },

} , {

  // Convert HTML string into data URL
  dataUrl: function(str) {
    return 'data:text/html,' + str;
  },

  thumbText: function(str) {
    return String(str).replace(/<br>/gi, '\n').replace(/(<([^>]+)>)/gi,'')
      .replace(/&nbsp;/gi, ' ');
  },

});
