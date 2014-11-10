exports.create = function (casper) {
    
    var casperController = {
        add : function (item) {
            casper.sendKeys('#new-todo', item, {keepFocus: true});
            casper.sendKeys('#new-todo', casper.page.event.key.Enter , {keepFocus: true});
        }
    };
    return casperController;
}