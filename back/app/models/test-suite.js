var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our TS model
var testSuiteSchema = mongoose.Schema({
  name: String,
  description: String,
  keywords: String,
  parent: mongoose.Schema.ObjectId
}, { collection: 'testSuite' });

//To full find index
testSuiteSchema.index({'$**': 'text'});

// create the model for TP and expose it to our app
module.exports = mongoose.model('TestSuite', testSuiteSchema);
