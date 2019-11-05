var express = require('express');
var app = express();
var fs = require("fs");
var https = require("https");

const APP_ID = process.env['app_id'];
const APP_CODE = process.env['app_code'];

app.get('/geocoder', function (req, res) {
        let url = "https://geocoder.api.here.com/6.2/geocode.json" + 
                    "?app_id=" + APP_ID + 
                    "&app_code=" + APP_CODE + 
                    "&searchtext=425+W+Randolph+Chicago";

            https.get(url, (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('Printing Data...' + data)
            var response = "<h1> Geocoder Response using App Credentials </h1></p>" + 
                            "APP_ID: " + APP_ID + "</p>" +
                            "APP_CODE: " + APP_CODE + "</p>" +
                            "URL: <a href=\'" + url + "\'>" + url + "</a> </p>" + 
                            "RESPONSE: </p> " + data
            res.send(response)
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
})

var server = app.listen(8083, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})