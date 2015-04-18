'use strict';

var _user = {},
    _default = {
      name: 'debilnicek',
      token: '',
      settings: {}
    };

function get() {
  var user = localStorage.getItem('user');
  if (validate(user)) {
    _user = user;
    return _user;
  } else {
    _user = _default;
    return _user;
  }
}

function set(user) {
  if (!validate(user)) return false;
  localStorage.setItem('user', user);
  _user = user;
  return _user;
}

function unset() {
  localStorage.removeItem('user');
  _user = _default;
  return _user;
}

// TODO: validation rules
function validate(user) {
  if (!user) return false;
  if (user.name && user.name !== _default.name) return true;
}

function settings(conf) {
  return _user.settings; // ?!
}

// After these actions, 'deb:notes:query' have to be triggered
// to reset the notes collection

function login(credentials, callback) {
  return;
}

function logout(callback) {
  return;
}

function register(credentials, callback) {
  return;
}

module.exports = {
  get: get,
  set: set,
  unset: unset,
  validate: validate,
  login: login,
  logout: logout,
  register: register
};
