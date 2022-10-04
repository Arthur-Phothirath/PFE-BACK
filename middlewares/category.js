const { Category } = require('../models');

// function product exist
const categoryExist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const where = id ? { id: id } : { name: req.body.name };
    let categoryExist = await Category.findOne({
      where,
    });
    res.locals.categoryExist = categoryExist;
    next();
  } catch (error) {
    res.status(500).json({ message: 'category already exist' });
  }
};

module.exports = { categoryExist };
