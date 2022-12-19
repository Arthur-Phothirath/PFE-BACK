const { CartItem } = require('../models');

module.exports = {
  post: async (req, res) => {
    try {
      let CartItem = req.body;
      const cart_itemCreate = await CartItem.create(CartItem);
      return res.status(201).json({ message: 'CartItem Added Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  cget: async (req, res) => {
    try {
      let cart_itemQuery = await CartItem.findAll({
        where: {
          ...req.query,
        },
      });
      if (!cart_itemQuery) {
        throw new Error();
      }
      return res.status(200).json(cart_itemQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  get: async (req, res) => {
    try {
      let cart_itemQuery = await CartItem.findOne({
        where: {
          ...req.query,
        },
      });
      if (!cart_itemQuery) {
        throw new Error();
      }
      return res.status(200).json(cart_itemQuery);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  put: async (req, res) => {
    try {
      let CartItem = req.body;
      const cart_itemUpdate = await CartItem.update(CartItem);
      return res.status(201).json({ message: 'CartItem Updated Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
  delete: async (req, res) => {
    try {
      let CartItem = req.body;
      const cart_itemDelete = await CartItem.destroy(CartItem);
      return res.status(201).json({ message: 'CartItem Deleted Successfully' });
    } catch ({ message }) {
      res.status(400).json({ message: 'Internals issues' });
    }
  },
};
