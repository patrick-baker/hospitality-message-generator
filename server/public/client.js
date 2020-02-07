$(document).ready(onReady);

function onReady() {
    getGuestInfo();
    getCompanyInfo();
    getTemplateInfo();
    getCurrentTime();
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

// appends guest, company, and template info to corresponding dropdown
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
    // initializes above declared variables for ajax request
        // shows the name value of the data variable when a dropdown value is chosen
    // console.log($(this).data().name);
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
        })
    }
        // logs the variables to be used in ajax request
    console.log(guestId, templateId, companyId);
}


function getCurrentTime() {
    $.ajax({
        url: '/getCurrentTime',
        method: 'GET'
    }).then(function (response) {
        $("#timestamp").text(response.currentTimeStampInHours);
    })
}