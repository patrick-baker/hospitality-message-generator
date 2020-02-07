$(document).ready(onReady);

function onReady() {
    getGuestInfo();
    getCompanyInfo();
    getTemplateInfo();
    // descendent selector to run the createMessage function when a dropdown item is selected
    $(".dropdown-content").on("click", ".dropdown-item", createMessage);
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showOptions(dropDownSelector) {
    // closes all other dropdowns when user chooses one dropdown
    closeDropdowns();
    $(`#${dropDownSelector}`).toggleClass("show");
  }
  
// Close the dropdown menu
function closeDropdowns() {
    let dropdowns = $(".dropdown-content");
    // loops through dropdowns and closes them if they are open
    for (let i = 0; i < dropdowns.length; i++) {
        if ($(dropdowns[i]).hasClass('show')) {
          $(dropdowns[i]).removeClass('show');
        }
    }
}

// runs close dropdown function if user clicks anywhere on the window other than the dropdowns
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      this.closeDropdowns();
    }
  }
  
// retrieves guest info on page load
function getGuestInfo() {
    $.ajax({
        url: '/guestInfo',
        method: 'GET'
    }).then(function (response) {
        appendInfo("guestName", response);
    })
}

// retrieves company info on page load
function getCompanyInfo() {
    $.ajax({
        url: '/companyInfo',
        method: 'GET'
    }).then(function (response) {
        appendInfo("companyName", response);
    })
}

// retrieves template info on page load
function getTemplateInfo() {
    $.ajax({
        url: '/templateInfo',
        method: 'GET'
    }).then(function (response) {
        appendInfo("templateType", response);
    })
}

// appends guest, company, and template info to corresponding dropdowns
function appendInfo(targetElement, array) {
    $(`#${targetElement}`).empty();
    if (targetElement === "guestName") {
        array.forEach(function (guest) {
            $(`#guestName`).append( `<p class="dropdown-item" data-id = ${guest.id} data-name = ${targetElement}>${guest.firstName}</p><br>` );
        });
    } else if (targetElement === "companyName") {
        array.forEach(function (company) {
            $(`#companyName`).append( `<p class="dropdown-item" data-id = ${company.id} data-name = ${targetElement}>${company.company}</p><br>` );
        });
    } else if (targetElement === "templateType") {
        array.forEach(function (template) {
            $(`#templateType`).append( `<p class="dropdown-item" data-id = ${template.id} data-name = ${targetElement}>${template.type}</p><br>` );
        });
    }
}

// declares variables for use in message Creation ajax request
let guestId;
let companyId;
let templateId;

function createMessage () {
    // shows the name value of the data variable when a dropdown value is chosen
    // console.log($(this).data().name);

    // initializes above declared variables for ajax request
    if ($(this).data().name === "companyName") {
        companyId = $(this).data().id;
    } else if ($(this).data().name === "templateType") {
        templateId = $(this).data().id;
    }
    else if ($(this).data().name === "guestName") {
        guestId = $(this).data().id;
    }

    // creates GET request once these three variables are initialized
    if (guestId && companyId && templateId) {
        $.ajax({
            url: '/createMessage',
            method: 'POST',
            data: {
                guestId: guestId,
                companyId: companyId,
                templateId: templateId
            }
        }).then(function (response) {
            // console.log(response);
            // creates message from server response and appends it to the DOM
            appendMessage(response);
        })
    }
        // logs the variables to be used in ajax request
    // console.log(guestId, templateId, companyId);
}

function appendMessage (data) {
    // all of the relevant variables for message template from the server response
    let greeting = data.greeting;
    let guestName = data.guest.firstName;
    let roomNumber = data.guest.reservation.roomNumber;
    let companyName = data.company.company;
    let companyCity = data.company.city;
    let intro = data.template.introduction;
    let body = data.template.message;
    let requiresHotelName = data.template.requiresHotelName;
    let requiresRoomNumber = data.template.requiresRoomNumber;
    let requiresLocation = data.template.requiresLocation;

    let customizedMessage;
    // message template for departure, I chose to use these booleans instead of simply the template.type 
    //so that they can cover more template types in the future without having to specify for every one
    if (requiresHotelName && requiresLocation && !requiresRoomNumber) {
        customizedMessage = `${greeting} ${guestName}! ${intro} ${companyName}. ${body} ${companyCity}!`;
    // message template for checking up
    } else if (requiresHotelName && !requiresLocation && !requiresRoomNumber) {
        customizedMessage = `${greeting} ${guestName}! ${intro} ${companyName}. ${body}`;
    // message template for arrival
    } else if (requiresHotelName && requiresLocation && requiresRoomNumber) {
        customizedMessage = `${greeting} ${guestName}! ${intro} ${companyName}. Room ${roomNumber} ${body} ${companyCity}!`;
    }
    
    // sets the text field on the DOM to customized message
    $("#customizedMessage").text(customizedMessage);
}
