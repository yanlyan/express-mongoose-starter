const Promise = require('bluebird');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const HttpStatus = require('http-status-code');
const UserModel = require('./../models/UserModel');

function UserService() {

  const getById = (id) => {
    return new Promise((resolve, reject) => {
      UserModel.findById(id)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const authenticate = (identifier, credentials) => {

    var auth = UserModel.findOne({
      username: identifier
    });

    return new Promise(function (resolve, reject) {
      auth.then(function (user) {
          if (user) {
            if (bcrypt.compareSync(credentials, user.password)) {
              resolve(user);
            } else {
              let error = Error('Username atau password tidak cocok.');
              error.code = HttpStatus.UNAUTHORIZED;
              reject(error);
            }

          } else {
            let error = Error('User tidak ditemukan.');
            error.code = HttpStatus.UNAUTHORIZED;
            reject(error);
          }
        })
        .catch(function (e) {
          reject(e);
        });
    });
  };

  return {
    getById,
    authenticate
  };

}

module.exports = UserService();