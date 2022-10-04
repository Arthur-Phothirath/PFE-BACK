const { Product } = require('../models');

// function product exist
const productExist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const where = id ? { id: id } : { name: req.body.name };
    let productExist = await Product.findOne({
      where,
    });
    res.locals.productExist = productExist;
    next();
  } catch (error) {
    res.status(500).json({ message: 'product already exist' });
  }
};

module.exports = { productExist };
