const config = require('../config/config');
const jwt = require('jsonwebtoken');

/**
 * JWT Service
 *
 * @returns {{encode: encode, decode: decode}}
 * @constructor
 */
function JWTService() {

  /**
   * Generate a new JWT token, accepting payload object containing
   * authentication info (such as user ID)
   *
   * @param payload
   */
  const encode = function (payload) {
    return jwt.sign(payload, config.getJWTSecret(), {
      algorithm: 'HS256'
    });
  };

  /**
   * Decode JWT token, returns object if succeed, otherwise returns false
   *
   * @param token
   * @returns {boolean|object}
   */
  const decode = function (token) {
    try {
      return jwt.verify(token, config.getJWTSecret());
    } catch (e) {
      return false;
    }
  };

  return {
    encode,
    decode
  };

}

module.exports = JWTService();