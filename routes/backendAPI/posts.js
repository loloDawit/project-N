const express = require('express');
const router = express.Router();

/**
 * @description         Get post
 * @route               GET api/v1/users
 * @access              Public
 */
router.get('/', (req, res) => res.json('Posts route'));

module.exports = router;
