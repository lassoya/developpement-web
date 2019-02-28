$(document).ready(function () {

    $('.nav-item').click(function () {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    function initPage(hash) {
        if (hash === 'formation') {
            formation.init();
        }
    }

    $(window).bind('hashchange', function () { //detect hash change
        var hash = window.location.hash.slice(1); //hash to string (= "myanchor")
        $('.detail-page').hide();
        if (hash) {
            initPage(hash);
        }
    });

});
