/* globals require */

const test = require('tape');
const lolCode = require('../lol');
const sinon = require('sinon');

function createServiceStubs() {
  return {
    request: sinon.stub(),
    chalk: require('chalk'),
    console: {
      log: sinon.stub()
    },
    apiKey: 1234
  };
}

test('getStaticVersion should call the right url', function (t) {
  const services = createServiceStubs();
  const lol = lolCode(services);

  lol.getStaticVersion();

  t.ok(services
    .request
    .calledWith('https://ddragon.leagueoflegends.com/api/versions.json'), 'request called with static version url');
  t.end();
});

test('getChampionsListImage should call the right url', function (t) {
  const services = createServiceStubs();
  const lol = lolCode(services);
  const expectedUrl = 'https://global.api.pvp.net/api/lol/static-data/euw/' +
    'v1.2/champion/?champData=image&api_key=1234';

  lol.getChampionsListImage();

  t.ok(services.request.calledWith(expectedUrl), 'request called with static version url');
  t.end();
});

test('getSummonerByName should call the right url', function (t) {
  const services = createServiceStubs();
  const lol = lolCode(services);
  const summonerName = 'Elwanna';
  const expectedUrl = 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name' +
    '/Elwanna?api_key=1234';

  lol.getSummonerByName(summonerName);

  t.ok(services.request.calledWith(expectedUrl), 'request called with static version url');
  t.end();
});

test('getRankedMatches should call the right url', function (t) {
  const services = createServiceStubs();
  const lol = lolCode(services);
  const summonerId = '123456';
  const expectedUrl = 'https://euw.api.pvp.net/api/lol/euw/v2.2/matchlist/by-summoner/123456?' +
    'rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=1234';

  lol.getRankedMatches(summonerId);

  t.ok(services.request.calledWith(expectedUrl), 'request called with static version url');
  t.end();
});

// test('getMatch should call the right url', function (t) {
//   const services = createServiceStubs();
//   const lol = lolCode(services);
//   const matchId = '123456';
//   const expectedUrl = 'https://euw.api.pvp.net/api/lol/euw/v2.2/match/' +
//     '123456?api_key=1234';

//   lol.getMatch(matchId);

//   t.ok(services.request.calledWith(expectedUrl), 'request called with static version url');
//   t.end();
// });
