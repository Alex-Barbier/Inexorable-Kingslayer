const apiKey  = require('./api-key');
const express = require('express');
const request = require('request');

const app = express();

app.get('/summoner/:summonerName', function (req, res) {
  request('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + req.params.summonerName + '?api_key=' + apiKey, function(error, response) {
      if (!error && response.statusCode == 200) {
          console.log(response.body);
          res.send(response.body);
      }
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

