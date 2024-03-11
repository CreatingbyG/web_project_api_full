const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'No autorizado. No se encontró el token.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);


    req.user = payload;

    next();
  } catch (error) {
    res.status(401).send({ message: 'No autorizado. Token inválido.' });
  }
};

module.exports = auth;