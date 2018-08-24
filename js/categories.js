var filenames_2 = ["data/all_data250.geojson"];
var distances = ["data/250_distances.csv"];


// handle checkbox input event
$('input[type="checkbox"]').on('input', function(event) {
    var currentInput = event.target;
    var isChecked = event.target.checked;
    var data = event.target.dataset;
    myFunction(isChecked, filenames_2, distances, data.markerclasses, data.fcenters, data.colors, data.number);
});

// Handle category dropdowns
$('#category_dropdown').on('input', function(event) {
    // uncheck all checkboxes
    $('.group-box-list').find('input').prop('checked', false);
    // display current category's checkboxes
    change_category();
    var categoryName = '#category' + event.target.value;
    $('.group-box-list').removeClass('visible');
    $(categoryName).addClass('visible');
    if (categoryName == '#category1') {
        filenames_2 = ["data/all_data250.geojson"]
        distances = ["data/250_distances.csv"];

    }
    if (categoryName == '#category2') {
        filenames_2 = ["data/all_data200.geojson"]
        distances = ["data/200_distances.csv"];
    }
    if (categoryName == '#category3') {
        filenames_2 = ["data/all_data150.geojson"]
        distances = ["data/150_distances.csv"];
    }
    if (categoryName == '#category4') {
        filenames_2 = ["data/all_data120.geojson"]
        distances = ["data/120_distances.csv"];
    }
    if (categoryName == '#category5') {
        filenames_2 = ["data/all_data100.geojson"]
        distances = ["data/100_distances.csv"];
    }
    if (categoryName == '#category6') {
        filenames_2 = ["data/all_data80.geojson"]
        distances = ["data/80_distances.csv"];
    }
    if (categoryName == '#category7') {
        filenames_2 = ["data/all_data60.geojson"]
        distances = ["data/60_distances.csv"];
    }
    if (categoryName == '#category8') {
        filenames_2 = ["data/all_data40.geojson"]
        distances = ["data/40_distances.csv"];
    }
    if (categoryName == '#category9') {
        filenames_2 = ["data/all_data30.geojson"]
        distances = ["data/30_distances.csv"];
    }
    if (categoryName == '#category10') {
        filenames_2 = ["data/all_data30.geojson"]
        distances = ["data/30_distances.csv"];
    }
});

$('.select-all-button').on('click', function(event) {
    var $button = $(event.currentTarget);
    var $inputs = $button.closest('.group-box-list').find('label input');

    $.each($inputs, function(index, value) {
        if (!$(value).prop('checked')) {
            $(value).click();
        }
    });
});