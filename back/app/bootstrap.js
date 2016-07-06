var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');
var TestProject = require('./models/test_project.js');

console.log("Bootstrap init");

var testProject1 = new TestProject({name: "Test Project 1", prefix: "TP1", description: "Description del test project 1", tmTreeData: "[{label:'Animal',children:[{label:'Dog',data:{description:'mans best friend'}},{label:'Cat',data:{description:'Felis catus'}},{label:'Hippopotamus',data:{description:'hungry, hungry'}},{label:'Chicken',children:['WhiteLeghorn','RhodeIslandRed','JerseyGiant']}]},{label:'Vegetable',data:{definition:'A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean},onSelect:function(branch){return$scope.output='Vegetable: '+branch.data.definition;},children:[{label:'Oranges'},{label:'Apples',children:[{label:'GrannySmith',onSelect:apple_selected},{label:'RedDelicous',onSelect:apple_selected},{label:'Fuji',onSelect:apple_selected}]}]},{label:'Mineral',children:[{label:'Rock',children:['Igneous','Sedimentary','Metamorphic']},{label:'Metal',children:['Aluminum','Steel','Copper']},{label:'Plastic',children:[{label:'Thermoplastic',children:['polyethylene','polypropylene','polystyrene','polyvinylchloride']},{label:'ThermosettingPolymer',children:['polyester','polyurethane','vulcanizedrubber','bakelite','urea-formaldehyde']}]}]}]", tpTreeData: ""});
testProject1.save(function(err) {if (err) console.log(err);});

var testProject2 = new TestProject({name: "Test Project 2", prefix: "TP2", description: "Description del test project 2", tmTreeData: "", tpTreeData: ""});
testProject2.save(function(err) {if (err) console.log(err);});

User.find({name : "admin"}, function (err, user) {
  if (!user.length){
    var admin = new User({
      name: "admin",
      password: "admin",
      isAdmin: true,
      defaultTestProject: testProject1._id,
    });
    admin.save(function(err) {if (err) console.log(err);});
  }
});

console.log("Bootstrap done");
