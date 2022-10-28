const { USER_ROLE } = require('../globals/type');
const User = require('../models/User.js');

let { checkRole } = require('../services');

module.exports = {
  cget: async (req, res) => {
    try {
      let userQuery = await User.findAll({
        where: {
          ...req.query,
        },
      });
      return res.status(200).json(userQuery);
    } catch (err) {
      res.status(400).json('Failed');
    }
  },

  post: async (req, res) => {
    try {
      let userExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (userExist) {
        return res.status(400).json({ message: 'Email Already Exists' });
      }
      if (userExist.password.length < 6) {
        return res.json('Password must be 6 characters long or more');
      }
      try {
        const user = await User.create(req.body);
        res.json(user);
        return res.status(200).json({ message: 'Successfully Registerd' });
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  get: async (req, res) => {
    auth.authenticateToken,
      checkRole(USER_ROLE.ADMIN),
      async (req, res) => {
        try {
          let user = await User.findOne({
            where: {
              id: req.params.id,
            },
          });
          if (!user) {
            return res.status(500).json({ message: 'User not found' });
          }
          if (user) {
            return res.status(200).json(user);
          }
        } catch (err) {
          res.status(500).json(err);
        }
      };
  },

  put: async (req, res) => {
    try {
      let userExist = await User.findOne({
        where: req.body.id,
      });
      if (!userExist) {
        return res.status(404).json({ message: 'User id does not exist.' });
      }
      if (userExist.valided == 1) {
        return res.status(404).json({ message: 'User is already valided' });
      }
      userExist.valided = 1;
      try {
        await userExist.save();
        return res.status(200).json({ message: ' User Updated Successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
