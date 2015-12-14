'use strict';

const test = require('tape');
const lolCode = require('../lol');
var sinon = require('sinon');

function createServiceStubs() {
  return {
    request: sinon.stub(),
    chalk: require('chalk'),
    console: {
      log: sinon.stub()
    }
  };
}

// test('getStaticVersion should log an info message', function (t) {
//   var services = createServiceStubs();
//   const lol = lolCode(services);

//   lol.getStaticVersion();

//   t.ok(services.console.log.calledWith('Fetching static api version'), 'console.log() called with an info message');
//   t.end();
// });

// test('getStaticVersion should call the right url', function (t) {
//   var services = createServiceStubs();
//   const lol = lolCode(services);

//   lol.getStaticVersion();

//   t.ok(services
//     .request
//     .calledWith('https://ddragon.leagueoflegends.com/api/versions.json'), 'request called with static version url');
//   t.end();
// });

test('basic ok test', function (t) {
  t.plan(1);
  t.ok(true); // assert the value is truthy
});

test('basic assert test', function (t) {
  t.plan(1);
  t.assert(true, 'second param is a description of the assert'); // an alias for t.ok()
});

test('basic notOk test', function (t) {
  t.plan(1);
  t.notOk(false);
});

test('equal test', function (t) {
  t.plan(1);
  t.equal(42, 42);
});

test('equal test', function (t) {
  t.plan(1);
  t.equal({content: 'trololo'}, {content: 'trololo'});
});

test('deep equal test', function (t) {
  t.plan(1);
  t.deepEqual({content: 'trololo'}, {content: 'trololo'});
});

test.skip('this test will be skipped', function (t) {
  t.plan(1);
  t.notOk('trololololo lololo lololo');
});

test.only('this test will be skipped', function (t) {
  t.plan(1);
  t.ok('trololololo lololo lololo', 'love this song');
});

/*test('super cool test', function (t) {
  t.plan(1000);
    for(let i = 0; i < 200; i++) {
      setTimeout(function () {
          t.ok(true);
      }, i * 100);
    }
});*/
