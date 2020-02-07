$(document).ready(onReady);

function onReady() {
    getGuestInfo();
    getCurrentTime();
}

function getGuestInfo() {
    $.ajax({
        url: '/guestInfo',
        method: 'GET'
    }).then(function (response) {
        appendGuestInfo(response);
    })
}

function getCurrentTime() {
    $.ajax({
        url: '/getCurrentTime',
        method: 'GET'
    }).then(function (response) {
        $("#timestamp").text(response.currentTimeStampInHours);
    })
}

function appendGuestInfo(array) {
    $("#guest-info").empty();
    // returns out of function if array is empty
    if (array.length === 0) {
        return;
    }
    array.forEach(function (guest) {
        $("#guest-info").append(
            `<li>${guest.id}: ${guest.firstName} ${guest.lastName}</li><br>`
        );
    });
}