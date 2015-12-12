'use strict';

module.exports = function core(services) {
  var apiKey         = require('../api-key');
  var apiSuffixes    = require('./api-suffixes');

  var region         = 'euw';
  var apiBasis       = `https://${region}.api.pvp.net/api/lol/${region}/`;
  var apiStaticBasis = `https://global.api.pvp.net/api/lol/static-data/${region}/`;
  var staticVersions = 'https://ddragon.leagueoflegends.com/api/versions.json';

  // https://developer.riotgames.com/docs/api-keys
  // Apply first rate limitation : 10 request every 10 seconds
  var apiCall = services.rateLimit(10, 10 * 1000, (url, callback) => {
    services.request(url, (error, response) => {
      if (!error && response.statusCode === 200) {
        callback(JSON.parse(response.body));
        services.console.log(services.chalk.green(`success`, response.statusCode));
      } else {
        callback(response);
        services.console.log(services.chalk.red(`error`, response.statusCode));
      }
    });
  });

  // Apply second rate limitation : 500 request every 10 minutes
  apiCall = services.rateLimit(500, 10 * 60 * 1000, apiCall);

  return {
    getStaticVersion      : function(callback) {
      services.console.log(services.chalk.blue(`Fetching static api version`));
      var url = `${staticVersions}`;
      apiCall(url, callback);
    },
    getChampionsListImage : function(callback) {
      services.console.log(services.chalk.blue(`Fetching static champion list with image`));
      var url = `${apiStaticBasis}${apiSuffixes.staticChampions}?champData=image&api_key=${apiKey}`;
      apiCall(url, callback);
    },
    getSummonerByName     : function(summonerName, callback) {
      services.console.log(services.chalk.blue(`Fetching summoner with summonerName : ${summonerName}`));
      var url = `${apiBasis}${apiSuffixes.summonerByName}${summonerName}?api_key=${apiKey}`;
      apiCall(url, callback);
    },
    getRankedMatches      : function(summonerId, callback) {
      services.console.log(services.chalk.blue(`Fetching ranked matches with summonerId : ${summonerId}`));
      var url = `${apiBasis}${apiSuffixes.matchListBySummoner}${summonerId}?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=${apiKey}`;
      apiCall(url, callback);
    },
    getMatch: function(matchId, callback) {
      services.console.log(services.chalk.blue(`Fetching matches with matchId : ${matchId}`));
      var url = `${apiBasis}${apiSuffixes.match}${matchId}?api_key=${apiKey}`;
      apiCall(url, callback);
    }
  };
}
