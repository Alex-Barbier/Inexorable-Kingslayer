'use strict';

const moment = require('moment');

module.exports = {
  getMatchNumberByDayOfWeek : matchList => {
    let matchNumberByDay = {
      Monday    : 0,
      Tuesday   : 0,
      Wednesday : 0,
      Thursday  : 0,
      Friday    : 0,
      Saturday  : 0,
      Sunday    : 0
    };

    matchList.forEach(match => {
      const dayOfWeek = moment(match.timestamp).format("dddd");
      matchNumberByDay[dayOfWeek] += 1;
    });
    console.log(matchNumberByDay);
    return matchNumberByDay;
  },

  getMatchNumberByDay : matchList => {
    let matchNumberByDay = {};
    matchList.forEach(match => {
      const dayOfYear = moment(match.timestamp).format("L");
      matchNumberByDay[dayOfYear] ? matchNumberByDay[dayOfYear]++ : matchNumberByDay[dayOfYear] = 1;
    });
    console.log(matchNumberByDay);
    return matchNumberByDay;
  },

  getMatchNumberByHour : matchList => {
    let matchNumberByHour = {};
    matchList.forEach(match => {
      const hourOfDay = moment(match.timestamp).format("H");
      matchNumberByHour[hourOfDay] ? matchNumberByHour[hourOfDay]++ : matchNumberByHour[hourOfDay] = 1;
    });
    console.log(matchNumberByHour);
    return matchNumberByHour;
  }

};
