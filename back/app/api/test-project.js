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
    TestProject.findOne({ name: req.body.name }, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (tp) {
            return res.status(500).send({ message: 'Project test already exists' });
          }else{
            var newTP = new TestProject({
              name: req.body.name,
              prefix: req.body.prefix,
              currentTcNumber: 1,
              description: req.body.description
            });
            newTP.save(function(err, result) {
              if (err) {
                res.status(500).send({ message: err.message });
              }
            });
            newTp.tmTreeData = "[{label: "+req.body.name+", type: 'tpj', _id: '" + newTp._id + "', children: []}]";
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
  app.post('/api/testProject/:id', middleware.ensureAuthenticated, function(req, res) {
    TestProject.findOne({_id: req.params.id}, function(err, tp) {
      if(err){
          console.log(err);
        }
        else{
          if (!tp) {
            return res.status(500).send({ message: "Project test doesn't exists" });
          }else{
            //TODO fix esto: debería pasarse tambien el tipo: String, Number...
            if (req.body.field === "currentTcNumber"){
              tp[req.body.field] = Number(req.body.newValue);
            }else{
              tp[req.body.field] = req.body.newValue;
            }
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
              return res.send("succesfully deleted");
            });
          }else{
            return res.status(500).send({ message: "Project test doesn't exists" });
          };
        }
    });
  });
};
