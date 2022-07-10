const validateSchemaMiddleware = (schema) => {
  return async function (request, response, next) {
    try {
      await schema.validate(request.body);

      next();
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
};

module.exports = validateSchemaMiddleware;