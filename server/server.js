const express              = require('express');
const lol                  = require('../lol/main');
const dateManipulation     = require('./date-manipulation');
const championManipulation = require('./champion-manipulation');
const roleManipulation     = require('./role-manipulation');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/login/:summonerName', function(req, res) {
  const summonerName = req.params.summonerName;
  lol.getSummonerByName(summonerName, function(summonerData) {
    summonerData     = summonerData;
    const summonerId = summonerData[summonerName.toLowerCase()].id;

    lol.getRankedMatches(summonerId, function(matchesData) {
      matchesData = matchesData;

      dateManipulation.getMatchNumberByFormat(matchesData.matches, 'W');
      championManipulation.getNumberOfGameByChampion(matchesData.matches);
      roleManipulation.getRoleStats(matchesData.matches);

      res.send(matchesData.matches);

    });
  });
});

app.get('/summoner/:summonerName', function(req, res) {
  lol.getSummonerByName(req.params.summonerName, function(summonerData) {
    res.send(summonerData);
  });
});

app.get('/ranked/:summonerId', function(req, res) {
  lol.getRankedMatches(req.params.summonerId, function(matchesData) {
    if(!req.query.last) {
      res.send(matchesData);
    }
    if(req.query.last) {
      matchesData = matchesData;
      const matchesToReturn = matchesData.matches.splice(0, req.query.last);
      res.send(matchesToReturn);
    }
  });
});

app.get('/match/:matchId', function(req, res) {
  lol.getMatch(req.params.matchId, function(matchData) {
    res.send(matchData);
  });
});

const server = app.listen(process.env.PORT || 4000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
