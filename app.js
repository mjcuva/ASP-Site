var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Added includes 
var mongoose = require('mongoose');
var config = require('./config/config');

// Include Models Here
require('./models/user');
require('./models/module');
require('./models/pnm');
require('./models/image');
require('./models/post');

// Include API Endpoints
var usersAPI = require('./api/users');
var loginAPI = require('./api/login');
var modulesAPI = require('./api/modules');
var pnmAPI = require('./api/pnms');
var imageAPI = require('./api/images');
var postAPI = require('./api/posts');

var uristring = config.MONGO_MAIN;

// Database connection
mongoose.connect(uristring, function(err, res){
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connecting to: ' + uristring);
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Register API Endpoints
app.use('/api/users', usersAPI);
app.use('/api/login', loginAPI);
app.use('/api/modules', modulesAPI);
app.use('/api/pnms', pnmAPI);
app.use('/api/images', imageAPI);
app.use('/api/posts', postAPI);

// Catchall so Angular can do the rest of the routing
app.all("/*", function(req, res, next) {

  res.sendFile("index.html", { root: __dirname + "/views" });
        
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
