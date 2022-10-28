const express = require('express');
const { checkRole } = require('../services');
const { USER_ROLE } = require('../globals/type');
const router = express.Router();

router.post(
  '/',
  checkRole(USER_ROLE.ADMIN),
  require('../controllers/product').post
);

router.get(
  '/',
  checkRole(USER_ROLE.ADMIN),
  require('../controllers/product').cget
);
// router.post(
//   '/',
//   checkRole(USER_ROLE.ADMIN),
//   require('../controllers/product').post
// );

// router.get(
//   '/:id',
//   checkRole(USER_ROLE.ADMIN),
//   require('../controllers/product').get
// );

// router.put('/:id', require('../controllers/product').put);

module.exports = router;
