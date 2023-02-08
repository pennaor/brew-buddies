const Joi = require('joi');

const StringEmpty = 'Invalid Fields';
const InvalidFields = 'Some required fields are missing';
const anyRequired = 'is required';

const positiveIntegerSchema = Joi.number().integer().min(1);

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
  productId: positiveIntegerSchema.required().label('productId'),
  quantity: positiveIntegerSchema.required().label('quantity'),
});

const productArraySchema = Joi.array().items(productSchema).min(1).required()
  .label('products');

const saleSchema = Joi.object({
  sellerId: positiveIntegerSchema.required().label('sellerId').messages({
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

const saleStatusSchema = Joi.valid('Em Trânsito', 'Pendente', 'Preparando', 'Entregue');

const updateSaleStatusSchema = Joi.object({
  saleId: positiveIntegerSchema.label('saleId').required(),
  status: saleStatusSchema.required(),
});

const roleStatusSchema = Joi.valid('administrator', 'seller', 'customer');

const adminRegisterSchema = registerSchema.append({ role: roleStatusSchema.required() });

module.exports = {
  loginSchema,
  registerSchema,
  saleSchema,
  productSchema,
  productArraySchema,
  saleStatusSchema,
  positiveIntegerSchema,
  updateSaleStatusSchema,
  adminRegisterSchema,
};