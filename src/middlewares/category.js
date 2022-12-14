const { Category } = require('../models');

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
    res.status(500).json({ message: 'Internal issue.' });
  }
};

module.exports = { categoryExist };
