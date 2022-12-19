const {
  User,
  CartItem,
  Category,
  Discount,
  Order,
  Product,
} = require('../models');

module.exports = {
  // create admin user
  createAdmin: async (req, res) => {
    console.log('createAdmin');
    try {
      const user = await User.create({
        name: 'admin',
        contactNumber: '1',
        email: 'admin.com',
        password: 'admin',
        valided: 1,
        role: 'admin',
      });
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },
  // create guest user
  createGuest: async (req, res) => {
    try {
      const user = await User.create({
        name: 'guest',
        contactNumber: '1',
        email: 'guest.com',
        password: 'guest',
        valided: 0,
        role: 'guest',
      });
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  },
  createCarteItem: async (req, res) => {
    try {
      const cart_item = await CartItem.create({
        name: 'cart_item',
        description: 'cart_item',
        unit_price: 100,
        quantity: 10,
        status: true,
        product_id: 1,
        order_id: 2,
      });
      res.json(cart_item);
    } catch (err) {
      res.json(err);
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await Category.create({
        name: 'fiction',
        description: 'category',
        // discount: 1,
      });
      res.json(category);
    } catch (err) {
      res.json(err);
    }
  },
  createDiscount: async (req, res) => {
    try {
      const discount = await Discount.create({
        name: 'discount',
        description: 'discount',
        sold: 10,
        start_at: '2020-01-01',
        end_at: '2023-01-01',
        treshold: 10,
        status: true,
        categories: [1],
      });
      res.json(discount);
    } catch (err) {
      res.json(err);
    }
  },
  createOrder: async (req, res) => {
    try {
      const order = await Order.create({
        status: 'pending',
        user_id: 1,
      });
      res.json(order);
    } catch (err) {
      res.json(err);
    }
  },
  createProduct: async (req, res, next) => {
    try {
      const product = await Product.create({
        name: 'product',
        description: 'product',
        price_init: 100,
        price_sale: 90,
        status: true,
        categories: [1],
      });
      res.json(product);
    } catch (err) {
      res.json(err);
    }
  },
};
