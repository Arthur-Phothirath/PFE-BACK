const express = require('express');
const { securityController: route } = require('../controllers');
const router = express.Router();
let { authenticateToken } = require('../services');

router.post('/login', route.postLogin);

router.post('/register', require('../controllers').userController.post);

router.post('/forgot-password', route.postForgetPassword);

router.patch('/change-password', route.putPassword, authenticateToken);

module.exports = router;
