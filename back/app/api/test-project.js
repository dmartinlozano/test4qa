var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var jwt = require('jwt-simple');
var middleware = require('./middleware');
var TestProject = mongoose.model('TestProject');
var TestSuite = mongoose.model('TestSuite');
var TestCase = mongoose.model('TestCase');

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
            return res.status(500).send({ message: 'Projects not found' });
          };
        }
    });
  });

  //Get the projects
  app.get('/api/testProject/:id', middleware.ensureAuthenticated, function(req, res) {
    TestProject.findOne({_id: req.params.id},function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            res.send(tp);
          }else{
            return res.status(500).send({ message: 'Project not found' });
          };
        }
    });
  });

  //add a new test project
  app.put('/api/testProject', middleware.ensureAuthenticated, function(req, res) {
    TestProject.findOne({ name: req.body.testProject.name }, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            return res.status(500).send({ message: 'Project test already exists' });
          }else{
            var newTP = new TestProject({
              name: req.body.testProject.name,
              prefix: req.body.testProject.prefix,
              currentTcNumber: 1,
              priorities: req.body.testProject.priorities,
              status: req.body.testProject.status,
              description: req.body.testProject.description
            });
            newTP.save(function(err, tpjResult) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              tpjResult.tmTreeData = "[{label: '"+req.body.testProject.name+"', type: 'tpj', _id: '" + tpjResult._id + "', children: []}]";
              tpjResult.save(function(err, result) {
                if (err) {
                  res.status(500).send({ message: err.message });
                }
                return res.send("succesfully saved");
              });
            });
          };
        }

    });
  });


  //update a field
  app.post('/api/testProject/:id', middleware.ensureAuthenticated, function(req, res) {
    TestProject.findOne({_id: req.params.id}, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (!tp) {
            return res.status(500).send({ message: "Project test doesn't exists" });
          }else{
            //TODO for each field, if  req.body.testProject.XXX is undefined, not replace!!
            tp.name = req.body.testProject.name;
            tp.prefix = req.body.testProject.prefix;
            tp.currentTcNumber = req.body.testProject.currentTcNumber;
            tp.priorities =  req.body.testProject.priorities;
            tp.status = req.body.testProject.status;
            tp.description = req.body.testProject.description;
            tp.tmTreeData = req.body.testProject.tmTreeData;

            TestProject.findOneAndUpdate({_id:req.params.id}, tp, {upsert:true}, function(err, doc){
                if (err) res.status(500).send({ message: err.message });
                return res.send("succesfully saved");
            });
          };
        }
    });
  });

  //delete a test plan
  app.delete('/api/testProject/:id', middleware.ensureAuthenticated, function(req, res) {
    TestProject.findOne({_id: req.params.id}, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            tp.remove(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
              //delete all testSuites and testCase with tpjId === req.params.id
              TestSuite.find({tpjId: req.params.id}).remove().exec();
              TestCase.find({tpjId: req.params.id}).remove().exec();
              return res.send("succesfully deleted");
            });
          }else{
            return res.status(500).send({ message: "Project test doesn't exists" });
          };
        }
    });
  });
};
