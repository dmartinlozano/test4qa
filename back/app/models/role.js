var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var roleSchema = mongoose.Schema({
  name: { type: String, index: { unique: true }},
  description: String,
  isAdmin: Boolean,
  permissions: {testManagementView: Boolean, testManagementEdit: Boolean,
                testPlanView: Boolean, testPlanEdit: Boolean, testPlanRun: Boolean,
                userManagementView: Boolean, userManagementEdit: Boolean
               }
}, { collection: 'role' });

// create the model for users and expose it to our app
module.exports = mongoose.model('Role', roleSchema);
