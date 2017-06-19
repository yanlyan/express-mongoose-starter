const util = require('util');

function UserValidator() {

  const login = (req, res, next) => {
    req.check('username').notEmpty().withMessage('Username tidak boleh kosong').isLength({
      min: 3
    }).withMessage('Username minimal 3 karakter');
    req.check('password').notEmpty().withMessage('Password tidak boleh kosong');
    req.getValidationResult().then(function (result) {
      if (!result.isEmpty()) {
        let error = new Error('Validation Error');
        error.code = 400;
        error.message = result.array();
        next(error);
      } else {
        next();
      }
    });
  }

  return {
    login
  }
}

module.exports = UserValidator();