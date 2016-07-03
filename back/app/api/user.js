var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var middleware = require('./middleware');

module.exports = function(app, passport) {

  /*
   |--------------------------------------------------------------------------
   | Generate JSON Web Token
   |--------------------------------------------------------------------------
   */
  function createJWT(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    };
    return jwt.encode(payload, 'blablablaladoscuro'); }

  /*
   |--------------------------------------------------------------------------
   | GET /api/me
   |--------------------------------------------------------------------------
   */
  app.get('/api/me', middleware.ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  });

  app.get('/ping',  function(req, res) {
      res.send("ok");
  });


  /*
   |--------------------------------------------------------------------------
   | Log
   |--------------------------------------------------------------------------
   */
  app.post('/auth/login', function(req, res) {
    User.findOne({ name: req.body.name }, '+password', function(err, user) {
      if (!user) {
        return res.status(401).send({ message: 'Invalid user and/or password' });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Invalid user and/or password' });
        }
        res.send({ token: createJWT(user) });
      });
    });
  });

  /*
   |--------------------------------------------------------------------------
   | Create Email and Password Account
   |--------------------------------------------------------------------------
   */
  app.post('/auth/signup', function(req, res) {
    User.findOne({ name: req.body.name }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Name is already taken' });
      }
      var user = new User({
        name: req.body.name,
        password: req.body.password
      });
      user.save(function(err, result) {
        if (err) {
          res.status(500).send({ message: err.message });
        }
        res.send({ token: createJWT(result) });
      });
    });
  });


};
