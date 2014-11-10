var helper = require('../../src/helper.js');

casper.options.waitTimeout = 5000;
casper.start();
casper.viewport(600, 600);

casper.thenOpen('http://localhost:8111/test/waitUntilEqual/simple/index.html', function(){

});

var Casper = require('casper');

helper.waitUntilEqual({
    expect:'../test/waitUntilEqual/simple/capture/simple.png',
    waitTimeout:5000,
    casper:casper,
    Casper:Casper,
    viewport: {
      width:600,
      height:600
    },
    resemblejsUrl : 'http://localhost:8111/lib/ResembleJs/resemblejscontainer.html'
  }, function(){
    // Equal
    console.log('GREEN');
  }, function(){
    // Timeout
    console.log('RED');
  });

casper.run(function(){
  phantom.exit();
});
