$('#add_book').submit(function(event) {
    alert('Data inserted successfully.');
});

$('#update_book').submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];
    });

    var request = {
        'url': `http://localhost:3000/api/books/${data.id}`,
        'method': 'PUT',
        'data': data
    };

    $.ajax(request).done(function(response) {
        alert('Data updated successfully.');
    });
});

if (window.location.pathname === '/') {
    $ondelete = $('.table tbody td a.delete');
    $ondelete.click(function() {
        var id = $(this).attr('data-id');
        var request = {
            'url': `http://localhost:3000/api/books/${id}`,
            'method': 'DELETE'
        };

        if (confirm('Delete this book from the records?')) {
            $.ajax(request).done(function(response) {
                alert('Data deleted successfully.');
                location.reload();
            });
        };
    });
};