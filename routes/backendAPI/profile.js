const express = require('express');
const router = express.Router();

/**
 * @description         Get profile
 * @route               GET api/v1/profile
 * @access              Public
 */
router.get('/', (req, res) => res.json('User profile'));

module.exports = router;
