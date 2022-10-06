const express = require('express');
const { productMiddleware, categoryMiddleware } = require('../middlewares');
const { Category, Product, sequelize } = require('../models');
const router = express.Router();
let auth = require('../services/authentication');
let checkRole = require('../services/checkRole');

router.post(
  '/add',
  auth.authenticateToken,
  checkRole.checkRole,
  productMiddleware.productExist,
  async (req, res, next) => {
    let product = req.body;
    const t = await sequelize.transaction();
    try {
      if (res.locals.productExist) {
        throw new Error();
      }
      const productCreate = await Product.create(product, {
        transaction: t,
      });
      for (const categoryId of product.categories) {
        await productCreate.addCategory(categoryId, { transaction: t });
      }
      await t.commit();
      return res.status(201).json({ message: 'Product Added Successfully' });
    } catch ({ message }) {
      await t.rollback();
      res.status(400).json({ message: 'Internals issues' });
    }
  }
);

router.get('/get', async (req, res) => {
  try {
    let productQuery = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
        },
      ],
    });
    if (!productQuery) {
      throw new Error();
    }
    return res.status(200).json(productQuery);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(
  '/getByCategory/:id',
  categoryMiddleware.categoryExist,
  async (req, res) => {
    try {
      if (!res.locals.categoryExist) {
        throw new Error();
      }
      let productQuery = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'categories',
            where: {
              id: req.params.id,
            },
          },
        ],
      });
      return res.status(200).json(productQuery);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.get('/get/:id', productMiddleware.productExist, async (req, res) => {
  try {
    if (!res.locals.productExist) {
      throw new Error();
    }
    return res.status(200).json(res.locals.productExist);
  } catch {
    res.status(400).json({ message: 'Internals issues' });
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
      try {
        updateName.name = product.name;
        updateName.description = product.description;
        updateName.price = product.price;
        updateName.status = product.status;
        await updateName.save();
        return res
          .status(200)
          .json({ message: 'Product Updated Successfully' });
      } catch {
        return res.status(404).json({ message: 'A error happened.' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  '/delete/:id',
  auth.authenticateToken,
  checkRole.checkRole,
  async (req, res, next) => {
    try {
      let product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      try {
        await product.destroy();
        return res
          .status(200)
          .json({ message: 'Product Deleted Successfully' });
      } catch {
        return res.status(404).json({ message: 'A error happened.' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get('/test', async (req, res) => {
  // try {
  //   const product = await Product.create({
  // name: 'sas',
  // description: 'Lorem',
  // price: 30,
  // status: 'On road',
  //   });
  //   res.json(product);
  // } catch (err) {
  //   res.json(err);
  // }
  const t = await sequelize.transaction();

  try {
    const product = await Product.create(req.body, {
      transaction: t,
    });
    for (const categoryId of req.body.categories) {
      await product.addCategory(categoryId, { transaction: t });
    }
    await t.commit();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ message: err.message });
    // if (err instanceof Sequelize.ValidationError) {
    //   res.status(400).json(format(err));
    // } else {
    // }
  }
});

module.exports = router;
