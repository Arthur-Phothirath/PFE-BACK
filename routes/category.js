const { Category, sequelize } = require('../models');
const express = require('express');
const router = express.Router();
const { checkRole, authenticateToken } = require('../services');
const { USER_ROLE } = require('../globals/type');
const { categoryMiddleware } = require('../middlewares');

router.post(
  '/add',
  authenticateToken,
  checkRole(USER_ROLE.ADMIN),
  categoryMiddleware.categoryExist,
  async (req, res) => {
    let category = req.body;
    const t = await sequelize.transaction();
    try {
      if (res.locals.categoryExist) {
        throw new Error();
      }
      const categoryCreate = await Category.create(category, {
        transaction: t,
      });
      await t.commit();
      res.json(categoryCreate);
      return res.status(201).json({ message: 'Category Added Successfully' });
    } catch ({ message }) {
      await t.rollback();
      res.status(400).json({ message: 'Internals issues' });
    }
  }
);

router.get(
  '/get',
  authenticateToken,
  checkRole(USER_ROLE.ADMIN),
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
  authenticateToken,
  checkRole(USER_ROLE.ADMIN),
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
