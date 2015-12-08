const test = require('tape');
const lol = require('../lol');

test('test api static version', function (t) {
    lol.getStaticVersion(function(staticVersionData){
      t.equal(JSON.parse(staticVersionData)[0], '5.24.1')
    });
});
