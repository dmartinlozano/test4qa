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

  //Get the projects
  app.get('/api/testProject/:id', middleware.ensureAuthenticated, function(req, res) {
    //TestProject.find({_id: mongoose.Schema.ObjectId(req.params.id)},function(err, tp) {
    TestProject.findOne({_id: req.params.id},function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            res.send(tp);
          }else{
            res.send({});
          };
        }
    });
  });
};
