const express = require('express');
const router = express.Router();

router.get('/', require('../controllers/facture').get);

module.exports = router;
