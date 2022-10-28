const express = require('express');
const router = express.Router();
const { USER_ROLE } = require('../globals/type');
const { checkRole } = require('../services');

router.get(
  '/',
  checkRole(USER_ROLE.ADMIN),
  require('../controllers/user').cget
);

router.post(
  '/',
  checkRole(USER_ROLE.ADMIN),
  require('../controllers/user').post
);

router.get(
  '/:id',
  checkRole(USER_ROLE.ADMIN),
  require('../controllers/user').get
);

router.put('/:id', require('../controllers/user').put);

// router.get('/createAdmin', async (req, res) => {
//   try {
//     const user = await User.create({
//       name: 'admin',
//       contactNumber: '1',
//       email: 'admin.com',
//       password: 'admin',
//       valided: 1,
//       role: 'admin',
//     });
//     res.json(user);
//   } catch (err) {
//     res.json(err);
//   }
// });

// router.get('/createGuest', async (req, res) => {
//   try {
//     const user = await User.create({
//       name: 'guest',
//       contactNumber: '1',
//       email: 'guest.com',
//       password: 'guest',
//       valided: 0,
//       role: 'guest',
//     });
//     res.json(user);
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
