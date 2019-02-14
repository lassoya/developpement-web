const formation = {}

formation.supprimer= function (id) {
    console.log('yooo', id);
};

$(document).ready(function () {

    $('.nav-item').click(function () {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
    });

    function initPage(hash) {
        if (hash === 'formation') {
            initFormation();
        }
    }

    function initFormation() {
        $.ajax({
            url: '/api/formations',
            type: 'GET'
        }).done(function (formations) {
            $('#formation').show();
            $('#formation table tbody').empty();
            formations.forEach(function (formation) {
                $('#formation table tbody').append(
                    '<tr><td>' + formation.label + '</td>' +
                    '<td>' + formation.description + '</td>' +
                    '<td>' + formation.start_date + '</td>' +
                    '<td>' + formation.end_date + '</td>' +
                    '<td>' + formation.cost + '</td>' +
                    '<td><button onclick="formation.supprimer(' + formation.id + ')" class="btn btn-danger">Supprimer</button></td>' +
                    '</tr>');
            });
        });
    }


    $(window).bind('hashchange', function () { //detect hash change
        var hash = window.location.hash.slice(1); //hash to string (= "myanchor")
        $('.detail-page').hide();
        if (hash) {
            initPage(hash);
        }
    });

});
