const moment = require('moment');
const JWTService = require('../services/JWTService');
const UserService = require('../services/UserService');

const getUserObj = (req) => {
  return {
    username: req.input('username', null),
    password: req.input('password', null),
    full_name: req.input('full_name', null),
    email: req.input('email', null),
    role: req.input('role', null)
  };
};
/**
 * User Controller
 *
 * @constructor
 */
function UserController() {

  const login = (req, res, next) => {
    let username = req.input('username');
    let password = req.input('password');

    var authUser = UserService.authenticate(username, password);
    return authUser.then((user) => {
      var payload = {
        iss: req.hostname,
        exp: moment().add(3600, 'Seconds').valueOf(),
        sub: {
          id: user.get('id'),
          username: user.get('username'),
          role: user.get('role')
        },
        iat: moment().unix(),
        jti: 'user'
      };
      req.data = user;
      req.token = JWTService.encode(payload);
      next();
    }).catch(err => {
      next(err);
    });
  };

  const create = (req, res, next) => {
    const user = getUserObj(req);
    UserService.create(user)
      .then(user => {
        req.data = user;
        next();
      })
      .catch(err => {
        next(err);
      });
  };

  const update = (req, res, next) => {
    let id = req.input('id');
    let userObj = getUserObj(req);
    return UserService.update(id, userObj).then((user) => {
      req.data = user;
      return next();
    }).catch(err => {
      return next(err);
    });
  };

  const all = (req, res, next) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.query;
    let skip = limit * page;
    UserService.getAll(skip, limit, query)
      .then(users => {
        req.data = users;
        next();
      })
      .catch(err => {
        next(err);
      });
  };


  return {
    all,
    create,
    login,
    update
  };
}

module.exports = UserController();