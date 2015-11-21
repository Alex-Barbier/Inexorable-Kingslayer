const lol = require('../lol/lol');
const staticUrlBasis = 'http://ddragon.leagueoflegends.com/cdn/';

var champions = [];
lol.getStaticVersion(function(staticVersionData) {
  staticVersionData = JSON.parse(staticVersionData);
  const staticVersion = staticVersionData[0];
  lol.getChampionsListImage(function(championsData) {
    championsData = JSON.parse(championsData);
    for (championData in championsData.data) {
      champions.push({
        id: championsData.data[championData].id,
        name: championsData.data[championData].name,
        image: `${staticUrlBasis}${staticVersion}/img/champion/${championsData.data[championData].image.full}`
      });
    }
  });
});

function getChampionNameById (championId) {
    return champions.filter(champion => champion.id === championId)[0].name;
}

module.exports = {
  getNumberOfGameByChampion: matchesList => {
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