const JSONWebToken = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'No token, authorization denied'
    });
  }
  try {
    const decoded = JSONWebToken.verify(token, config.get('JWT_SECRET'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: false,
      message: 'Token is not vaild'
    });
  }
};
