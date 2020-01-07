const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const JSONWebToken = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
/**
 * @description         Get users
 * @route               GET api/v1/users
 * @access              Public
 */
router.get('/', (req, res) => res.json('User route'));
/**
 * @description         Create a user
 * @route               POST api/v1/users
 * @access              Public
 */
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // register user
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({
          errors: [{ message: 'User Already Exists' }]
        });
      }
      // get the profile pic
      const profilePic = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      user = new User({
        name,
        email,
        profilePic,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      JSONWebToken.sign(
        payload,
        config.get('JWT_SECRET'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({
            success: true,
            data: 'User created',
            token
          });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: 'Server error' });
    }
  }
);
module.exports = router;
