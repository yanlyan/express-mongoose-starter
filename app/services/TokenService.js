const Promise = require('bluebird');
const UserService = require('./UserService');
const JwtService = require('./JWTService');

function TokenService() {
  function decodeToken(token) {
    token = token.replace('Bearer ', '');
    let decoded = JwtService.decode(token);
    // if (decoded.exp && (decoded.exp <= Date.now())) {
    if (!decoded.exp) {
      let error = Error('Token tidak valid');
      error.code = 401;
      throw error;
    } else {
      // should check if `decoded.sub` is present?
      let user = decoded.sub;
      if (!user) {
        let error = new Error();
        error.code = 401;
        error.message = 'Token tidak valid.';
        throw error;
      }
      // check if token is expired
      return new Promise(function (resolve, reject) {
        UserService.getById(user.id)
          .then(function (p) {
            if (p) {
              let user = p.toJSON();
              resolve({
                user: user,
              });
            } else {
              let error = new Error();
              error.code = 401;
              error.message = 'User tidak ditemukan';
              reject(error);
            }
          }, function (error) {
            error.code = 401;
            error.message = 'Tidak dapat mengambil data user.';
            reject(error);
          });
      });
    }
  }
  return {
    decodeToken: decodeToken
  };
}

module.exports = TokenService();