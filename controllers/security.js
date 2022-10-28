const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = {
  postLogin: async (req, res) => {
    try {
      let userExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!userExist) {
        return res.status(400).json({ message: 'Error on Email or Password' });
      }
      if (!userExist.valided) {
        return res.status(401).json({ message: 'Wait for Admin Approval' });
      }
      if (
        userExist &&
        (await bcrypt.compare(req.body.password, userExist.password))
      ) {
        const response = { email: userExist.email, role: userExist.role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: '1h',
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  postForgetPassword: async (req, res) => {
    try {
      let userExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (!userExist) {
        return res
          .status(200)
          .json({ message: 'Password sent successfully tp your email.' });
      }
      let mailOptions = {
        from: process.env.EMAIL,
        to: userExist.email,
        subject: 'Password by ToyTest',
        html:
          '<><b>Your Login</b><br><b>Email: </b>' +
          userExist.email +
          '<br><b>Password: </b>' +
          userExist.password +
          '<br><a href="http://localhost:4200/"> Click here to login</a></p>',
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ message: 'Something went wrong.' });
        } else {
          console.log('Email sent' + info.response);
        }
      });
      return res
        .status(200)
        .json({ message: 'Password sent successfully tp your email.' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  putPassword: async (req, res) => {
    try {
      const user = req.body;
      const emailUser = res.locals.email;
      let userExist = await User.findOne({
        where: {
          email: emailUser,
        },
      });
      if (user.newPassword.length < 5) {
        return res
          .status(400)
          .json({ message: 'Password must be at least 6 characters long' });
      }
      if (!userExist) {
        return res.status(500).json({ message: 'Something went wrong.' });
      }
      if (!(await bcrypt.compare(user.oldPassword, userExist.password))) {
        return res
          .status(400)
          .json({ message: 'Oldpassword must be same actual password' });
      }
      if (user.oldPassword == user.newPassword) {
        return res
          .status(400)
          .json({ message: 'The old and new password cannot be the same' });
      }
      try {
        userExist.password = user.newPassword;
        try {
          await userExist.save();
          try {
            return res
              .status(200)
              .json({ message: 'Password Updated Successfully' });
          } catch (err) {
            res.status(500).json(err);
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } catch {
        return res.status(500).json({ message: 'Something went wrong.' });
      }
    } catch (err) {
      return res.status(500).json({ message: 'Failed' });
    }
  },
};
