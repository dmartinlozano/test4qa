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

  //add a new test project
  app.put('/api/testProject', function(req, res) {
    TestProject.findOne({ name: req.body.name }, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            return res.status(500).send({ message: 'Project already exists' });
          }else{
            var newTP = new TestProject({
              name: req.body.name,
              prefix: req.body.prefix,
              description: req.body.description
            });
            newTP.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              return res.send("succesfully saved");
            });
          };
        }

    });
  });


  //update a field
  app.post('/api/testProject/:id', function(req, res) {
    TestProject.findOne({_id: req.params.id}, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (!tp) {
            return res.status(500).send({ message: "Project doesn't exists" });
          }else{
            tp[req.body.field] = req.body.newValue;
            TestProject.findOneAndUpdate({_id:req.params.id}, tp, {upsert:true}, function(err, doc){
                if (err) res.status(500).send({ message: err.message });
                return res.send("succesfully saved");
            });
          };
        }

    });
  });
};
