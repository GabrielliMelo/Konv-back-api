const validateSchemaMiddleware = (schema) => {
  return async function (request, response, next) {
    try {
      const objectToValidate = !Object.keys(request.body).length
        ? request.params
        : request.body;

      await schema.validate(objectToValidate);

      next();
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  };
};

module.exports = validateSchemaMiddleware;