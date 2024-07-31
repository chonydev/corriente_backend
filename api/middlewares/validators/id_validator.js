import { body, validationResult, checkSchema, param } from 'express-validator';  

const idSchema = {
  id: { 
    notEmpty:{errorMessage: "Not id"},
    in: ['body', 'query', 'params'],
    //isInt: {errorMessage: "id must be an integer"}
  }
}

const validateId = [
  checkSchema(idSchema),
  (req, res, next) => {    
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    
    const VALRES = validationResult(req);
    console.log(VALRES.errors);
    console.log(!!VALRES.errors.length);

    if (!!VALRES.errors.length) {
      console.log('req.params');
      return res.status(400).json({ errors: VALRES.array() });
    }
    next();
  }
];

export {
  validateId,
};