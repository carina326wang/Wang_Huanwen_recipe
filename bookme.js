var Reservation = Parse.Object.extend("Reservation");

function queryReservationsForDay(day, successCallback) {
    var query = new Parse.Query(Reservation);
    query.equalTo("date", new Date('Jan ' + day + ', 2015 08:00 GMT+08:00'));
    query.find({
        success: successCallback,
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function refreshCalendarReservations() {
    queryAllReservations(function(reservations) {
        for (var i = 0; i < reservations.length; i++) {
            var reservation = reservations[i];

            var day = reservation.get('date').getUTCDate();
            var meal = reservation.get('meal');
            var mealIndex;
            if (meal == 'lunch') {
                mealIndex = 0;
            } else if (meal == 'afternoonTea') {
                mealIndex = 1;
            } else if (meal == 'dinner') {
                mealIndex = 2;
            }

            var $mealImg = $('.availability[data-day=' + day + '] img').eq(mealIndex);
            $mealImg.unbind('click');
            $mealImg.css('opacity', 0.2);
        }
    });
}

function queryAllReservations(successCallback) {
    var query = new Parse.Query(Reservation);
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
    reservation.set("date", new Date('Jan ' + day + ', 2015 08:00 GMT+08:00'));
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