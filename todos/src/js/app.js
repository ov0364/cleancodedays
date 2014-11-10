$(document).ready(function () {

    $("form").submit(function (event) {
        event.preventDefault();
        $('ul').append('<li><div class="view"><label>' + $('input').val() + '</label></div></li>');
        $('input').val("");
    });
});