/**
 * Creates a validation middleware for the given schema
 *
 * @param {Object} schema - The Joi schema to validate against
 * @param {String} property - The request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */

export const validateReq = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: true, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown properties
    });

    // If validation passes, replace req[property] with validated value
    // This ensures type coercion and default values are applied
    if (!error) {
      req[property] = value;
      return next();
    }

    return res.status(400).json({
      ok: false,
      message: "Validation error",
    });
  };
};
