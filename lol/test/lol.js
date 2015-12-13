'use strict';

const test = require('tape');
const lolCode = require('../lol');
var sinon = require('sinon');

function createServiceStubs() {
  return {
    request: sinon.stub(),
    chalk: require('chalk'),
    rateLimit: require('function-rate-limit'),
    console: {
      log: sinon.stub()
    }
  }
}

test('getStaticVersion should log an info message', function (t) {
  var services = createServiceStubs();
  const lol = lolCode(services);

  lol.getStaticVersion();

  t.ok(services.console.log.calledWith('Fetching static api version'), 'console.log() called with an info message');
  t.end();
});

test('getStaticVersion should call the right url', function (t) {
  var services = createServiceStubs();
  const lol = lolCode(services);

  lol.getStaticVersion();

  t.ok(services
    .request
    .calledWith('https://ddragon.leagueoflegends.com/api/versions.json'), 'request called with static version url');
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

// test('getSummonerByName should make a call to the api and return a user', function (t) {
//   const summonerName = 'Elwanna';
//   t.plan(1);
//   lol.getSummonerByName(summonerName, function (summonerData) {
//     t.equal(summonerData[summonerName.toLowerCase()].name, summonerName);
//   });
// });
