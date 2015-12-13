const lol            = require('../lol/main');
const staticUrlBasis = 'http://ddragon.leagueoflegends.com/cdn/';

var champions = [];
var staticVersion;
lol.getStaticVersion()
  .then(function(staticVersionData) {
    staticVersionData   = JSON.parse(staticVersionData);
    staticVersion = staticVersionData[0];
    return lol.getChampionsListImage();
  })
  .then(function(championsData) {
    championsData = JSON.parse(championsData);
    for (championData in championsData.data) {
      champions.push({
        id    : championsData.data[championData].id,
        name  : championsData.data[championData].name,
        image : `${staticUrlBasis}${staticVersion}/img/champion/${championsData.data[championData].image.full}`
      });
    }
    return championsData;
  });

function getChampionNameById(championId) {
  return champions.filter(champion => champion.id === championId)[0].name;
}

module.exports = {
  getNumberOfGameByChampion : matchesList => {
    var championNumber = {};

    matchesList.map(match => {
      match.championName = getChampionNameById(match.champion);
      return match;
    });

    matchesList.forEach(match => {
      championNumber[match.championName] ?
          championNumber[match.championName]++ :
          championNumber[match.championName] = 1;
    });
    console.log(championNumber);
    return championNumber;
  }

};
