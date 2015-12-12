'use strict';

const test = require('tape');
const lolCode = require('../lol');
var sinon = require('sinon');

function createServiceStubs() {
  return {
    request: sinon.stub(),
    chalk: {
      green: sinon.stub(),
      red: sinon.stub(),
      blue: sinon.stub()
    },
    rateLimit: require('function-rate-limit'),
    console: {
      log: sinon.stub()
    },
    JSON: {
      parse: sinon.stub()
    }
  }
}

test('getStaticVersion should write a blue message', function (t) {
  const testMessage = 'a blue message';

  var services = createServiceStubs();
  services.chalk.blue.returns(testMessage);
  const lol = lolCode(services);

  lol.getStaticVersion(function (staticVersionData) {
  });

  t.ok(services.console.log.calledWith(testMessage), 'console.log() called with a blue message');
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
