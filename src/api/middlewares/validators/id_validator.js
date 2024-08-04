import Joi from "joi";

const idPropSchema = Joi.number().integer().positive().required().messages({
  'number.base': 'id must be a number',
  'number.integer': 'id must be an integer',
  'number.positive': 'id must be positive',
  'any.required': 'id is required'})

const idSchema = Joi.object({
  id: idPropSchema
});

const idValidator = (req, res, next) => {
  //^ wide input implementation (params, body) or assign only params and manage from schema
  /*
  let result;
  if (!!req.params.id) { result = idSchema.validate(req.params) }
  else if (!!req.body.id) { result = idSchema.validate(req.body) }
  else { res.status(404).json({ message: 'empty params and body' }); }
  */
 console.log(req.params)
  const result = idSchema.validate(req.params)
  if (!!result.error) {
    console.log(result.error)
    return res.status(404).json({ message: result.error });
  }
  next()
}

const idsPropSchema = Joi.array().items(idPropSchema).unique().messages({
  'array.unique': 'IDs must be unique'
});
/*
const idsSchema = Joi.object({
  ids: idsPropSchema
});
*/
const idsValidator = (req, res, next) => {
  const result = idsPropSchema.validate(req.body)
 
  console.log(result);
  if (!!result.error) {
    console.log(result.error)
    return res.status(404).json({ message: result.error });
  }
  next()
}

export {
  //
  idPropSchema,
  idValidator,
  //
  idsValidator
}