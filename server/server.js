const express              = require('express');
const lol                  = require('../lol/lol');
const dateManipulation     = require('./date-manipulation');
const championManipulation = require('./champion-manipulation');
const roleManipulation     = require('./role-manipulation');

const app = express();

const fs       = require("fs");
const filename = "./front/index.html";

app.get('/', function(req, res, next) {
  res.writeHead(200, {
    "Content-Type" : "text/html"
  });
  fs.readFile(filename, "utf8", function(err, data) {
    if (err) throw err;
    res.write(data);
    res.end();
  });
});

app.use(express.static('front'));

app.get('/login/:summonerName', function(req, res) {
  const summonerName = req.params.summonerName;
  lol.getSummonerByName(summonerName, function(summonerData) {
    summonerData     = JSON.parse(summonerData);
    const summonerId = summonerData[summonerName.toLowerCase()].id;

    lol.getRankedMatches(summonerId, function(matchesData) {
      matchesData = JSON.parse(matchesData);

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
    res.send(matchesData);
  });
});

app.get('/match/:matchId', function(req, res) {
  lol.getMatch(req.params.matchId, function(matchData) {
    res.send(matchData);
  });
});

const server = app.listen(process.env.PORT || 3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
