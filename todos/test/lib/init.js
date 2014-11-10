jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;

function open (done) {
    $('body').append('<iframe src="../src/index.html"></iframe>');
    setTimeout(function(){
        $ = $('iframe')[0].contentWindow.$;
        done();
    }, 1000);    
}
function close () {
    jQuery('iframe').remove();
    $ = jQuery; 
}
//
//
////afterEach(function(){
////    $parent('iframe').remove();
////    localStorage.clear();
////    $ = undefined;
////    todoPageObject = undefined;
////});
//
//
//
//function open (url, done) {
//    $parent('body').append('<iframe src="' + url + '"></iframe>');
//
//    waitsFor(function(){
//        return typeof $parent('iframe')[0].contentWindow.$ !== "undefined";
//    }, 'iframe is loaded', 5000);
//    
//    waits(5000);
//
//    runs(function(){
//        doc = $parent('iframe')[0].contentWindow.document;
//        $ = $parent('iframe')[0].contentWindow.$;
//    });    
//}
