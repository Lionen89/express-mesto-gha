const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 's!Cr1T_kEy');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
