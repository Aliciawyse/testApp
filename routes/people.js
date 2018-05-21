// load express module
var express = require('express');
// use express module to get an express.Router object which we specify a route on
var router = express.Router();
var request = require('request');

// ===============================================================================
// ROUTING
//The route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected. This route will be used when a URL of people/peoplelist is received. The route renders a JSON response from hitting SalesLoft's /v2/people.json endpoint
// ===============================================================================
router.get('/peoplelist', function(req, res) {
    request({
        method: 'GET',
        uri: 'https://api.salesloft.com/v2/people.json',
        headers: {'Authorization': 'Bearer ' + process.env.API_PASSWORD}
    }, function (error, response, body){
        if(!error && response.statusCode == 200){
            res.json(body);
        }
    })
});

module.exports = router;