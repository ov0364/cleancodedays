fs = require('fs'),
sStoryboard = fs.read('..' + fs.separator + 'test' + fs.separator + 'bddOnBoards' + fs.separator + 'storyboard.json'),
storyboard = JSON.parse(sStoryboard);

casper.start();
casper.viewport(storyboard.viewport.width, storyboard.viewport.height);

function ThenCaptureSelector (stepNr) {
  return function(){
    casper.captureSelector(storyboard.captureRoot + "/expect/" + stepNr + "_.png", "html");
  };
}

var stepsLength = storyboard.steps.length + 1;
for (var i = 0; i < stepsLength; i = i + 1) {
  var stepNr = i + 1;
  casper.thenOpen(storyboard.root + storyboard.viewsRoot + "/" + stepNr + '_.html', new ThenCaptureSelector(stepNr));
}

casper.run(function(){
	phantom.exit();
});
