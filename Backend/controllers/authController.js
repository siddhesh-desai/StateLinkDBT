const Student = require("../models/Student");
const jwt = require('jsonwebtoken');

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
  if (err.message.includes('student validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'jwt secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.create({ email, password });
    const token = createToken(student._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(201).json({ student: student._id });
    res.redirect('/student/login')
  }
  catch(err) {
    const errors = handleErrors(err);
    // res.status(400).json({ errors });
    res.redirect('/student/login')
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.login(email, password);
    const token = createToken(student._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(200).json({ student: student._id });
    res.redirect('/student/')
  } 
  catch (err) {
    const errors = handleErrors(err);
    // res.status(400).json({ errors });
    res.redirect('/student/login')
  }

}

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}