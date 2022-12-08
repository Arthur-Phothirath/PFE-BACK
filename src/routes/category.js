const express = require('express');
const router = express.Router();
const route = require('../controllers/category');

router.get('/', route.cget);

router.post('/', route.post);

router.put('/:id', route.put);

router.delete('/:id', route.delete);

module.exports = router;
