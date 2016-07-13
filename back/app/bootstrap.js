var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var TestProject = require('./models/test-project.js');
var Role = require('./models/role.js');

console.log("Bootstrap init");

TestProject.remove({}).exec();
User.remove({}).exec();
Role.remove({}).exec();

var testProject1 = new TestProject({name: "Test Project 1", prefix: "TP1", description: "Description del test project 1", tmTreeData: "[{label: 'Test Project 1',children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']}]", tpTreeData: ""});
testProject1.save(function(err) {if (err) console.log(err);});

var testProject2 = new TestProject({name: "Test Project 2", prefix: "TP2", description: "Description del test project 2", tmTreeData: "", tpTreeData: ""});
testProject2.save(function(err) {if (err) console.log(err);});


var adminRole = new Role({name:"adminRole",description:"Description role admin"});
adminRole.save(function(err) {if (err) console.log(err);});
var guestRole = new Role({name:"guestRole",description:"Description role guest"});
guestRole.save(function(err) {if (err) console.log(err);});

var admin = new User({
  name: "admin",
  password: "admin",
  firstName: "Admin",
  lastName: "Garcia",
  email: "adim@admin.es",
  roleInProject: [],
  isAdmin: true,
  defaultTestProject: testProject1._id,
});
admin.roleInProject.push({project: testProject1._id, role: adminRole._id});
admin.roleInProject.push({project: testProject2._id, role: guestRole._id});
admin.save(function(err) {if (err) console.log(err);});

var guest = new User({
  name: "guest",
  password: "guest",
  firstName: "Guest",
  lastName: "Martinez",
  email: "guest@admin.es",
  roleInProject: [],
  isAdmin: false,
  defaultTestProject: testProject2._id,
});
guest.roleInProject.push({project: testProject1._id, role: guestRole._id});
guest.roleInProject.push({project: testProject2._id, role: guestRole._id});
guest.save(function(err) {if (err) console.log(err);});


console.log("Bootstrap done");
