const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const notAuthRoutes = ['/', '/login', '/register'];
  if (notAuthRoutes.includes(req.path)) return next();

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send({ msg: 'Acceso denegado.'});
  }

  try {
    const [, token] = authorization.split(' ');
    jwt.verify(token, 'SECRET');
  } catch (error) {
    return res.status(403).send({ msg: "Acceso denegado." });
  }
  
  return next();
};

module.exports = auth;
