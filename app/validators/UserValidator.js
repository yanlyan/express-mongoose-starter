const util = require('util');

function UserValidator() {



  const login = (req, res, next) => {

    const loginValidator = {
      username: {
        notEmpty: true,
        isLength: {
          options: [{
            min: 3
          }],
          errorMessage: "Username minimal 3 Karakter"
        },
        errorMessage: "Username tidak boleh kosong"
      },

      password: {
        notEmpty: true,
        errorMessage: "Password tidak boleh kosong"
      }
    };

    req.check(loginValidator)
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