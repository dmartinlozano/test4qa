var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our TP model
var testProjectSchema = mongoose.Schema({
  name: String,
  prefix: String,
  description: String,
  tmTreeData: String,
  tpTreeData: String
}, { collection: 'testProject' });

// create the model for TP and expose it to our app
module.exports = mongoose.model('TestProject', testProjectSchema);
