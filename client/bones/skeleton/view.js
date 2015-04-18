'use strict';

var BoneView = require('../bone/view'),
    Mediator = require('../util/mediator'),
    Pages = require('../util/pages'),
    Logger = require('../util/logger');

var Skeleton = module.exports = BoneView.extend({

  // The main app view, attaches itself to the body and creates structure
  el: 'body',

  template: '<div id="skeleton"><div id="headerbone">' +
    '</div><div id="menubone"></div><div id="contentbone">' +
    '</div><div id="footerbone"></div><div id="modalbone">' +
    '</div><div id="toastbone"></div><div id="maskbone"' +
    'class="mask"></div></div>',

  events: {
    'click #maskbone': 'unmask',
  },

  masked: false,

  initialize: function(options) {
    BoneView.prototype.initialize.apply(this, arguments);
    // Debug mode, exposing app (conf should be required from child Skeleton view)
    // Cannot require conf on top level since it's processed during Bones
    // instance creation and not after assignement of desired configuration
    var conf = this.options.conf = require('../index').conf();
    if (conf) {
      if (conf.expose || conf.debug) {
        window[conf.name] = this;
      }
      if (conf.debug) {
        this.Mediator = Mediator;
      }
      // Require special conf for logger, if there isn't, no logging
      if (conf.logger) {
        this.setLogger(conf.logger);
      }
    }
  },

  teardown: function() {
    this.unsetParts();
    this.unsetPages();
    this.unsetLogger();
  },

  render: function(options) {
    BoneView.prototype.render.apply(this, arguments);
    this.$el.html(this.template);
    this.setBones();
    // After the `bones` elements references are set
    this.setParts();
    this.setPages();
    return this;
  },

  // Set up `bones` references to be used by `parts` and `pages`
  setBones: function() {
    this.headerbone = this.$el.find('#headerbone');
    this.menubone = this.$el.find('#menubone');
    this.footerbone = this.$el.find('#footerbone');
    this.contentbone = this.$el.find('#contentbone');
    this.modalbone = this.$el.find('#modalbone');
    this.toastbone = this.$el.find('#toastbone');
    this.maskbone = this.$el.find('#maskbone');
  },

  /**
   * Application structure `parts`
   *
   * this.header(view)
   * this.footer(view)
   * this.menu(view)
   * this.mask()
   * this.unmask()
   *
   * Events:
   * 'bone:header' view
   * 'bone:footer' view
   * 'bone:menu' view
   * 'bone:mask:on'
   * 'bone:mask:off'
   */
  setParts: function() {
    this.headerView = null;
    this.footerView = null;
    this.menuView = null;
    Mediator.on(this._prefix + ':header', this.header, this);
    Mediator.on(this._prefix + ':footer', this.footer, this);
    Mediator.on(this._prefix + ':menu', this.menu, this);
    Mediator.on(this._prefix + ':mask:on', this.mask, this);
    Mediator.on(this._prefix + ':mask:off', this.unmask, this);
  },

  unsetParts: function() {
    Mediator.off(this._prefix + ':header', this.header, this);
    Mediator.off(this._prefix + ':footer', this.footer, this);
    Mediator.off(this._prefix + ':menu', this.menu, this);
    Mediator.off(this._prefix + ':mask:on', this.mask, this);
    Mediator.off(this._prefix + ':mask:off', this.unmask, this);
    this.headerView = null;
    this.footerView = null;
    this.menuView = null;
  },

  /**
   * Content centric `pages`, change quite often and have animations
   *
   * Methods:
   * this.pages.show(view)
   * this.pages.slide(view)
   * this.pages.modal(view, type)
   * this.pages.toast(view, type)
   *
   * Events:
   * 'bone:content:show' view
   * 'bone:content:slide' view
   * 'bone:modal' view, type
   * 'bone:toast' view, type
   */
  setPages: function() {
    this.pages = new Pages(this.contentbone, this.modalbone, this.toastbone);
    Mediator.on(this._prefix + ':content:show', this.pages.show, this.pages);
    Mediator.on(this._prefix + ':content:slide', this.pages.show, this.pages);
    Mediator.on(this._prefix + ':modal', this.pages.modal, this.pages);
    Mediator.on(this._prefix + ':toast', this.pages.toast, this.pages);
  },

  unsetPages: function() {
    Mediator.off(this._prefix + ':content:show', this.pages.show, this.pages);
    Mediator.off(this._prefix + ':content:slide', this.pages.show, this.pages);
    Mediator.off(this._prefix + ':modal', this.pages.modal, this.pages);
    Mediator.off(this._prefix + ':toast', this.pages.toast, this.pages);
    this.pages = null;
  },

  /**
   * Logger instance
   *
   * this.logger.debug(message)
   * this.logger.info(message)
   * this.logger.warn(message)
   * this.logger.error(message)
   *
   * Events:
   * 'bone:log:debug' message
   * 'bone:log:info' message
   * 'bone:log:warn' message
   * 'bone:log:error' message
   */
  setLogger: function(conf) {
    if (!conf) conf = {};
    // Logger instance, logging using Mediator and Skeleton.logger instance
    this.logger = new Logger(conf);
    this.logger.setPersistance(); // TODO: setPersistance method for Logger to work well with Batoh
    Mediator.on(this._prefix + ':log:debug', this.logger.debug, this);
    Mediator.on(this._prefix + ':log:info', this.logger.info, this);
    Mediator.on(this._prefix + ':log:warn', this.logger.warn, this);
    Mediator.on(this._prefix + ':log:error', this.logger.error, this);
  },

  unsetLogger: function() {
    if (!this.options.conf.logger) return;
    Mediator.off(this._prefix + ':log:debug', this.logger.debug, this);
    Mediator.off(this._prefix + ':log:info', this.logger.info, this);
    Mediator.off(this._prefix + ':log:warn', this.logger.warn, this);
    Mediator.off(this._prefix + ':log:error', this.logger.error, this);
    this.logger = null;
  },

  // get/set header view
  header: function(view) {
    if (!view) return this.headerView;
    if (this.headerbone.html()) {
      this.headerView.close();
    }
    this.headerbone.html(view.$el);
    this.headerView = view;
    return this.headerView;
  },

  // get/set footer view
  footer: function(view) {
    if (!view) return this.footerView;
    if (this.footerbone.html()) {
      this.footerView.close();
    }
    this.footerbone.html(view.$el);
    this.footerView = view;
    return this.footerView;
  },

  // get/set menu view
  menu: function(view) {
    if (!view) return this.menuView;
    if (this.menubone.html()) {
      this.menuView.close();
    }
    this.menubone.html(view.$el);
    this.menuView = view;
    return this.menuView;
  },

  // Note: `menu`, `modal` and `toast` have higher z-index than the mask

  // mask the page
  mask: function() {
    if (this.masked) return;
    this.masked = true;
    this.maskbone.addClass('mask-visible');
  },

  // unmask the page
  unmask: function() {
    if (!this.masked) return;
    this.masked = false;
    this.maskbone.removeClass('mask-visible');
    Mediator.trigger(this._prefix + ':mask:off');
  },

}, {

  // Static methods

});
