const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Posts = require('../../models/Posts');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
/**
 * @description         Get post
 * @route               POST api/v1/posts
 * @access              Public
 */
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Write something')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array()
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Posts({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        profilePic: user.profilePic
      });

      const post = await newPost.save();

      return res.status(200).json({
        status: true,
        data: post
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: false,
        message: error
      });
    }
  }
);
/**
 * @description         Get all posts
 * @route               GET api/v1/posts
 * @access              Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Posts.find().sort({
      date: -1
    });
    return res.status(200).json({
      status: true,
      data: posts
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: error
    });
  }
});
/**
 * @description         Get all posts by id
 * @route               GET api/v1/posts/:id
 * @access              Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    return res.status(200).json({
      status: true,
      data: post
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    return res.status(500).json({
      status: false,
      message: error
    });
  }
});
/**
 * @description         Delete posts
 * @route               DELETE api/v1/posts/:id
 * @access              Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    // check if user exists
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        status: false,
        message: `User with id ${req.params.id} is not authorized to delete this post!`
      });
    }
    // check if post exists
    if (!post) {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    //finally remove
    await post.remove();
    return res.status(200).json({
      status: true,
      data: {}
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    return res.status(500).json({
      status: false,
      message: error
    });
  }
});
/**
 * @description         Add a like posts
 * @route               Put api/v1/posts/like/:id
 * @access              Private
 */
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    // check if post exists
    if (!post) {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    // check like
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({
        status: false,
        message: `Post already liked`
      });
    }
    post.likes.unshift({
      user: req.user.id
    });
    await post.save();
    return res.status(200).json({
      status: true,
      data: post.likes
    });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        status: false,
        message: `Post with id ${req.params.id} was not found!`
      });
    }
    return res.status(500).json({
      status: false,
      message: error
    });
  }
});
module.exports = router;
