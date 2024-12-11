import * as Joi from '@hapi/joi';

export const SendMailSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 3 characters long',
      'any.required': 'Name is required',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
    }),

    tel: Joi.number()
    .min(100000)  // Minimum 6-digit number (adjust as necessary)
    .max(999999999999999)  // Maximum 15-digit number (adjust as necessary)
    .required()
    .messages({
      'number.base': 'Phone number must be a number',
      'number.min': 'Phone number must be at least 6 digits long',
      'number.max': 'Phone number must be at most 15 digits long',
      'any.required': 'Phone number is required',
    }),
  

  message: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.base': 'Message must be a string',
      'any.required': 'Message is required',
    }),


    // Making address nullable
  address: Joi.string()
  .min(5)
  .max(255)
  .allow(null)  // Allows address to be null
  .messages({
    'string.base': 'Address must be a string',
    'string.min': 'Address must be at least 5 characters long',
    'string.max': 'Address must be at most 255 characters long',
  }),
});
