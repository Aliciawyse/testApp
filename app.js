// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


// ==============================================================================
// EXPRESS CONFIGURATION
// The code below creates the app object, sets up some middleware and our view engine
// ==============================================================================
var app = express();

// app configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ================================================================================
// ROUTER
// The code below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// modules from the routes directory
var indexRouter = require('./routes/index');
var peopleRouter = require('./routes/people');

// these paths are treated as prefixes to the routes defined.
app.use('/', indexRouter);
app.use('/people', peopleRouter);


// ================================================================================
// The code below is additional middleware for error handling.
// ================================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ================================================================================
// With the app object configured, we export it.
// ================================================================================

module.exports = app;
