const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/category').cget);

router.post('/', require('../controllers/category').post);

router.put('/:id', require('../controllers/category').put);

router.delete('/:id', require('../controllers/category').delete);

module.exports = router;
