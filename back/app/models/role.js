var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var roleSchema = mongoose.Schema({
  name: { type: String, index: { unique: true }},
  description: String
}, { collection: 'role' });

// create the model for users and expose it to our app
module.exports = mongoose.model('Role', roleSchema);
