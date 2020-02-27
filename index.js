const express = require('express')
const request = require('request')
var path = require('path');
var cors = require('cors');

const app = express()
const port = 3000

const apikey = "2276454694917418ea5bacdffa49e101";
var debug = false;

app.use(cors());
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/getWeather', (req, res) => {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var getCity = req.query.getCity;

    if (getCity != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&appid=" + apikey;
    }

    if (lat != null && lon != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    }

    if (getCity != null && lat != null || getCity != null && lat != null || getCity != null && lat != null && lon != null) {
        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + getCity + "&appid=" + apikey;
    }

    var options = {
        uri: url
    };

    request.post(options, function(error, response, body) {
        if (!error) {

            if (debug) {
                console.log("\n::: Response from Weather Api :::\n");
                console.log(body);
                console.log("\n::: ------------------------- :::\n");
            }

            res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': body.length });
            res.write(body);
            res.end();
        } else
            console.log("erroror Occured: " + error);
    });
});


app.listen(port, () => console.log(`App is listening on  http://localhost:${port}`));