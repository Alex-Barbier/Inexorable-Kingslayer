const apiKey = require('./api-key');

const request = require('request');

request('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/Elwanna?api_key=' + apiKey , function (error, response) {
  if (!error && response.statusCode == 200) {
    console.log(response.body);
  }
})