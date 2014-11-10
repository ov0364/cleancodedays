$(document).ready(function () {
    var defStoryboardTempl = $.get('template/storyboard.mustache'),
        defReport = $.getJSON('../report.json');
    
    
    $.get('template/storyboard.mustache').always(function(){
        console.log('template : ', arguments);
    });
    
    defReport.always(function(model){
        console.log('model :', model);
    });
    
    $.when(defStoryboardTempl, defReport).done(function(template, model){
        console.log(arguments);
        console.log(template);
        console.log(model);
        var view = Mustache.render(template[0], model[0]);
        $('body').html(view);
    });
});