const express = require('express')
const request = require('request')
var path = require('path');
var cors = require('cors');

const app = express()
const port = 3000

var viewsDir = path.join(__dirname);

const apikey = "2276454694917418ea5bacdffa49e101";
var debug = false;
var requestsCount = 0;

app.use(cors());
app.use(express.static(viewsDir));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(viewsDir, '/public/index.html'));
});

app.get('/getWeather', (req, res) => {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;

    var options = {
        url: url
    };

    request.post(options, function(error, response, body) {
        if (!error) {
            requestsCount++;
            console.log("API Called " + requestsCount + " time (s)");

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

app.listen(port, () => console.log(`App is listening on port ${port}!`));