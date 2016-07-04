var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user.js');

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
console.log("Bootstrap done");
