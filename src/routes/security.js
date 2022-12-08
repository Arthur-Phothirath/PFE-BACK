const express = require('express');
const router = express.Router();
let { authenticateToken } = require('../services');

router.post('/login', require('../controllers/security').postLogin);

router.post('/register', require('../controllers/user').post);

router.post(
  '/forgot-password',
  require('../controllers/security').postForgetPassword
);

router.patch(
  '/change-password',
  require('../controllers/security').putPassword,
  authenticateToken
);

module.exports = router;
