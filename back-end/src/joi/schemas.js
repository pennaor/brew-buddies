const Joi = require('joi');

const StringEmpty = 'Invalid Fields';
const InvalidFields = 'Some required fields are missing';
const anyRequired = 'is required';

const positiveInteger = Joi.number().integer().min(1);

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

const productSchema = Joi.object({
  productId: positiveInteger.required().label('productId'),
  quantity: positiveInteger.required().label('quantity'),
});

const productArraySchema = Joi.array().items(productSchema).min(1).required()
  .label('products');

const saleSchema = Joi.object({
  sellerId: positiveInteger.required().label('sellerId').messages({
  anyRequired: `sellerName ${anyRequired}`,
  }),

  totalPrice: Joi.number().min(0).required().messages({
  anyRequired: `totalPrice ${anyRequired}`,
  }),

  deliveryAddress: Joi.string().required().messages({
  anyRequired: `deliveryAddress ${anyRequired}`,
  }),

  deliveryNumber: Joi.string().required().messages({
    anyRequired: `deliveryNumber ${anyRequired}`,
  }),
});

module.exports = {
  loginSchema,
  registerSchema,
  saleSchema,
  productSchema,
  productArraySchema,
};