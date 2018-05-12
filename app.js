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
// This sets up the basic properties for our express server
// ==============================================================================
var app = express();

// app configuration
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ================================================================================
// ROUTER
// The code below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

var indexRouter = require('./routes/index');
var peopleRouter = require('./routes/people');

app.use('/', indexRouter);
app.use('/people', peopleRouter);

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

module.exports = app;
