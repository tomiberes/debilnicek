// These are the reusable components, named bones.
// Each one of them can be used directly as part of a application,
// or they can be extended to add desired functionality.

'use strict';

// Assign npm jQuery to Backbone
var Backbone = require('backbone');
    Backbone.$ = require('jquery');

var Bones = module.exports = (function() {
  var instance;

  function init() {
    var _conf = {};

    function conf(c) {
      if (c) _conf = c;
      return _conf;
    }

    return {
      //Public
      Bone: require('./bone/view'),
      Skeleton: require('./skeleton/view'),
      Content: require('./content/view'),
      Header: require('./header/view'),
      Menu: {
        Side: require('./menu/side/view')
      },
      MenuSide: require('./menu/side/view'), // Shortcut
      Modal: {
        Dialog: require('./modal/dialog/view'),
        Reveal: require('./modal/reveal/view')
      },
      ModalDialog: require('./modal/dialog/view'),
      ModalReveal: require('./modal/reveal/view'),
      Toast: require('./toast/view'),
      Mediator: require('./util/mediator'),
      Logger: require('./util/logger'),
      conf: conf
    };
  }

  function getInstance() {
    if (!instance) {
      instance = init();
    }
    return instance;
  }

  return getInstance();

})();
