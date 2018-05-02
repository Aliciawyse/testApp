var express = require('express');
var router = express.Router();
var request = require('request');

/* GET people listing. */
router.get('/peoplelist', function(req, res) {

    request({
        method: 'GET',
        uri: 'https://api.salesloft.com/v2/people.json',
        headers: {'Authorization': 'Bearer ' + process.env.API_PASSWORD}
    }, function (error, response, body){

        if(!error && response.statusCode == 200){
            res.render('people', {peoplelist: JSON.parse(body).data});
        }
    })
});

module.exports = router;
