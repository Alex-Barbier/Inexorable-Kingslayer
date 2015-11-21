const lol = require('../lol/lol');

var champions = [];
lol.getChampionsList(function(championsData) {
  championsData = JSON.parse(championsData);
  for (championData in championsData.data) {
    champions.push({
      id: championsData.data[championData].id,
      name: championsData.data[championData].name
    });
  }
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