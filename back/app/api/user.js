var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var TestProject = mongoose.model('TestProject');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var middleware = require('./middleware');

module.exports = function(app, passport) {

  //Generate JSON Web Token
  function createJWT(user) {
    var payload = {
      sub: user._id,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix()
    };
    return jwt.encode(payload, 'blablablaladoscuro'); }

  //me
  app.get('/api/me', middleware.ensureAuthenticated, function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  });

  //Get all users
  app.get('/api/user', middleware.ensureAuthenticated, function(req, res) {
    User.find({}, function(err, users) {
      if(err){
          console.log(err);
        }
        else{
          if (users) {
            res.send(users);
          }else{
            return res.status(500).send({ message: 'Users not found' });
          };
        }
    });
  });

  //add a new user
  app.put('/api/user', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({ name: req.body.newUser.name }, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (user) {
            return res.status(500).send({ message: 'User already exists' });
          }else{
            //find testproject selected
            TestProject.findOne({_id: req.body.newUser.defaultTestProject},function(err, tpj) {
              if(err){
                  return res.status(500).send({ message: 'Error finding testproject' });
                }
                else{
                  if (tpj) {
                    var newUser = new User({
                      name: req.body.newUser.name,
                      password: req.body.newUser.password,
                      firstName: req.body.newUser.firstName,
                      lastName: req.body.newUser.lastName,
                      email: req.body.newUser.email,
                      role: req.body.newUser.role,
                      defaultTestProject: tpj._id
                    });
                    newUser.save(function(err, result) {
                      if (err) {
                        res.status(500).send({ message: err.message });
                      }
                      return res.send("succesfully saved");
                    });
                  }else{
                    return res.status(500).send({ message: 'Test project not found' });
                  };
                }
            });
          };
        }

    });
  });

  //update a user
  app.post('/api/user/:id', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (!user) {
            return res.status(500).send({ message: "User doesn't exists" });
          }else{
            user[req.body.field] = req.body.newValue;
            User.findOneAndUpdate({_id:req.params.id}, user, {upsert:true}, function(err, doc){
                if (err) res.status(500).send({ message: err.message });
                return res.send("succesfully saved");
            });
          };
        }
    });
  });

  //delete a test plan
  app.delete('/api/user/:id', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (user) {
            user.remove(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully deleted");
            });
          }else{
            return res.status(500).send({ message: "User doesn't exists" });
          };
        }
    });
  });

  app.get('/ping',  function(req, res) {
      res.send("ok");
  });


  //login
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

  //singup
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
