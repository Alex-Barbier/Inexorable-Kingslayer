'use strict';

const request   = require('request');
const chalk     = require('chalk');
const rateLimit = require('function-rate-limit');

const apiKey    = require('../api-key');
const apiSuffixes    = require('./api-suffixes');

const region         = 'euw';
const apiBasis       = `https://${region}.api.pvp.net/api/lol/${region}/`;
const apiStaticBasis = `https://global.api.pvp.net/api/lol/static-data/${region}/`;
const staticVersions = 'https://ddragon.leagueoflegends.com/api/versions.json';

// https://developer.riotgames.com/docs/api-keys
// Apply first rate limitation : 10 request every 10 seconds
let apiCall = rateLimit(10, 10 * 1000, (url, callback) => {
  request(url, (error, response) => {
    if (!error && response.statusCode == 200) {
      callback(response.body);
    }
    else {
      callback(response);
    }
  });
});

// Apply second rate limitation : 500 request every 10 minutes
apiCall = rateLimit(500, 10 * 60 * 1000, apiCall);

module.exports = {
  getStaticVersion      : function(callback) {
    console.log(chalk.blue(`Fetching static api version`));
    const url = `${staticVersions}`;
    apiCall(url, callback);
  },
  getChampionsListImage : function(callback) {
    console.log(chalk.blue(`Fetching static champion list with image`));
    const url = `${apiStaticBasis}${apiSuffixes.staticChampions}?champData=image&api_key=${apiKey}`;
    apiCall(url, callback);
  },
  getSummonerByName     : function(summonerName, callback) {
    console.log(chalk.blue(`Fetching summoner with summonerName : ${summonerName}`));
    const url = `${apiBasis}${apiSuffixes.summonerByName}${summonerName}?api_key=${apiKey}`;
    apiCall(url, callback);
  },
  getRankedMatches      : function(summonerId, callback) {
    console.log(chalk.blue(`Fetching ranked matches with summonerId : ${summonerId}`));
    const url = `${apiBasis}${apiSuffixes.matchListBySummoner}${summonerId}?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=${apiKey}`;
    apiCall(url, callback);
  },
  getMatch: function(matchId, callback) {
    console.log(chalk.blue(`Fetching matches with matchId : ${matchId}`));
    const url = `${apiBasis}${apiSuffixes.match}${matchId}?api_key=${apiKey}`;
    apiCall(url, callback);
  }
};
