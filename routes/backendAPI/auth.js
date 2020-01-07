const express = require('express');
const JSONWebToken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

/**
 * @description         Get auth
 * @route               GET api/v1/auth
 * @access              Public
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Server Error'
    });
  }
});
/**
 * @description         Authenticate user and get token
 * @route               POST api/v1/auth
 * @access              Public
 */
router.post(
  '/',
  [
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Please enter a valid password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // get user
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          errors: [{ message: 'Invalid Email/Password!' }]
        });
      }
      // math user email and password
      const checkMatch = await bcrypt.compare(password, user.password);
      if (!checkMatch) {
        res.status(400).json({
          errors: [{ message: 'Invalid Email/Password!' }]
        });
      }
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
            data: 'User verified',
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
