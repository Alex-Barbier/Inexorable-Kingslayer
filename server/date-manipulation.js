'use strict';

const moment = require('moment');

module.exports = {
  // ex: 'dddd' for day of week
  //     'L'    for day of year
  //     'H'    for hour
  //     'MMMM' for month
  //     'W'    for week

  getMatchNumberByFormat : (matchList, format) => {
    let matchNumberByFormat = {};
    matchList.forEach(match => {
      const timeOfMatch = moment(match.timestamp).format(format);
      matchNumberByFormat[timeOfMatch] ? matchNumberByFormat[timeOfMatch]++ : matchNumberByFormat[timeOfMatch] = 1;
    });
    console.log(matchNumberByFormat);
    return matchNumberByFormat;
  }
};
