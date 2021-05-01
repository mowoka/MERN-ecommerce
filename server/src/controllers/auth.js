const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: 'User already registered',
      });

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          message: 'User something wrong',
        });
      }
      if (data) {
        return res.status(201).json({
          message: 'User created successfully!',
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ errror });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          }
        );
        const { firstNane, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            firstNane,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          message: 'Credential Error',
        });
      }
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  });
};
