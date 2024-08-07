import Joi from "joi";

const namePropSchema = Joi.string().trim().min(3).required().messages({
  'string.min': 'At least 3 characters length for the name',
  'any.required': 'Name is required'
})

const namesPropSchema = Joi.array().items(namePropSchema).unique().messages({
  'array.unique': 'Names must be unique'
});

export { 
  namePropSchema,
  namesPropSchema
  }