const Joi = require('joi');

const VALIDATION_SCHEMAS = {
  userSchema: Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  addDoctorAvailability: Joi.object({
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
  }),
};
