'use strict';

module.exports = function core(services) {
  var apiKey         = require('../api-key');
  var apiSuffixes    = require('./api-suffixes');

  var region         = 'euw';
  var apiBasis       = `https://${region}.api.pvp.net/api/lol/${region}/`;
  var apiStaticBasis = `https://global.api.pvp.net/api/lol/static-data/${region}/`;
  var staticVersions = 'https://ddragon.leagueoflegends.com/api/versions.json';

  return {
    getStaticVersion      : function() {
      services.console.log(services.chalk.blue(`Fetching static api version`));
      var url = `${staticVersions}`;
      return services.request(url);
    },
    getChampionsListImage : function() {
      services.console.log(services.chalk.blue(`Fetching static champion list with image`));
      var url = `${apiStaticBasis}${apiSuffixes.staticChampions}?champData=image&api_key=${apiKey}`;
      return services.request(url);
    },
    getSummonerByName     : function(summonerName) {
      services.console.log(services.chalk.blue(`Fetching summoner with summonerName : ${summonerName}`));
      var url = `${apiBasis}${apiSuffixes.summonerByName}${summonerName}?api_key=${apiKey}`;
      return services.request(url);
    },
    getRankedMatches      : function(summonerId) {
      services.console.log(services.chalk.blue(`Fetching ranked matches with summonerId : ${summonerId}`));
      var url = `${apiBasis}${apiSuffixes.matchListBySummoner}${summonerId}?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=${apiKey}`;
      return services.request(url);
    },
    getMatch: function(matchId) {
      services.console.log(services.chalk.blue(`Fetching matches with matchId : ${matchId}`));
      var url = `${apiBasis}${apiSuffixes.match}${matchId}?api_key=${apiKey}`;
      return services.request(url);
    }
  };
}
