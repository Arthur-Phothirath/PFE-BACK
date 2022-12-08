const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/bill').generateBill);

module.exports = router;
