'use strict';

module.exports = {
  user: require('./user'),
  local: require('./local'),
  remote: require('./remote'),
};

/*
var User = require('./user'),
    Local = require('./local'),
    Remote = require('./remote');

function init() {
  Local.init();
  Remote.init();
}

moduel.exports = {
  init: init,
  user: User,
  local: Local,
  remote: Remote
};
*/
