'use strict';

var $ = require('jquery'),
    _ = require('underscore'),
    Note = require('../../models/note'),
    ContentBone = require('../../bones').Content,
    Mediator = require('../../bones').Mediator,
    DialogDecide = require('../dialog_decide/view'),
    Squire = require('../../lib/squire');

var ContentView = module.exports = ContentBone.extend({

  template: require('./template.hbs'),

  editorStyle: {

  },

  initialize: function(options) {
    ContentBone.prototype.initialize.apply(this, arguments);
    Mediator.on('deb:note:set', this.setNote, this);
    Mediator.on('deb:note:delete', this.deleteNote, this);
    Mediator.on('deb:note:download', this.downloadNote, this);
    this.render(options);
    this.setEditor();
  },

  teardown: function() {
    Mediator.off('deb:note:set', this.setNote, this);
    Mediator.off('deb:note:delete', this.deleteNote, this);
    Mediator.off('deb:note:download', this.downloadNote, this);
  },

  render: function(options) {
    ContentBone.prototype.render.apply(this, arguments);
    this.$el.html(this.template);
    return this;
  },

  getEditor: function() {
    return this.editor;
  },

  setEditor: function() {
    var self = this;
    var $iframe = this.$el.find('.editor');
    var editorHtml = require('./editor.html');
    $iframe.on('load', function() {
      var doc = this.contentDocument || this.contentWindow.document;
      doc.open();
      doc.write(editorHtml());
      doc.close();
      self.editor = new Squire(doc);
      self.editor.addEventListener('keyup', function(ev) {
        self.saveNote(ev);
      });
      self.setStyle(doc.body, self.editorStyle);
      self.setNote(self.model);
    });
  },

  // TODO: additional options for custom stylesheets loading
  // http://stackoverflow.com/questions/574944/how-to-load-up-css-files-using-javascript
  // or
  // var ss = document.createElement("link");
  // ss.type = "text/css";
  // ss.rel = "stylesheet";
  // ss.href = "style.css";
  // document.getElementsByTagName("head")[0].appendChild(ss);

  setStyle: function(el, styleObj) {
    _.extend(el.style, styleObj);
  },

  getNote: function() {
    return this.model.toJSON();
  },

  // Set note model, and display it in editor only if the editor is already
  // loaded. setEditor will call this method again once it is done with editor init
  setNote: function(model) {
    if (model) {
      this.model = model;
    } else {
      this.model = new Note({
        title: 'Welcome!',
        content: require('./intro.html')()
      });
    }
    if (this.editor) {
      this.editor.setHTML(this.model.get('content'));
    }
  },

  saveNote: function(ev) {
    this.model.save({
      content: this.editor.getHTML(),
      modified: Date.now(),
      dirty: true,
    }, {
      success: function(model, resp, opts) {
        Mediator.trigger('deb:message', 'saved');
      }
    });
  },

  deleteNote: function() {
    var deleteDialog = new DialogDecide({
      content: 'Do you want to delete "' + this.model.get('title') + '" ?',
      size: { width: '300px'/*, height: '100px'*/ },
      center: this.$el,
    });
    deleteDialog.once('accept', function() {
      this.model.destroy({
        success: function(model, resp, opts) {
          Mediator.trigger('deb:message', 'deleted');
          Mediator.trigger('deb:notes:query', '', false);
        }
      });
    }, this);
    Mediator.trigger('bone:modal', deleteDialog, 'dialog');
  },

  downloadNote: function() {
    var name = this.model.get('title');
    var html = this.model.get('content');
    var el = document.createElement('a');
    document.body.appendChild(el);
    el.download = name + '.html';
    el.href = Note.dataUrl(html);
    el.click();
    document.body.removeChild(el);
  },

});
