// ===============================================================================
// DEPENDENCIES
// ===============================================================================
var express = require('express');
var router = express.Router();


// ===============================================================================
// ROUTING
// HTML GET Request. The code below handles when users visit our home page
// The user is shown the index.jade template
// ===============================================================================

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
