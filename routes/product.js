const express = require('express');
const { Category, Product } = require('../models');
const router = express.Router();
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post(
  '/add',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    let product = req.body;
    try {
      let productExist = await Product.findOne({
        where: {
          name: product.name,
          categoryId: product.categoryId,
          description: product.description,
          price: product.price,
          status: product.status,
        },
      });
      if (productExist) {
        return res.json('Product already exist.');
      }
      return res.status(200).json({ message: 'Product Added Successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/get', async (req, res, next) => {
  let product = req.body;
  try {
    let productQuery = await Product.findAll({
      // where: {
      //   name: product.name,
      //   categoryId: product.categoryId,
      //   description: product.description,
      //   price: product.price,
      // },
      include: [
        {
          model: Category,
          as: 'Categories',
        },
      ],
    });
    if (!productQuery) {
      return res.status(500).json(err);
    }
    return res.status(200).json(productQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch(
  '/patch',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    let product = req.body;
    try {
      let updateName = await Product.findOne({
        where: {
          id: product.id,
        },
      });
      if (!updateName) {
        return res.status(404).json({ message: 'Product not found' });
      }
      updateName.name = product.name;
      try {
        await updateName.save();
      } catch {
        return res.status(404).json({ message: 'A error happened.' });
      }
      return res.status(200).json({ message: 'Product Updated Successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/test', async (req, res) => {
  try {
    const product = await Product.create({
      name: 'sas',
      description: 'Lorem',
      price: 30,
      status: 'On road',
    });
    res.json(product);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
