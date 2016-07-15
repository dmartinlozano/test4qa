// server.js
var env = process.env.NODE_ENV || 'development';

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var http = require('http');
var app      = module.exports = express();
var port     = process.env.PORT || 9090;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var path 	 = require('path');
var fs		 = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// configuration ===============================================================
mongoose.connect('mongodb://localhost:27017/testingItDB');

	// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// model =======================================================================
var User = require('./app/models/user');
var TestProject = require('./app/models/test-project');
var TestSuite = require('./app/models/test-suite');
var Role = require('./app/models/role');


//Corss validation =============================================================
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	    next();
});
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.send(401, 'invalid token...');
  }
});
// RESTful API =================================================================
require('./app/api/user')(app,passport);
require('./app/api/user-roles-tpj')(app,passport);
require('./app/api/test-project')(app,passport);
require('./app/api/test-suite')(app,passport);
require('./app/api/role')(app,passport);

// bootstrap ===================================================================
if (env === 'development'){
	require('./app/bootstrap.js');
}
app.use(express.static(__dirname + '/'));

// launch ======================================================================
console.log('Server running in port '+port);
app.listen(port);
