var fs = require('fs');
var sTodos = fs.read('..' + fs.separator + 'test' + fs.separator + 'TodoMVC' + fs.separator + 'todomvc.json');
var todos = JSON.parse(sTodos);

casper.start();
casper.viewport(todos.viewport.width, todos.viewport.height);

function Then (storyboardNr, stepNr, report) {
    return function (){
        var title = "";        
        
        if (stepNr > 1) {
            casper.evaluate(function(storyboardNr){window.storyboard.next(storyboardNr)}, storyboardNr);
            
            for (var action in todos.storyboard[storyboardNr].steps[(stepNr-2)]) {
                title = action + " " + JSON.stringify(todos.storyboard[storyboardNr].steps[(stepNr-2)][action]).replace("[","").replace("]","");
            }
        } else {
            title = "open"
        }

        report.storyboard[storyboardNr].steps.push({id:""+stepNr,title:title}); 
        
        casper.wait('2', function(){
            casper.capture(todos.captureRoot + "/expect/" + storyboardNr + "/" + stepNr +"_.png");
            console.log(stepNr + " - " + title + " - Capture");
        });
    }
}

var report = {title:todos.title,storyboard:[]};

for (var j = 0; j < todos.storyboard.length; j = j + 1) {
    report.storyboard.push({title:todos.storyboard[j].title,steps:[]});
    
    casper.thenOpen(todos.root + todos.viewsRoot, function() {});

    casper.then(new Then (j, 1, report));
    
    var stepNr = 1;
    for (var i = 0; i < todos.storyboard[j].steps.length; i = i + 1) {
        stepNr = stepNr + 1;
        casper.then(new Then (j, stepNr, report));
    }
}
casper.run(function(){
    fs.write('..' + fs.separator + 'test' + fs.separator + 'TodoMVC' + fs.separator + 'report.json', JSON.stringify(report, null, '\t'), 'w');
    phantom.exit(0);
});