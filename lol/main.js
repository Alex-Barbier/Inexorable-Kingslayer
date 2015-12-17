var lol = require('./lol');
var services = {
  request: require('request-promise'),
  chalk: require('chalk'),
  console: console,
  apiKey: require('../api-key')
};

module.exports = lol(services);
