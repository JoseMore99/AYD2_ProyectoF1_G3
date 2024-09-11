// middleware/authorize.js
const jwt = require('jsonwebtoken');
const { User, Role, RolePermission, Permission } = require('../models');

const authorize = (requiredPermissions = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'No autorizado' });

            const decoded = jwt.verify(token, 'secret_key'); // Usa tu clave secreta
            const user = await User.findByPk(decoded.userId);

            if (!user) return res.status(401).json({ message: 'No autorizado' });

            const userRoles = await user.getRoles();
            const roleIds = userRoles.map(role => role.id);

            const permissions = await Permission.findAll({
                include: {
                    model: Role,
                    where: {
                        id: roleIds
                    }
                }
            });

            const userPermissions = permissions.flatMap(permission => permission.RolePermissions.map(rp => rp.permission_id));
            
            if (!requiredPermissions.every(permission => userPermissions.includes(permission))) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'No autorizado' });
        }
    };
};

module.exports = authorize;
