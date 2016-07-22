var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our TS model
var testCaseSchema = mongoose.Schema({
  name: String,
  description: String,
  preconditions: [String],
  isHappyPath: Boolean,
  isErrorPath: Boolean,
  priority: String,
  status: String,
  steps: [{action:String, result:String}],
  keywords: String,
  parent: mongoose.Schema.ObjectId,
  tpjId: mongoose.Schema.ObjectId
}, { collection: 'testCase' });

//To full find index
testCaseSchema.index({'$**': 'text'});

// create the model for TP and expose it to our app
module.exports = mongoose.model('TestCase', testCaseSchema);
