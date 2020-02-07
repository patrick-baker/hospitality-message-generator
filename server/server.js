const express = require('express');
const bodyParser = require('body-parser');
const companies = require('./modules/Companies.json');
const guests = require('./modules/Guests.json')
const greetings = require('./modules/Greetings.json');
const templates = require('./modules/Templates.json')
const app = express();
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

app.get('/getCurrentTime', (req, res) => {
    res.send({"currentTimeStampInHours": getCurrentTime()});
});

app.post('/createMessage', (req, res) => {
    console.log(req.body);
    guest = guests.filter(guest => guest.id === Number(req.body.guestId));
    company = companies.filter(company => company.id === Number(req.body.companyId));
    template = templates.filter(template => template.id === Number(req.body.templateId));
    dataToSend = {guest: guest, company: company, template: template};
    console.log("data to send from /createMessage:", dataToSend);
    res.send(dataToSend);
})

getCurrentHourOfDay = () => {
    let date = new Date();
    // returns hours in central time
    return date.getHours();
}

app.listen(PORT, () => {
    console.log(`Up and running on PORT: ${PORT}`);
});