var lol = require('./lol');
var services = {
  request: require('request-promise'),
  chalk: require('chalk'),
  rateLimit: require('function-rate-limit'),
  console: console
};

// module.exports = {};
module.exports = lol(services);
