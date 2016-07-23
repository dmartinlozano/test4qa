var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var TestProject = require('./models/test-project.js');
var Role = require('./models/role.js');

console.log("Bootstrap init");

TestProject.remove({}).exec();
User.remove({}).exec();
Role.remove({}).exec();

var testProject1 = new TestProject({name: "Test Project 1", prefix: "TP1", currentTcNumber: 1, description: "Description del test project 1", tpTreeData: "", priorities: "Alta,Media,Baja", status:"ok,failed"});
testProject1.save(function(err) {if (err) console.log(err);});
testProject1.tmTreeData =  "[{label: 'Test Project 1', type: 'tpj',  _id: '" +  testProject1._id + "', children: []}]";
testProject1.save(function(err) {if (err) console.log(err);});

var testProject2 = new TestProject({name: "Test Project 2", prefix: "TP2", currentTcNumber: 1, description: "Description del test project 2", tpTreeData: "", priorities: "Alta,Media,Baja", status:"ok,failed"});
testProject2.save(function(err) {if (err) console.log(err);});
testProject2.tmTreeData =  "[{label: 'Test Project 2', type: 'tpj',  _id: '" +  testProject2._id + "', children: []}]";
testProject2.save(function(err) {if (err) console.log(err);});


var adminRole = new Role({name:"adminRole",description:"Description role admin", isAdmin: true});
adminRole.permissions={testManagementView: true, testManagementEdit: true,
                testPlanView: true, testPlanEdit: true, testPlanRun: true,
                userManagementView: true, userManagementEdit: true
              };
adminRole.save(function(err) {if (err) console.log(err);});

var guestRole = new Role({name:"guestRole",description:"Description role guest", isAdmin: false});
guestRole.permissions={testManagementView: true, testManagementEdit: false,
                testPlanView: true, testPlanEdit: false, testPlanRun: false,
                userManagementView: true, userManagementEdit: false
              };
guestRole.save(function(err) {if (err) console.log(err);});

var noneRole = new Role({name:"noneRole",description:"Description role none", isAdmin: false});
noneRole.permissions={testManagementView: false, testManagementEdit: false,
                testPlanView: false, testPlanEdit: false, testPlanRun: false,
                userManagementView: false, userManagementEdit: false
              };
noneRole.save(function(err) {if (err) console.log(err);});

var admin = new User({
  name: "admin",
  password: "admin",
  firstName: "Admin",
  lastName: "Garcia",
  email: "adim@admin.es",
  roleInProject: [],
  defaultTestProject: testProject1._id,
});
admin.roleInProject.push({project: testProject1._id, role: adminRole._id});
admin.roleInProject.push({project: testProject2._id, role: adminRole._id});
admin.save(function(err) {if (err) console.log(err);});

var guest = new User({
  name: "guest",
  password: "guest",
  firstName: "Guest",
  lastName: "Martinez",
  email: "guest@admin.es",
  roleInProject: [],
  defaultTestProject: testProject2._id,
});
guest.roleInProject.push({project: testProject1._id, role: guestRole._id});
guest.roleInProject.push({project: testProject2._id, role: noneRole._id});
guest.save(function(err) {if (err) console.log(err);});


console.log("Bootstrap done");
