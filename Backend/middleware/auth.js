const jwt = require('jsonwebtoken');

const revokedTokens = [];

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  if (revokedTokens.includes(token)) {
    return res.status(401).json({ msg: 'Token revocado, autorización denegada' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token no es válido' });
  }
};
