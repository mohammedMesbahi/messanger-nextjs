const mongoose = require('mongoose');
const { isEmail } = require('validator');

// user Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
      required: [true, 'Please enter a valid user name'],
      minlength: [6, 'Minimum length is 6 characters'],
      unique: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
});

// user model
const User = mongoose.model('user', userSchema);

module.exports = User
// database connection
const dbURI =  'mongodb+srv://use1:nDmX51Wjzm6c8gz3@cluster0.mqhqhac.mongodb.net/?retryWrites=true&w=majority'
