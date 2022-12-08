const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/bill').get);

module.exports = router;
