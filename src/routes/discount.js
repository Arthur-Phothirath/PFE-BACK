const express = require('express');
const { discountController } = require('../controllers');
const router = express.Router();
const route = discountController;

router.get('/', route.cget);

router.post('/', route.post);

router.get('/:id', route.get);

router.put('/:id', route.put);

router.delete('/:id', route.delete);

module.exports = router;
