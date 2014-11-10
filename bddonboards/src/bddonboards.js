var helper = require('./helper.js');


exports.create = function(storyboard, Casper){

  function ThenAction (step) {
      return function (){
        for (var action in step) {
          console.log(action, step[action]);
          casper[action].apply(this, step[action]);
        }
      };
  }

  function ThenWaitUntilEqual (stepNr) {
      return function(){
        helper.waitUntilEqual({
            expect: storyboard.captureRoot + '/expect/' + stepNr + '_.png',
            waitTimeout : storyboard.waitTimeout,
            casper : casper,
            Casper : Casper,
            viewport : storyboard.viewport,
            resemblejsUrl : storyboard.root + storyboard.compareRoot
          }, function(){
            // Equal
            console.log('ThenCompare GREEN');
          }, function(){
            // Timeout
            console.log('ThenCompare RED');
          });
      };
  }

  casper.start();
  casper.viewport(storyboard.viewport.width, storyboard.viewport.height);

  // Step 1. Open the app.
  casper.thenOpen(storyboard.root + storyboard.appRoot, function() {});
  casper.then(new ThenWaitUntilEqual (1));

  // Step n. ...
  var stepNr = 1;
  for (var i = 0; i < storyboard.steps.length; i = i + 1) {
      var stepNr = stepNr + 1;
      casper.then(new ThenAction (storyboard.steps[i]));
      casper.then(new ThenWaitUntilEqual (stepNr));
  }

  casper.run(function(){
    phantom.exit();
  });
}
