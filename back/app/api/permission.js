var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var request = require('request');
var moment = require('moment');
var jwt = require('jwt-simple');
var middleware = require('./middleware');

module.exports = function(app, passport) {


  //Get the permission associated to an user, a test project and a component
  app.get('/api/permission/:pjtId/:component', middleware.ensureAuthenticated, function(req, res) {

    var defaultNoneRolePermissions = {testManagementView: false, testManagementEdit: false,
                  testPlanView: false, testPlanEdit: false, testPlanRun: false,
                  userManagementView: false, userManagementEdit: false
                };

    //Get current user
    User.findById(req.user, function(err, user) {

      if (err) return res.status(500).send({ message: err });
      if (!user) return res.status(500).send({ message: 'User not found' });
      if (user.roleInProject === undefined) return res.status(500).send({ message: 'User hasnt projects associated' });

      var roleId = undefined;
      var pjtId;
      if (req.params.pjtId === "-"){
        pjtId = user.defaultTestProject;
      }else{
        pjtId = req.params.pjtId;
      }

      //Get the role associated pjtId param
      user.roleInProject.forEach(function (role){
        if (role.project.equals(pjtId)){
          roleId = role.role;
        }
      });
      if (roleId === undefined) return res.status(500).send({ message: 'The project test hasnt associted any role for this user' });

      //Get permissions
      Role.findById(roleId, function (err, role){
        if (err) return res.status(500).send({ message: err });
        if (!role) return res.status(500).send({ message: 'Role associated to this project test not exist' });
        if (role.permissions === undefined) return res.status(500).send({ message: 'Role associated to this project test hasnt permissions' });

        res.send(role.permissions[req.params.component]);
      });
    });
  });


};
