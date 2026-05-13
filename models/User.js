const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new.mongoose.Schema({
    name:{
            type: String,
            required: [true, 'name is required']
    },
    email:{
            type: String,
            required: [true, 'email is required'],
            unique : [true]
    },
    password:{
            type: String,
            required: [true, 'password is required'],
            select :[false]
    },
    role:{
            type: String,
            enum: [admin, user]
    }
});

// Auto-set ticketsLeft to capacity when creating a new event
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);