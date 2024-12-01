import { checkSchema } from 'express-validator';

const paginationSchema = {
  offset: {
    optional: true,
    isInt: {
      errorMessage: 'Offset must be an integer'
    },
    toInt: true
  },
  orderBy: {
    optional: true,
    isString: {
      errorMessage: 'OrderBy must be a string'
    },
    trim: true
  }
};

const validatePagination = checkSchema(paginationSchema);

module.exports = validatePagination;