const request = require('request');
const apiKey  = require('../api-key');

const region         = 'euw';
const apiBasis       = `https://${region}.api.pvp.net/api/lol/${region}/`;
const apiStaticBasis = `https://global.api.pvp.net/api/lol/static-data/${region}/`;
const staticVersions = 'https://ddragon.leagueoflegends.com/api/versions.json';

const apiSuffixes = {
  staticChampions     : 'v1.2/champion/',
  summonerByName      : 'v1.4/summoner/by-name/',
  matchListBySummoner : 'v2.2/matchlist/by-summoner/'
};

module.exports = {
  getStaticVersion: function(callback) {
    console.log(`Fetching static api version`);
    const url = `${staticVersions}`;
    request(url, function(error, response) {
      if (!error && response.statusCode == 200) {
        callback(response.body);
      }
    });
  },
  getChampionsListImage : function(callback) {
    console.log(`Fetching static champion list with image`);
    const url = `${apiStaticBasis}${apiSuffixes.staticChampions}?champData=image&api_key=${apiKey}`;
    request(url, function(error, response) {
      if (!error && response.statusCode == 200) {
        callback(response.body);
      }
    });
  },
  getSummonerByName : function(summonerName, callback) {
    console.log(`Fetching summoner with summonerName : ${summonerName}`);
    const url = `${apiBasis}${apiSuffixes.summonerByName}${summonerName}?api_key=${apiKey}`;
    request(url, function(error, response) {
      if (!error && response.statusCode == 200) {
        callback(response.body);
      }
    });
  },
  getRankedMatches  : function(summonerId, callback) {
    console.log(`Fetching ranked matches with summonerId : ${summonerId}`);
    const url = `${apiBasis}${apiSuffixes.matchListBySummoner}${summonerId}?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=${apiKey}`;
    request(url, function(error, response) {
      if (!error && response.statusCode == 200) {
        callback(response.body);
      }
    });
  }
};