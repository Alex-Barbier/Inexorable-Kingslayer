const express = require('express');
const lol     = require('../lol/lol');
const dateManipulation     = require('./date-manipulation');

const app = express();

app.get('/login/:summonerName', function(req, res) {
  const summonerName = req.params.summonerName;
  lol.getSummonerByName(summonerName, function(summonerData) {
    summonerData = JSON.parse(summonerData);
    const summonerId = summonerData[summonerName.toLowerCase()].id;

    lol.getRankedMatches(summonerId, function(matchesData) {
      matchesData = JSON.parse(matchesData);
      // matchesData.matches.map(match => {
      //   match.date = moment(match.timestamp).format("L");
      //   return match;
      // });
      dateManipulation.getMatchNumberByDay(matchesData.matches);

      res.send(matchesData.matches);
    });
  });
});

app.get('/summoner/:summonerName', function(req, res) {
  lol.getSummonerByName(req.params.summonerName, function(summonerData) {
    res.send(summonerData);
  });
});

app.get('/matches/:summonerId', function(req, res) {
  lol.getRankedMatches(req.params.summonerId, function(matchesData) {
    res.send(matchesData);
  });
});

const server = app.listen(process.env.PORT || 3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

