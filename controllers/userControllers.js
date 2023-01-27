const User = require('../modules/User')
const bcrypt = require('bcrypt')
module.exports.signup_post = async (req, res) => {
  const { userName, email, password1, password2 } = req.body;
  const errors = []
  // datavalidation 
  if (!email || !password1 || !password2 || !userName) {
    errors.push({ msg: 'all the fields are required' })
  }
  if (password1 != password2) {
    errors.push({ msg: 'passwords do not match' });
  }
  if (password1.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  User.findOne({ email: email }).then(user => {
    if (user) {
      errors = [];
      errors.push({ msg: 'email already registered' });
    }
    if (errors.length) {
      res.setStatus(405).json(errors); 
    } else {
      const saltRounds = 10;
      bcrypt.hash(password1, saltRounds)
        .then(function (hash) {
          
          User.create({
            userName,
            email,
            password:hash
          })
            .then(user => {
              res.redirect('/chat');
            })
            .catch(err => console.log(err.message));
        })
        .catch(err => {
          console.log(err);
        });
    }
  })
}
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
