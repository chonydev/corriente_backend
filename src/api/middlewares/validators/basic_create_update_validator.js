import Joi from "joi";
import { namePropSchema } from "./name_prop_validator.js";
import { idPropSchema } from "./id_validator.js";

export default class ValidatorGenerator {
  name;
  createObjSchema;
  updateObjSchema;
  bulkCreateObjSchema;
  bulkUpdateObjSchema;

  constructor(name) {
    this.name = name;
    this.createObjSchema = Joi.object({
      [`${this.name}`]: namePropSchema
    });
    this.updateObjSchema = Joi.object({
      id: idPropSchema,
      [`${this.name}`]: namePropSchema
    });
    this.bulkCreateObjSchema = Joi.array().items(this.createObjSchema).unique();
    this.bulkUpdateObjSchema = Joi.array().items(this.updateObjSchema).unique();
  }

  createValidator = (req, res, next) => {
    const result = this.createObjSchema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  }

  updateValidator = (req, res, next) => {
    const result = this.updateObjSchema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  }

  bulkCreateValidator = (req, res, next) => {
    const result = this.bulkCreateObjSchema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  }

  bulkUpdateValidator = (req, res, next) => {
    const result = this.bulkUpdateObjSchema.validate(req.body);
    if (result.error) {
      console.log(result.error);
      return res.status(400).json({ message: result.error.details[0].message });
    }
    next();
  }
}
