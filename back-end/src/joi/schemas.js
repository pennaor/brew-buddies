const Joi = require('joi');

const StringEmpty = 'Invalid Fields';
const InvalidFields = 'Some required fields are missing';

const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    stringEmpty: StringEmpty,
    anyRequired: InvalidFields,
  }),
  password: Joi.string().required().min(6).messages({
    stringEmpty: StringEmpty,
    anyRequired: InvalidFields,
  }),
});

const registerSchema = Joi.object({
  name: Joi.string().required().min(12).messages({
    stringEmpty: StringEmpty,
    anyRequired: InvalidFields,
  }),

  email: Joi.string().required().email().messages({
    stringEmpty: StringEmpty,
    anyRequired: InvalidFields,
  }),
  
  password: Joi.string().required().min(6).messages({
    stringEmpty: StringEmpty,
    anyRequired: InvalidFields,
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
};