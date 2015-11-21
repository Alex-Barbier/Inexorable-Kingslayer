const moment  = require('moment');

module.exports = {
  getMatchNumberByDayOfWeek: matchList => {
    var matchNumberByDay = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0
    };

    matchList.forEach(match => {
      var dayOfWeek = moment(match.timestamp).format("dddd");
      matchNumberByDay[dayOfWeek] += 1;
    });
    console.log(matchNumberByDay);
    return matchNumberByDay;
  },

  getMatchNumberByDay: matchList => {
    var matchNumberByDay = {};

    matchList.forEach(match => {
      var dayOfWeek = moment(match.timestamp).format("L");
      matchNumberByDay[dayOfWeek] ? matchNumberByDay[dayOfWeek]++ : matchNumberByDay[dayOfWeek] = 1;
    });
    console.log(matchNumberByDay);
    return matchNumberByDay;
  }
};