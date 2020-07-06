// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Dream

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const DreamSchema = new mongoose.Schema({
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true
 },
 
 title: {
    type: String,
    required: true // This must exist
  },

  note: {
    type: String,
    required: true // This must exist
  },

  age: {
    type: Number,
  },

 

}, 

{
  timestamps: true
}



);


DreamSchema.virtual('ageGap')
.get(function () {
  var ageGap = this.age - this.user.ageNow;
  return ageGap;
});

DreamSchema.virtual('ageGapAbs')
.get(function () {
  var ageGapAbs = this.age - this.user.ageNow;
  return Math.abs (ageGapAbs);
});


module.exports = mongoose.model('Dream', DreamSchema);