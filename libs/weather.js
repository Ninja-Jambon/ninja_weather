require('dotenv').config();
http = require('http');

async function getWeather(city) {
    return new Promise((resolve, reject) => {
        url = "http://api.weatherapi.com/v1/current.json?key=" + process.env.WEATHERAPIKEY + "&q=" + city

        http.get(url, res => {
            let data = [];

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', function () {
                var response = JSON.parse(Buffer.concat(data).toString());
                resolve(response);
            });

            res.on('error', err => {
                reject(err);
            });
        });
    });
}

module.exports = { getWeather };