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
  if(req.query.region) {
      lol.setRegion(req.query.region);
  }
  console.log(req.query.region);
  const summonerName = req.params.summonerName;
  lol
    .getSummonerByName(summonerName)
    .then(summonerData => {
      if(req.query.region) {
        lol.setRegion(req.query.region);
      }
      summonerData = JSON.parse(summonerData);
      console.log(summonerData);
      const summonerId = summonerData[summonerName.toLowerCase().replace(/ /g,'')].id;
      return lol.getRankedMatches(summonerId);
    })
    .then(matchesData => {
      matchesData = JSON.parse(matchesData);
      console.log(matchesData);
      const matchesByHour = dateManipulation.getMatchNumberByFormat(matchesData.matches, 'H');
      const matchesByDay = dateManipulation.getMatchNumberByFormat(matchesData.matches, 'L');
      const matchesByMonth = dateManipulation.getMatchNumberByFormat(matchesData.matches, 'MMMM');
      
      const matchesByChamp = championManipulation.getNumberOfGameByChampion(matchesData.matches);
      const matchesByRole = roleManipulation.getRoleStats(matchesData.matches);
      
      res.send({
          matchesNumber: matchesData.matches.length,
          matchesByHour,
          matchesByDay,
          matchesByMonth,
          matchesByChamp,
          matchesByRole
      });
    });
  });

app.get('/summoner/:summonerName', function(req, res) {
  lol
    .getSummonerByName(req.params.summonerName)
    .then(function(summonerData) {
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
