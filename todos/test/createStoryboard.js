/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/
var phantomcss = require('./lib/phantomcss.js');

phantomcss.init({
        addLabelToFailedImage: false,
        mismatchTolerance: 0.00,
        screenshotRoot: '../todo/screenshots',
        onComplete: function(allTests, noOfFails, noOfErrors){
            allTests.forEach(function(test){
                console.log(JSON.stringify(test));
            });
        },
        fileNameGetter: function overide_file_naming(root, fileName){
        	var name;

            fileName = fileName || "screenshot";
            name = root + fs.separator + fileName;

            if(fs.isFile(name+'.png')){
                return name+'.diff.png';
            } else {
                return name+'.png';
            }
        }
}/*{
	screenshotRoot: '/screenshots',
	failedComparisonsRoot: '/failures'
	casper: specific_instance_of_casper,
	libraryRoot: '/phantomcss',
	fileNameGetter: function overide_file_naming(){},
	onPass: function passCallback(){},
	onFail: function failCallback(){},
	onTimeout: function timeoutCallback(){},
	onComplete: function completeCallback(){},
	hideElements: '#thing.selector',
	addLabelToFailedImage: true
}*/);


/*
	The test scenario
*/
var i = 0, links = [];
casper.start();
casper.viewport(600, 600);

function getLinks() {
    var links = document.querySelectorAll('a');
    links = Array.prototype.filter.call(links, function(e){
        return e.getAttribute('href').indexOf(".html") > -1
    });
    return Array.prototype.map.call(links, function(e) {
        return 'http://localhost:8234' + e.getAttribute('href');
    });
}

casper.thenOpen('http://localhost:8234/todos/view', function() {
    links = this.evaluate(getLinks);
    console.log("Links : " + links.length, JSON.stringify(links));
    casper.eachThen(links, function(response){
        this.thenOpen(response.data, function(response) {
            console.log(this.getCurrentUrl().split(".")[0].split("/")[5]);

            // HACK for not showing the placeholder
            this.fillSelectors('form', {'#new-todo':' '}, false);
            this.fillSelectors('form', {'#new-todo':''}, false);        

            phantomcss.screenshot('html', this.getCurrentUrl().split(".")[0].split("/")[5]);
        });
    });
});

/*
Casper runs tests
*/
casper.run(function(){
	console.log('\nTHE END.');
	phantom.exit(phantomcss.getExitStatus());
});