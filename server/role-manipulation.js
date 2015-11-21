const lol = require('../lol/lol');

module.exports = {
  getRoleStats : matchesList => {
    var rolesList = {
      carry   : 0,
      support : 0,
      jungle  : 0,
      soloMid : 0,
      soloTop : 0,
      troll   : 0
    };

    matchesList.map(match => {
      if (match.role === 'DUO_CARRY') {
        rolesList.carry++;
      } else if (match.role === 'DUO_SUPPORT') {
        rolesList.support++;
      } else if (match.role === 'NONE' && match.lane === 'JUNGLE') {
        rolesList.jungle++;
      } else if (match.role === 'SOLO' && match.lane === 'MID') {
        rolesList.soloMid++;
      } else if (match.role === 'SOLO' && match.lane === 'TOP') {
        rolesList.soloTop++;
      } else {
        rolesList.troll++;
      }
      return match;
    });
    console.log(rolesList);
    return rolesList;
  }
};