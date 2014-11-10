var fs = require('fs');
var sTodos = fs.read('..' + fs.separator + 'test' + fs.separator + 'TodoMVC' + fs.separator + 'todomvc.json');
var todos = JSON.parse(sTodos);
var sReport = fs.read('..' + fs.separator + 'test' + fs.separator + 'TodoMVC' + fs.separator + 'report.json');
var report = JSON.parse(sReport);
var Casper = require('casper');
var helper = require('../../src/helper.js');
casper.start();
casper.viewport(todos.viewport.width, todos.viewport.height);

var casperController = require('actual/controller.js').create(casper);

function ThenAction (storyboardNr, stepNr, step) {
    return function (){
        if (stepNr > 1) {
            for (var action in step) {
                if (casperController[action]) {
                    try {
                        casperController[action].apply(this, step[action]);
                    } catch (e) {
                        console.log(stepNr + " - " + action + " is throwing an exception");
                    }
                } else {
                    console.log(stepNr + " - " + action + " is undefined");
                }
            }
        } else {
            casper.thenOpen(todos.appRoot, function() {});
        }
    }
}

function ThenWaitUntilEqual (storyboardNr, stepNr) {
  return function(){
    helper.waitUntilEqual({
        expect: todos.captureRoot + '/expect/' + storyboardNr + '/' + stepNr + '_.png',
        waitTimeout : todos.waitTimeout,
        casper : casper,
        Casper : Casper,
        viewport : todos.viewport,
        resemblejsUrl : todos.root + todos.compareRoot
      }, function(){
          // Equal
          console.log(stepNr + ' : ' + report.storyboard[storyboardNr].steps[(stepNr-1)].title + ' : passed');
          report.storyboard[storyboardNr].steps[(stepNr-1)].passed = true;
          report.storyboard[storyboardNr].steps[(stepNr-1)].fail = false;
      }, function(){
          // Timeout
          console.log(stepNr + ' : ' + report.storyboard[storyboardNr].steps[(stepNr-1)].title + ' : fail');
          report.storyboard[storyboardNr].steps[(stepNr-1)].passed = false;
          report.storyboard[storyboardNr].steps[(stepNr-1)].fail = true;
      });
  };
}

for (var j = 0; j < todos.storyboard.length; j = j + 1) {
    
    casper.then(new ThenAction (j, 1));
    casper.then(new ThenWaitUntilEqual (j, 1));
    
    var stepNr = 1;
    for (var i = 0; i < todos.storyboard[j].steps.length; i = i + 1) {
        stepNr = stepNr + 1;
        casper.then(new ThenAction (j, stepNr, todos.storyboard[j].steps[i]));
        casper.then(new ThenWaitUntilEqual (j, stepNr));
    }
}

casper.run(function(){
    fs.write('..' + fs.separator + 'test' + fs.separator + 'TodoMVC' + fs.separator + 'report.json', JSON.stringify(report, null, '\t'), 'w');
	phantom.exit();
});