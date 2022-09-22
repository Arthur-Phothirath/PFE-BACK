const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');
require('dotenv').config();

let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post('/signup', async (req, res) => {
  try {
    let userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExist) {
      return res.status(400).json({ message: 'Email Already Exists' });
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

  // connection.query(query, [user.email], (err, results) => {
  //   if (!err) {
  //     if (results.length <= 0) {
  //       query =
  //         "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
  //       connection.query(
  //         query,
  //         [user.name, user.contactNumber, user.email, user.password],
  //         (err, results) => {
  //           if (!err) {
  //             return res
  //               .status(200)
  //               .json({ message: 'Successfully Registerd' });
  //           } else {
  //             return res.status(500).json(err);
  //           }
  //         }
  //       );
  //     } else {
  //       return res.status(400).json({ message: 'Email Already Exists' });
  //     }
  //   } else {
  //     return res.status(500).json(err);
  //   }
  // });
});

router.post('/login', async (req, res) => {
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

  // const user = req.body;
  // let query = "select email, password, role, status from user where email=?";
  // connection.query(query,[user.email],(err, results) => {
  //     if(!err){
  //         if(results.length <= 0 || results[0].password != user.password){
  //             return res.status(401).json({message: "Incorrect Username or password"})
  //         }
  //         else if(results[0].status === 'false'){
  //             return res.status(401).json({message: "Wait for Admin Approval"});
  //         }
  //         else if(results[0].password === user.password) {
  //             const response = {email: results[0].email, role: results[0].role};
  //             const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {expiresIn: '8h'});
  //             res.status(200).json({token: accessToken});
  //         }
  //         else {
  //             return res.status(400).json({message: "Something went wrong"})
  //         }
  //     } else {
  //         return res.status(500).json(err);
  //     }
  // })
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post('/forgetpassword', async (req, res) => {
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
        console.log(error);
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
});

router.get('/test', async (req, res) => {
  try {
    const user = await User.create({
      name: 'admin',
      contactNumber: '1',
      email: 'admin.com',
      password: 'admin',
      valided: 1,
      role: 'admin'
    });
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.get(
  '/get',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
    try {
      let user = await User.findAll({
        where: {
          role: 'guest',
        },
      });
      if (!user) {
        return res.status(500).json({ message: '0 guest found' });
      }
      if (user) {
        return res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.patch(
  '/update',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res) => {
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
      } catch(err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/checkToken', auth.authenticateToken, (req, res) => {
  return res.status(200).json({ message: 'true' });
});

// how compare salted password?

// router.post('/changePassword', auth.authenticateToken, async (req,res) => {
//   const user = req.body;
//   const email = res.locals.email;
//   let userExist = await User.findOne({
//     where: {
//       email: email,
//     }
//   });
// const salt = bcrypt.genSaltSync();
// oldUserPassword = bcrypt.hashSync(user.oldPassword, salt);
// newUserPassword = bcrypt.hashSync(user.newPassword, salt);
// return res.json(oldUserPassword)
// return res.json(newUserPassword)
// if(!userExist){
//   return res.status(500).json({ message: 'Something went wrong.' });
// }
// if(!await bcrypt.compare(userExist.password, user.oldPassword)){
//   return res.json(user.oldPassword);
//   return res.json(userExist.password);
// return res.status(400).json({ message: 'Same as old Password.' });
// }
// if(await bcrypt.compare(user.newPassword, user.oldPassword)){
//   return res.status(400).json({ message: 'The old and new password cannot be the same' });
// }
// userExist.password = newUserPassword;
// return res.status(200).json({ message: "Password Updated Successfully"})
// })

module.exports = router;
