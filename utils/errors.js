export default class ErrorTest extends Error {
  constructor(message, type) {
    super(message)
    this.name = this.constructor.name
    this._message = message
    this._type = type
    this.stack = new Error(message).stack
  }

  get message() {
    return this._message
  }
  set message(message) {
    this._message = message
  }
  get type() {
    return this._type
  }
  set type(type) {
    this._type = type
  }
}

export const loginErrors = (error) => {
  console.log(error)
  const errors = {
    email: '',
    password: '',
  }
  if (error.message.includes('email')) {
    errors.email = error.message
  }
  if (error.message.includes('password')) {
    errors.password = error.message
  }

  return errors
}

export const registerErrors = (error) => {
  let errorContent
  if (error.errors) {
    errorContent = error.errors
  } else {
    errorContent = error.parent
  }

  const errors = {
    prenom: '',
    email: '',
    password: '',
    nom: '',
    telephone: '',
    siteWeb: '',
  }

  // Validations
  if (Array.isArray(errorContent)) {
    const first = errorContent[0]

    if (first?.path === 'telephone' && first?.type.includes('Validation')) {
      errors.telephone = 'numero au moins 10 caracteres'
    }

    if (first?.path === 'password' && first?.type.includes('Validation')) {
      errors.password = 'le password est au moins 8 caracteres'
    }

    if (first?.path === 'email' && first?.type.includes('Validation')) {
      errors.password = "email n'est pas valide"
    }

    if (first?.path === 'email' && first?.type.includes('violation')) {
      errors.email = 'email est déjà utilisé'
    }

    if (first?.path === 'siteWeb' && first?.type.includes('Validation')) {
      errors.siteWeb = "l'url n'est pas valide"
    }

    if (first?.path === 'telephone' && first?.type.includes('violation')) {
      errors.telephone = 'le numéro est déjà utilisé'
    }
  } else {
    if (errorContent?.sqlMessage.includes('telephone')) {
      errors.telephone = 'le telephone est obligatoire'
    }
    if (errorContent?.sqlMessage.includes('nom')) {
      errors.nom = 'le nom est obligatoire'
    }
    if (errorContent?.sqlMessage.includes('prenom')) {
      errors.prenom = 'le prenom est obligatoire'
    }
    if (errorContent?.sqlMessage.includes('password')) {
      errors.password = 'password est obligatoire'
    }
  }

  // Contraintes

  return errors
}
