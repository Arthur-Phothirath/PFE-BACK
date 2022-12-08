const express = require('express');
const router = express.Router();
const route = require('../controllers/user');

router.get('/', route.cget);

router.post('/', route.post);

router.get('/:id', route.get);

router.put('/:id', route.put);

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
