var express = require('express');
var mongoose = require('mongoose');
var TestProject = mongoose.model('TestProject');
var TestSuite = mongoose.model('TestSuite');
var TestCase = mongoose.model('TestCase');
var request = require('request');
var middleware = require('./middleware');

module.exports = function(app, passport) {

  //Get all roles
  app.post('/api/find/', middleware.ensureAuthenticated, function(req, res) {
    var result = [];
    //TODO Error, la busqueda en el testProject debe ser por id del test project
    //Así, se busca en todos los test project, sólo deberían ser los que se esta buscando ahora
    TestProject.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
      docs.forEach(function(item){
        result.push(item);
      });
      TestSuite.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
        docs.forEach(function(item){
          result.push(item);
        });
      });
          TestCase.find({$text: {$search: req.body.searchString}}).exec(function(err, docs) {
            docs.forEach(function(item){
              result.push(item);
            });
            res.send(result);
          });
    });
  });

};
