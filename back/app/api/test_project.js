var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('jwt-simple');
var middleware = require('./middleware');
var TestProject = mongoose.model('TestProject');

module.exports = function(app, passport) {

  //Get the projects
  app.get('/api/testProject', middleware.ensureAuthenticated, function(req, res) {
    TestProject.find({}, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            res.send(tp);
          }else{
            res.send([]);
          };
        }
    });
  });


};
  //find a string in Activity
/*  app.get('/api/activity/findByDescriptionOrName/:descriptionOrName', middleware.ensureAuthenticated, function (req,res){
    var descriptionOrName = req.params.descriptionOrName;
    //Activity.find({$or:[{'name': descriptionOrName },{'description': descriptionOrName}]}, function(err, activities) {
    Activity.find({$or:[{'name': new RegExp(descriptionOrName, 'i')},{'description': new RegExp(descriptionOrName, 'i')}]}, function(err, activities) {
      if (activities) {
        res.send(activities);
      }else{
        res.send([]);
      };
    });

  });
};*/
