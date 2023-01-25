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
  sellerName: Joi.string().required().messages({
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

// {
//   "sellerName": "Delivery App Admin",
//   "totalPrice": 300.50,
//   "deliveryAddress": "rua dos bobos",
//   "deliveryNumber": "numero 1",
//   "products": [
//     { "productId": 1, "quantity": 5 },
//     { "productId": 2, "quantity": 8 },
//     { "productId": 99, "quantity": 8 }
//   ]
// }

module.exports = {
  loginSchema,
  registerSchema,
  saleSchema,
  productSchema,
  productArraySchema,
};