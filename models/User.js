const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// Step 1: Add the Passport plugin

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },

  about:{
    type: String,
    required: true
  },

  date: {
    type: Date
  },
  

  email: {
    type: String,
    required: true,
    dropDups: true,
    validate: {
      validator: function (v) {
        return this.emailConfirmation === v
      },
      message: props => `${props.value} doesn't match the email confirmation`
    }
  }
});

// Virtuals
UserSchema.virtual('emailConfirmation')
.get(function () {
  return this._emailConfirmation;
})
.set(function (value) {
  this._emailConfirmation = value;
});

UserSchema.virtual('password')
.get(function () {
  return this._password;
})
.set(function (value) {
  this._password = value;
});

UserSchema.virtual('passwordConfirmation')
.get(function () {
  return this._passwordConfirmation;
})
.set(function (value) {
  if (this.password !== value) this.invalidate('password', 'Password and password confirmation must match');
  this._passwordConfirmation = value;
});

// Step 2: Create a virtual attribute that returns the fullname of the user
UserSchema.virtual('fullname')
.get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('ageNow')
.get(function () {

  var ageDifMs = Date.now() - this.date;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});



UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});


module.exports = mongoose.model('User', UserSchema);