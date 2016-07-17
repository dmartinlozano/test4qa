var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our TP model
var testProjectSchema = mongoose.Schema({
  name: { type: String, index: { unique: true }},
  prefix: String,
  description: String,
  currentTcNumber : Number,
  tmTreeData: String,
  tpTreeData: String
}, { collection: 'testProject' });

// create the model for TP and expose it to our app
module.exports = mongoose.model('TestProject', testProjectSchema);
