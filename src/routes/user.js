const express = require('express');
const { userController } = require('../controllers');
const router = express.Router();
const route = userController;

router.get('/', route.cget);

router.post('/', route.post);

router.get('/:id', route.get);

router.put('/:id', route.put);

module.exports = router;
