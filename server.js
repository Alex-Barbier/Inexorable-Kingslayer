const express = require('express');
const moment  = require('moment');
const lol     = require('./lol');

const app = express();

function getMatchNumberByDayOfWeek(matchList) {
  var matchNumberByDay = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  };

  matchList.forEach(match => {
    var dayOfWeek = moment(match.timestamp).format("dddd");
    matchNumberByDay[dayOfWeek] += 1;
  });
  console.log(matchNumberByDay);
  return matchNumberByDay;
}

function getMatchNumberByDay(matchList) {
  var matchNumberByDay = {};

  matchList.forEach(match => {
    var dayOfWeek = moment(match.timestamp).format("L");
    matchNumberByDay[dayOfWeek] ? matchNumberByDay[dayOfWeek]++ : matchNumberByDay[dayOfWeek] = 1;
  });
  console.log(matchNumberByDay);
  return matchNumberByDay;
}

app.get('/login/:summonerName', function(req, res) {
  const summonerName = req.params.summonerName;
  lol.getSummonerByName(summonerName, function(summonerData) {
    summonerData = JSON.parse(summonerData);
    const summonerId = summonerData[summonerName.toLowerCase()].id;

    lol.getRankedMatches(summonerId, function(matchesData) {
      matchesData = JSON.parse(matchesData);
      matchesData.matches.map(match => {
        match.date = moment(match.timestamp).format("L");
        return match;
      });
      getMatchNumberByDay(matchesData.matches);

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

