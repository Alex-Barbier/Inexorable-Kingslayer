const express = require('express');
const lol = require('./lol');

const app = express();

app.get('/summoner/:summonerName', function (req, res) {
  lol.getSummonerByName(req.params.summonerName, function(lolres){
    res.send(lolres);
  });
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

