const request = require('request');
const apiKey  = require('./api-key');

module.exports = {
  getSummonerByName: function(summonerName, callback) {
    console.log(summonerName);
    request('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + summonerName + '?api_key=' + apiKey, function(error, response) {
        if (!error && response.statusCode == 200) {
            callback(response.body);
        }
    });
  }
};