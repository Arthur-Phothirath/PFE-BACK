const { Order } = require('../models');

module.exports = {
  post: async (req, res) => {
    try {
      let order = req.body;
      const orderCreate = await Order.create(order);
      return res.status(201).json({ message: 'Order Added Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  get: async (req, res) => {
    try {
      let orderQuery = await Order.findOne({
        where: {
          ...req.query,
        },
      });
      if (!orderQuery) {
        throw new Error();
      }
      return res.status(200).json(orderQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  cget: async (req, res) => {
    try {
      let orderQuery = await Order.findAll({
        where: {
          ...req.query,
        },
      });
      if (!orderQuery) {
        throw new Error();
      }
      return res.status(200).json(orderQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  put: async (req, res) => {
    try {
      let order = req.body;
      const orderUpdate = await Order.update(order);
      return res.status(201).json({ message: 'Order Updated Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  delete: async (req, res) => {
    try {
      let order = req.body;
      const orderDelete = await Order.destroy(order);
      return res.status(201).json({ message: 'Order Deleted Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
};
