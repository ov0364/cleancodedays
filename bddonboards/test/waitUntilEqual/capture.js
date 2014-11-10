casper.options.waitTimeout = 5000;
casper.start();
casper.viewport(600, 600);

casper.thenOpen('http://localhost:8111/test/waitUntilEqual/simple/index.html', function(){

});

casper.then(function(){
    casper.captureSelector("../test/waitUntilEqual/simple/capture/simple.png", "html");
});

casper.run(function(){
	phantom.exit();
});
