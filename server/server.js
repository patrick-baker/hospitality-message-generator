const express = require('express');
const bodyParser = require('body-parser');
const companies = require('./modules/Companies.json');
const guests = require('./modules/Guests.json')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/guestInfo', (req, res) => {
    res.send(guests);
})

app.get('/getCurrentTime', (req, res) => {
    res.send({"currentTimeStampInHours": getCurrentTime()});
});

getCurrentHourOfDay = () => {
    let date = new Date();
    // returns hours in central time
    return date.getHours();
}

app.listen(PORT, () => {
    console.log(`Up and running on PORT: ${PORT}`);
});