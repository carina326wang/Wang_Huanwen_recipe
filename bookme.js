var Reservation = Parse.Object.extend("Reservation");

function queryReservationsForDay(day, successCallback) {
    var query = new Parse.Query(Reservation);
    query.equalTo("date", new Date(2015, 0, +day));
    query.find({
        success: successCallback,
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function saveReservation(name, day, meal, successCallback) {
    var reservation = new Reservation();

    reservation.set("personName", name);
    reservation.set("date", new Date(2015, 0, +day));
    reservation.set("meal", meal);

    reservation.save(null, {
        success: successCallback,
        error: function(reservation, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}

function showModalLoading() {
    $('#modal-loading').show();
    $('#modal-content').hide();
    $('#modal-success').hide();
}

function showModalContent() {
    $('#modal-loading').hide();
    $('#modal-content').show();
    $('#modal-success').hide();
}

function showModalSuccess() {
    $('#modal-loading').hide();
    $('#modal-content').hide();
    $('#modal-success').show();
}