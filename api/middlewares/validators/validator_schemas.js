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

const political_parties_schema = {
  
}


export {
  political_parties_schema,
  userSchema


}