const request = require('request');
const apiKey  = require('./api-key');

const apiBasis = 'https://euw.api.pvp.net/api/lol/euw/';
const apiSuffixes = {
    summonerByName: 'v1.4/summoner/by-name/',
    matchListBySummoner: 'v2.2/matchlist/by-summoner/'
};

module.exports = {
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