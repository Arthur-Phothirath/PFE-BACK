const express = require('express');
const { fixtureController } = require('../controllers');
const router = express.Router();
const route = fixtureController;

router.get('/admin', route.createAdmin);
router.get('/guest', route.createGuest);
router.get('/cartitem', route.createCarteItem);
router.get('/category', route.createCategory);
router.get('/discount', route.createDiscount);
router.get('/order', route.createOrder);
router.get('/product', route.createProduct);

module.exports = router;
