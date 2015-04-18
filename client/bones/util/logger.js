'use strict';

/**
 * TODO: log bucket ?!
 *
 * An instance of logger have to be created (and passed around)
 *
 * options.logLevel
 * options.persist
 * options.debug
 *
 */
var Logger = module.exports = function(options) {
  this.logLevel = 4; // Default log only errors
  this.persist = false;
  this.debug = false;
  this._globalError(); // Subscribe to global error messages
};

Logger.LOG_LEVELS = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};

Logger.prototype = {

  _init: function(opts) {
    if (!opts) return;
    if (opts.debug) this.debug = true;
    if (opts.persist) this._persist = opts.persist;
  },

  debug: function(data) {
    if (this.logLevel <= Logger.LOG_LEVELS.debug) {
      data.type = 'debug';
      this._log(data);
    }
  },

  info: function(data) {
    if (this.logLevel <= Logger.LOG_LEVELS.info) {
      data.type = 'info';
      this._log(data);
    }
  },

  warn: function(data) {
    if (this.logLevel <= Logger.LOG_LEVELS.warn) {
      data.type = 'warn';
      this._log(data);
    }
  },

  error: function(data) {
    if (this.logLevel <= Logger.LOG_LEVELS.error) {
      data.type = 'error';
      this._log(data);
    }
  },

  setPersistance: function(func) {
    this.persist = true;
    this._persist = func;
  },

  _log: function(log) {
    log.date = new Date();
    if (this.persist) {
      this._persist(log);
    }
    if (this.debug) {
      console.log(log);
    }
  },

  // Dummy noop method to be replaced with desired persistance method,
  // Only one argument is required and that's log object
  _persist: function(log) {
    return;
  },

  _globalError: function(data) {
    // On error is global window event handler
    onerror = function(message, url, line) {
      this.error({
        message: message,
        url: url,
        line: line,
        area: url + ':' + line // alternative to separate url and line properties
      });
    };
  },

};
