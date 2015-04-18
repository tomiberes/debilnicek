'use strict';

// Configuration
var conf = require('./conf');
require('./bones').conf(conf);

// Require the app views, called `parts` in this case
require('./parts');
