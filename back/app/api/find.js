var express = require('express');
var mongoose = require('mongoose');
var TestProject = mongoose.model('TestProject');
var TestSuite = mongoose.model('TestSuite');
var TestCase = mongoose.model('TestCase');
var request = require('request');
var middleware = require('./middleware');

module.exports = function(app, passport) {

  //Get all roles
  app.post('/api/find/:tpjId', middleware.ensureAuthenticated, function(req, res) {
    var result = [];
    TestProject.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
      docs.forEach(function(item){
        //if found, return only for current tpj
        if (item._id.equals(req.params.tpjId)){
          result.push(item);
        }
      });
      TestSuite.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
        docs.forEach(function(item){
            //if found, return only for current tpj
          if (item.tpjId.equals(req.params.tpjId)){
            result.push(item);
          };
        });
      });
          TestCase.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
            docs.forEach(function(item){
                //if found, return only for current tpj
              if (item.tpjId.equals(req.params.tpjId)){
                result.push(item);
              };
            });
            res.send(result);
          });
    });
  });

};
