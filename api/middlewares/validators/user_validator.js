//const { body, validationResult, checkSchema } = require('express-validator');
import { body, validationResult, checkSchema } from 'express-validator';  

const userSchema = {
  username: {
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: 'Nombre de usuario debe tener por lo menos 3 caracteres.'
    }
  },
  email: {
    isEmail: {
      errorMessage: 'Debe ser un email válido.'
    },
    normalizeEmail: true
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long'
    }
  }
};

const validateCreateUser = [
/*
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  */

  checkSchema(userSchema),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateCreateUser
};

