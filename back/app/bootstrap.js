var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var TestProject = require('./models/test-project.js');

console.log("Bootstrap init");

TestProject.findOne({name:"Test Project 1"}).remove().exec();
TestProject.findOne({name:"Test Project 2"}).remove().exec();
User.findOne({name:"admin"}).remove().exec();

var testProject1 = new TestProject({name: "Test Project 1", prefix: "TP1", description: "Description del test project 1", tmTreeData: "[{label: 'Test Project 1',children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']}]", tpTreeData: ""});
testProject1.save(function(err) {if (err) console.log(err);});

var testProject2 = new TestProject({name: "Test Project 2", prefix: "TP2", description: "Description del test project 2", tmTreeData: "", tpTreeData: ""});
testProject2.save(function(err) {if (err) console.log(err);});

var admin = new User({
  name: "admin",
  password: "admin",
  firstName: "Admin",
  lastName: "Garcia",
  email: "adim@admin.es",
  isAdmin: true,
  defaultTestProject: testProject1._id,
});
admin.save(function(err) {if (err) console.log(err);});

console.log("Bootstrap done");
