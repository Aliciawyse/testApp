// load express module
var express = require('express');
// use express module to get an express.Router object which we specify a route on
var router = express.Router();


// ===============================================================================
// ROUTING
// The route defines a callback that will be invoked whenever an HTTP GET request with the correct pattern is detected. This route will be used when a URL of / is received. The route renders a response using the template `index.jade`
// ============================================================================

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
