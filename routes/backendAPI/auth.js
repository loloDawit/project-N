const express = require('express');
const router = express.Router();

/**
 * @description         Get auth
 * @route               GET api/v1/auth
 * @access              Public
 */
router.get('/', (req, res) => res.json('User route'));

module.exports = router;
