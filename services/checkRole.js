function checkRole(role) {
  return (req, res, next) => {
    if (res.locals.role === role) {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
}

module.exports = { checkRole };
