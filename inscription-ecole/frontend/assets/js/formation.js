const formation = {};

formation.supprimer = function (id, index) {
    $.ajax({
        url: `/api/formations/${id}`,
        method: 'DELETE'
    }).done(function (formations) {
        formation.data.splice(index, 1);
        formation.refreshTable();
    });
};

formation.edit = function (id, index) {
    formation.toggle();
    const _formation = formation.data.find(function (form) {
        return form.id === id;
    });
    if (_formation) {
        $('#id').val(_formation.id);
        $('#label').val(_formation.label);
        $('#description').val(_formation.description);
        $('#start_date').val(_formation.start_date.substring(0, 10));
        $('#end_date').val(_formation.end_date.substring(0, 10));
    }
    $('#cost').val(_formation.cost);


};

formation.cancelForm = function () {
    this.toggle(); //this = object formation
    $('#formation-edit input').val('');
};

formation.saveForm = function () {
    const id = $('#id').val();
    const label = $('#label').val();
    const description = $('#description').val();
    const start_date = $('#start_date').val();
    const end_date = $('#end_date').val();
    const cost = $('#cost').val();

    $.ajax({
        url: '/api/formations/' + id,
        method: 'post',
        data: {
            id: id,
            label: label,
            description: description,
            start_date: start_date,
            end_date: end_date,
            cost: cost
        }
    }).done(function (data) {
       const index = formation.data.findIndex(function(f){
           return f.id === data.id;
       });

       if(-1 === index){
            formation.data.push(data);
       } else {
            formation.data[index] = data;
       }
        formation.refreshTable();
        formation.toggle();
    });
};

formation.toggle = function () {
    $('#formation, #formation-edit').toggle();
};

formation.data = [];

formation.init = function () {
    $.ajax({
        url: '/api/formations',
        type: 'GET'
    }).done(function (formations) {
        formation.data = formations;
        $('#formation').show();
        formation.refreshTable();
    });
};

formation.refreshTable = function () {
    $('#formation table tbody').empty();
    formation.data.forEach(function (formation, index) {
        $('#formation table tbody').append(
            '<tr><td>' + formation.label + '</td>' +
            '<td>' + formation.description + '</td>' +
            '<td>' + formation.start_date + '</td>' +
            '<td>' + formation.end_date + '</td>' +
            '<td>' + formation.cost + '</td>' +
            '<td>' +
            '<button onclick="formation.supprimer(' + formation.id + ', ' + index + ')" class="btn btn-danger">Supprimer</button>' +
            '<button onclick="formation.edit(' + formation.id + ', ' + index + ')" class="btn btn-primary">Modifier</button>' +
            '</td>' +
            '</tr>');
    });
}