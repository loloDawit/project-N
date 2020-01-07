const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
/**
 * @description         Get profile
 * @route               GET api/v1/profile/self
 * @access              Private
 */
router.get('/self', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'profilePic']);
    if (!profile) {
      res.status(400).json({
        status: false,
        message: 'No profile found for this user'
      });
    }
    res.status(200).json({
      status: true,
      message: 'Profile found'
    });
    // user found, return profile
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});
/**
 * @description         Create a user profile
 * @route               POST api/v1/profile
 * @access              Private
 */
router.post(
  '/',
  auth,
  [
    check('status', 'Status is requried')
      .not()
      .isEmpty(),
    check('skills', 'Skill is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        message: errors.array()
      });
    }
    // destructure
    const {
      company,
      website,
      bio,
      location,
      status,
      githubusername,
      skills,
      twitter,
      github,
      linkedin
    } = req.body;
    // Build objects
    const userProfileFieldsObj = {};
    userProfileFieldsObj.user = req.user.id;
    if (company) userProfileFieldsObj.company = company;
    if (website) userProfileFieldsObj.website = website;
    if (location) userProfileFieldsObj.location = location;
    if (status) userProfileFieldsObj.status = status;
    if (bio) userProfileFieldsObj.status = bio;
    if (githubusername) userProfileFieldsObj.githubusername = githubusername;
    if (skills) {
      userProfileFieldsObj.skills = skills
        .split(',')
        .map(skill => skill.trim());
    }
    userProfileFieldsObj.social = {};
    if (twitter) userProfileFieldsObj.social.twitter = twitter;
    if (github) userProfileFieldsObj.social.github = github;
    if (linkedin) userProfileFieldsObj.social.linkedin = linkedin;

    try {
      let userProfile = await Profile.findOne({
        user: req.user.id
      });
      //user found, update profile
      if (userProfile) {
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          { $set: userProfileFieldsObj },
          { new: true }
        );
        return res.status(200).json({
          status: true,
          message: 'Profile Updated',
          data: profile
        });
      }
      // if user profile is not found, create one
      profile = new Profile(userProfileFieldsObj);
      await profile.save();
      return res.status(200).json({
        status: true,
        message: 'Profile created',
        data: profile
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: 'Server Error'
      });
    }
  }
);
module.exports = router;
