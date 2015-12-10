'use strict';

const test = require('tape');
const lol = require('../lol');

test('getStaticVersion should be a function', function (t) {
  t.equal(typeof lol.getStaticVersion, 'function');
  t.end();
});

// // FOR NYAN
// test('test api static version', function (t) {
//   t.plan(1000);
//     for(let i = 0; i < 1000; i++) {
//       setTimeout(function () {
//           t.ok(true);
//       }, 100);
//     }
// });

test('test summoner api', function (t) {
  const summonerName = 'Elwanna';
  t.plan(1);
  lol.getSummonerByName(summonerName, function (staticVersionData) {
    t.equal(staticVersionData[summonerName.toLowerCase()].name, summonerName);
  });
});
