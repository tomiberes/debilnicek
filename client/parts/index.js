'use strict';

var Backbone = require('backbone'),
    Router = require('./router');

var router = new Router();

Backbone.history.start({ pushState: true });
