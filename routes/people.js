// ==============================================================================
// DEPENDENCIES
// ==============================================================================
var express = require('express');
var router = express.Router();
var request = require('request');

// ===============================================================================
// ROUTING
// ===============================================================================
router.get('/peoplelist', function(req, res) {

    // API GET Requests
    // Below code handles when users visit http://localhost:3000/people/peoplelist
    // They will see the JSON response from hitting SalesLoft's /v2/people.json endpoint

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