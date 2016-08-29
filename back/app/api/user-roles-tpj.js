var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var TestProject = mongoose.model('TestProject');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var middleware = require('./middleware');

module.exports = function(app, passport) {


  //Get all users with roles
  app.get('/api/userRolesTpj', middleware.ensureAuthenticated, function(req, res) {
    User.find({}, function(err, users) {
      if(err){
          console.log(err);
        }
        else{
          if (users) {
            var result = [];
            users.forEach(function(user){
              user.roleInProject.forEach(function(pjRole){
                result.push({id:pjRole._id, userId:user._id, user:user.name, project:pjRole.project, role:pjRole.role});
              });
            });
            res.send(result);
          }else{
            res.send([]);
          };
        }
    });
  });

  //Get all roles of user
  app.get('/api/userRolesTpjByUserId/:idUser', middleware.ensureAuthenticated, function(req, res) {
    User.find({_id: req.params.idUser}, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (user) {
            var result = [];
            user.forEach(function(user){
              user.roleInProject.forEach(function(pjRole){
                result.push({id:pjRole._id, userId:user._id, user:user.name, project:pjRole.project, role:pjRole.role});
              });
            });
            res.send(result);
          }else{
            res.send([]);
          };
        }
    });
  });

  //delete a test plan
  app.delete('/api/userRolesTpj/:idUser/:idTpjRole', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.params.idUser}, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (user) {
            for (var i in user.roleInProject) {
                 if (user.roleInProject[i]._id == req.params.idTpjRole) {
                    user.roleInProject.splice(i,1);
                    break; //Stop this loop, we found it!
                 }
               }

            user.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully saved");
            });
          }else{
            return res.status(500).send({ message: "User doesn't exists" });
          };
        }
    });
  });

  //update a role-tpj in user
  app.post('/api/userRolesTpj/:idUser/:idTpjRole', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({_id: req.params.idUser}, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (!user) {
            return res.status(500).send({ message: "User doesn't exists" });
          }else{

            for (var i in user.roleInProject) {
                 if (user.roleInProject[i]._id == req.params.idTpjRole) {
                    user.roleInProject[i][req.body.field] = req.body.newValue;
                    break; //Stop this loop, we found it!
                 }
               }

            user.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully saved");
            });
          };
        }
    });
  });

  //add a new user
  app.put('/api/userRolesTpj', middleware.ensureAuthenticated, function(req, res) {
    User.findOne({ _id: req.body.newUserTpjRole.name }, function(err, user) {
      if(err){
          console.log(err);
        }
        else{
          if (!user) {
            return res.status(500).send({ message: 'User not exist' });
          }else{
            user.roleInProject.push({project: req.body.newUserTpjRole.project, role: req.body.newUserTpjRole.role});
            user.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully saved");
            });
          };
        }

    });
  });


};
