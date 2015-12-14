var lol = require('./lol');
var services = {
  request: require('request-promise'),
  chalk: require('chalk'),
  console: console
};

// module.exports = {};
module.exports = lol(services);
