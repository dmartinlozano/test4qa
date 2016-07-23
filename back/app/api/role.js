var express = require('express');
var mongoose = require('mongoose');
var Role = mongoose.model('Role');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var middleware = require('./middleware');

module.exports = function(app, passport) {


  //Get all roles
  app.get('/api/role', middleware.ensureAuthenticated, function(req, res) {
    Role.find({}, function(err, roles) {
      if(err){
          console.log(err);
        }
        else{
          if (roles) {
            res.send(roles);
          }else{
            return res.status(500).send({ message: 'Roles not found' });
          };
        }
    });
  });

  //Get role by id
  app.get('/api/role/:id', middleware.ensureAuthenticated, function(req, res) {
    Role.findOne({_id:req.params.id}, function(err, role) {
      if(err){
          console.log(err);
        }
        else{
          if (role) {
            res.send(role);
          }else{
            return res.status(500).send({ message: 'Role not found' });
          };
        }
    });
  });

  //add a new role
  app.put('/api/role', middleware.ensureAuthenticated, function(req, res) {
    Role.findOne({ name: req.body.newRole.name }, function(err, role) {
      if(err){
          console.log(err);
        }
        else{
          if (role) {
            return res.status(500).send({ message: 'Role already exists' });
          }else{
            var newRole = new Role({
              name: req.body.newRole.name,
              description: req.body.newRole.description,
              isAdmin: req.body.newRole.isAdmin,
              permissions: req.body.newRole.permissions
            });
            newRole.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully saved");
            });
          };
        }
    });
  });

  //update a role
  app.post('/api/role/:id', middleware.ensureAuthenticated, function(req, res) {
    Role.findOne({_id: req.params.id}, function(err, role) {
      if(err){
          console.log(err);
        }
        else{
          if (!role) {
            return res.status(500).send({ message: "Role doesn't exists" });
          }else{
            role[req.body.field] = req.body.newValue;
            Role.findOneAndUpdate({_id:req.params.id}, role, {upsert:true}, function(err, doc){
                if (err) res.status(500).send({ message: err.message });
                return res.send("succesfully saved");
            });
          };
        }
    });
  });

  //delete a role
  app.delete('/api/role/:id', middleware.ensureAuthenticated, function(req, res) {
    Role.findOne({_id: req.params.id}, function(err, role) {
      if(err){
          console.log(err);
        }
        else{
          if (role) {
            role.remove(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully deleted");
            });
          }else{
            return res.status(500).send({ message: "Role doesn't exists" });
          };
        }
    });
  });

};
