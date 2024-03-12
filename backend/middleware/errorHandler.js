function errorHandler(err, req, res, next) {
  const errorMap = {
    'ValidationError': 400, // Error de validación
    'UnauthorizedError': 401, // Error de autenticación
    'NotFoundError': 404, // Error de recurso no encontrado
  };

  const errorCode = errorMap[err.name] || 500;
  const errorMessage = err.message || 'Ha ocurrido un error inesperado.';

  return res.status(errorCode).send({ message: errorMessage });
}
module.exports = errorHandler;