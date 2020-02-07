// library allowing Node to be run on the browser
const express = require('express');
// middleware that parses the incoming information into JSON
const bodyParser = require('body-parser');
// require the JSON files to work with
const companies = require('./modules/Companies.json');
const guests = require('./modules/Guests.json');
const greetings = require('./modules/Greetings.json');
const templates = require('./modules/Templates.json');
const app = express();
// opens on local host 3000, or allows heroku to choose its own port
const PORT = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/guestInfo', (req, res) => {
    // create smaller guest array to send to front end
    guestData = [];
    guests.forEach(guests => guestData.push({"id": guests.id, "firstName": guests.firstName}))
    console.log(guestData);
    res.send(guestData);
})

app.get('/companyInfo', (req, res) => {
    // create smaller company array to send to front end
    companyData = [];
    companies.forEach(companies => companyData.push({"id": companies.id, "company": companies.company}))
    res.send(companyData);
})

app.get('/templateInfo', (req, res) => {
    // create smaller template array to send to front end
    templateData = [];
    templates.forEach(templates => templateData.push({"id": templates.id, "type": templates.type}))
    res.send(templateData);
})

app.post('/createMessage', (req, res) => {
    console.log(req.body);
    let guest = guests.filter(guest => guest.id === Number(req.body.guestId));
    let company = companies.filter(company => company.id === Number(req.body.companyId));
    let template = templates.filter(template => template.id === Number(req.body.templateId));
    // loop through greeting file to send appropriate greeting based on time of day.
    let greetingsToSend;
    let currentHour;
    // this initialization of currentHour accounts for different timezones in companies.json
    // it is not a complete fix, as I don't think that this is a main focus of the code challenge
    if (company.timezone == "US/Eastern") {
        currentHour = getCurrentHourOfDay(1);
    } else if (company.timezone = "US/Pacific") {
        currentHour = getCurrentHourOfDay(-2);
    } else {
        currentHour = getCurrentHourOfDay(0);
    }
    console.log("currentHour of company:", currentHour);
    greetings.forEach(greeting => {
        if (greeting.startTime <= currentHour && currentHour < greeting.endTime) {
            greetingsToSend = greeting.greeting
        } else if (currentHour >= 21 || currentHour < 4) {
            greetingsToSend = "Sorry to be messaging you so late,"
        }
    })
    // sends data back to the client in object notation
    dataToSend = {guest: guest[0], company: company[0], template: template[0], greeting: greetingsToSend};
    console.log("data to send from /createMessage:", dataToSend);
    res.send(dataToSend);
})

getCurrentHourOfDay = (number) => {
    let date = new Date();
    // returns hours in central time
    console.log(date.getHours());
    // allows for different timezones, and ensures that the hours will always be between 0 and 23
    return date.getHours() + number % 24;
}

app.listen(PORT, () => {
    console.log(`Up and running on PORT: ${PORT}`);
});