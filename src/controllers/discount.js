const { Discount } = require('../models');

module.exports = {
  cget: async (req, res) => {
    try {
      let discountQuery = await Discount.findAll({
        where: {
          ...req.query,
        },
      });
      if (!discountQuery) {
        throw new Error();
      }
      return res.status(200).json(discountQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  post: async (req, res) => {
    try {
      let discount = req.body;
      const discountCreate = await Discount.create(discount);
      return res.status(201).json({ message: 'Discount Added Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  get: async (req, res) => {
    try {
      let discountQuery = await Discount.findOne({
        where: {
          ...req.query,
        },
      });
      if (!discountQuery) {
        throw new Error();
      }
      return res.status(200).json(discountQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  put: async (req, res) => {
    try {
      let discount = req.body;
      const discountUpdate = await Discount.update(discount);
      return res.status(201).json({ message: 'Discount Updated Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  delete: async (req, res) => {
    try {
      let discount = req.body;
      const discountDelete = await Discount.destroy(discount);
      return res.status(201).json({ message: 'Discount Deleted Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },

  createDiscount: async (req, res) => {
    try {
      const discount = await Discount.create({
        name: 'discount',
        description: 'discount',
        discount: 10,
        start_at: '2020-01-01',
        end_at: '2023-01-01',
        treshold: 10,
        status: true,
        category_id: 1,
      });
      res.json(discount);
    } catch (err) {
      res.json(err);
    }
  },
};
