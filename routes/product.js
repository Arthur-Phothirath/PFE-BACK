const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/product').cget);

router.post('/', require('../controllers/product').post);

router.get('/:id', require('../controllers/product').get);

router.put('/:id', require('../controllers/product').put);

router.delete('/:id', require('../controllers/product').delete);

module.exports = router;
