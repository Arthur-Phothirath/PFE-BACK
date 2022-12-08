const { authenticateToken, createToken } = require('./authentication');
const { checkRole } = require('./checkRole');

module.exports = {
  authenticateToken,
  createToken,
  checkRole,
};
