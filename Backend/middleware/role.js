const UserRole = require('../models/UserRole');
const Role = require('../models/Role');

module.exports = function(roles = []) {
  return async (req, res, next) => {
    try {
      const userRoles = await UserRole.findAll({ where: { user_id: req.user.id }, include: [Role] });
      const userRoleNames = userRoles.map(userRole => userRole.Role.role_name);
      
      if (!roles.some(role => userRoleNames.includes(role))) {
        return res.status(403).json({ msg: 'No tienes permiso para realizar esta acción' });
      }

      next();
    } catch (err) {
      res.status(500).json({ msg: 'Error del servidor' });
    }
  };
};
