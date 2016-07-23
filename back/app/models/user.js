var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = mongoose.Schema({
  name: { type: String, index: { unique: true }},
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  email: String,
  roleInProject: [{project: mongoose.Schema.ObjectId, role: mongoose.Schema.ObjectId}],
  defaultTestProject: mongoose.Schema.ObjectId
  //permissions
}, { collection: 'user' });


userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
