var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var TestProject = require('./models/test_project.js');

console.log("Bootstrap init");
User.find({name : "admin"}, function (err, user) {
  if (!user.length){
    var admin = new User({
      name: "admin",
      password: "admin",
      isAdmin: true
    });
    admin.save(function(err) {if (err) console.log(err);});
  }
});
var testProject1 = new TestProject({name: "Test Project 1", prefix: "TP1", description: "Description del test project 1", testManagementTree: "", testPlanTree: ""});
testProject1.save(function(err) {if (err) console.log(err);});
console.log("Bootstrap done");
