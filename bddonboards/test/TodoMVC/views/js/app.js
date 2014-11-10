function Storyboard (config, controller, template, model) {
    var stepNr = 0;
    
    function next (storyboardNr) {
        var storyboard = config.storyboard[storyboardNr];
        var selectorFocus;
        
        if (stepNr < storyboard.steps.length) {
            for (var action in storyboard.steps[stepNr]) {
                selectorFocus = controller[action].apply(this, storyboard.steps[stepNr][action]);
            }
            // TODO user an observer on the Model.
            var view = Mustache.render(template, model);
            $('body').html(view);
            console.log(selectorFocus);
            if (selectorFocus) {
                $(selectorFocus).focus();
            }
            stepNr = stepNr + 1;            
        }
    }
    
    // Constructor
    (function constructor () {
        var view = Mustache.render(template, model);
        $('body').html(view);
        $("#new-todo").focus();
    })();
    
    // Public
    this.next = next;
}

$(document).ready(function () {
    var defTempl = $.get('template/todos.mustache'),
        defStoryboard = $.getJSON('../todomvc.json');
    
    $.when(defTempl, defStoryboard).done(function(template, config){
        var model = new Model();
        var controller = new Controller(model);
        
        window.storyboard = new Storyboard(config[0], controller, template[0], model)
    });
});