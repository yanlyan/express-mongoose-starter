'use strict';

module.exports = {
  app: {
    debug: true, // turn debugging on/off
    host: 'localhost', // your server host, usually localhost
    port: 3000 // port the server runs on
  },
  database: {
    host: '',
    database: '',
    username: '',
    password: '',
    port: 27017
  },
  jwtExpired: 3600,
  jwtSecret: 'express',
  env: 'development',
};