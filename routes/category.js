const express = require('express');
const router = express.Router();
const Category = require('../models/Category.js');
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post(
  '/add',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    let category = req.body;
    try {
      let categoryExist = await Category.findOne({
        where: {
          name: category.name,
        },
      });
      if (categoryExist) {
        return res.json('Category already exist.');
      }
      return res.status(200).json({ message: 'Category Added Successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get(
  '/get',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    try {
      let categoryName = await Category.findAll({
        order: [['name']],
      });
      if (!categoryName) {
        return res.status(500).json(err);
      }
      return res.status(200).json(categoryName);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.patch(
  '/patch',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    let product = req.body;
    try {
      let updateName = await Category.findOne({
        where: {
          id: product.id,
        },
      });
      if (!updateName) {
        return res.status(404).json({ message: 'Category not found' });
      }
      updateName.name = product.name;
      try {
        await updateName.save();
      } catch {
        return res.status(404).json({ message: 'A error happened.' });
      }
      return res.status(200).json({ message: 'Category Updated Successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/test', async (req, res) => {
  try {
    const category = await Category.create({
      name: 'fiction',
    });
    res.json(category);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
