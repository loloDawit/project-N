const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const Posts = require('../models/Posts');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
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
      return res.status(400).json({
        status: false,
        msg: 'No profile found for this user'
      });
    }
    return res.status(200).json({
      status: true,
      msg: 'Profile found',
      data: profile
    });
    // user found, return profile
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msg: 'Server Error!'
    });
  }
});
/**
 * @description         Get profile
 * @route               GET api/v1/profile
 * @access              Public
 */
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'name',
      'profilePic'
    ]);
    if (!profiles) {
      return res.status(400).json({
        status: false,
        message: 'No profile found!'
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Profile found',
      data: profiles
    });
    // user found, return profile
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});
/**
 * @description         Get profile by a user id
 * @route               GET api/v1/profile/user/:id
 * @access              Private
 */
router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id
    }).populate('user', ['name', 'profilePic']);
    if (!profile) {
      return res.status(400).json({
        status: false,
        message: 'No profile found!'
      });
    }
    return res.status(200).json({
      status: true,
      message: 'Profile found',
      data: profile
    });
    // user found, return profile
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        status: false,
        message: 'No profile found!!'
      });
    }
    return res.status(500).json({
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
    check('status', 'Status is required')
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
        errors: errors.array()
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
    if (bio) userProfileFieldsObj.bio = bio;
    if (githubusername) userProfileFieldsObj.githubusername = githubusername;
    if (skills) {
      userProfileFieldsObj.skills = skills
        .split(',')
        .map(skill => skill.trim());
    }
    userProfileFieldsObj.sociallinks = {};
    if (twitter) userProfileFieldsObj.sociallinks.twitter = twitter;
    if (github) userProfileFieldsObj.sociallinks.github = github;
    if (linkedin) userProfileFieldsObj.sociallinks.linkedin = linkedin;

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
      return res.status(500).json({
        status: false,
        message: 'Server Error'
      });
    }
  }
);
/**
 * @description         Delete profile by a user id and their post
 * @route               DELETE api/v1/profile
 * @access              Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    await Posts.deleteMany({ user: req.user.id });
    await Profile.findOneAndRemove({
      user: req.user.id
    });
    await User.findOneAndRemove({
      _id: req.user.id
    });

    return res.status(200).json({
      status: true,
      message: 'Profile Deleted!'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});
/**
 * @description         Add experience to profile
 * @route               PUT api/v1/profile/experience
 * @access              Private
 */
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'from date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array()
      });
    }
    // destructure
    const {
      company,
      title,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    // set the object
    const newExperienceObj = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExperienceObj);
      await profile.save();
      return res.status(200).json({
        status: true,
        message: 'Profile Experience Added!',
        data: profile
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: 'Server Error!'
      });
    }
  }
);
/**
 * @description         Delete experience from user profile
 * @route               DELETE api/v1/profile/experience/:experienceId
 * @access              Private
 */
router.delete('/experience/:experienceId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    const removeExpIndex = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.experienceId);

    profile.experience.splice(removeExpIndex, 1);

    await profile.save();

    return res.status(200).json({
      status: true,
      message: 'Profile Experience Deleted!',
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});

/**                       Education                              */

/**
 * @description         Add education to profile
 * @route               PUT api/v1/profile/education
 * @access              Private
 */
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required')
        .not()
        .isEmpty(),
      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'from date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({
        status: false,
        errors: errors.array()
      });
    }
    // destructure
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    // set the object
    const newEducationObj = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEducationObj);
      await profile.save();
      return res.status(200).json({
        status: true,
        message: 'Profile Education Added!',
        data: profile
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Server Error!'
      });
    }
  }
);
/**
 * @description         Delete education from user profile
 * @route               DELETE api/v1/profile/education/:educationId
 * @access              Private
 */
router.delete('/education/:educationId', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });

    const removeExpIndex = profile.education
      .map(exp => exp.id)
      .indexOf(req.params.educationId);

    profile.education.splice(removeExpIndex, 1);

    await profile.save();

    return res.status(200).json({
      status: true,
      message: 'Profile education Deleted!',
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});
/**                   GitHub                         */
/**
 * @description         Get github profile
 * @route               GET api/v1/profile/github/:username
 * @access              Public
 */
router.get('/github/:username', async (req, res) => {
  try {
    const reqOptions = {
      uri: encodeURI(
        `https://api.github.com/users/${
          req.params.username
        }/repos?per_page=5&sort=created:asc&client_id=${config.get(
          'GitHub_Client_ID'
        )}&client_secret=${config.get('GitHub_Client_Secret')}`
      ),
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };
    request(reqOptions, (error, response, body) => {
      if (error) {
        console.log(error);
      }
      if (response.statusCode !== 200) {
        return res.status(404).json({
          status: false,
          message: 'Username not found!'
        });
      }
      return res.status(200).json(JSON.parse(body));
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Server Error!'
    });
  }
});
module.exports = router;
