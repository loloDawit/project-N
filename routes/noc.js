const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/', [check],async (res, req) => {

});
