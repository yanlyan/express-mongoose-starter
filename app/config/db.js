var config = require('./config');

const mongoose = require('mongoose');
const Promise = require('bluebird');

const db = mongoose.connection;

const mongoConfig = config.getDatabaseConfig();
const connection = `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;

db.on('connecting', function () {
  // console.log('connecting to MongoDB...');
});

db.on('error', function (error) {
  // console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', function () {
  // console.log('MongoDB connected!');
});
db.once('open', function () {
  // console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  // console.log('MongoDB reconnected!');
});
db.on('disconnected', function () {
  mongoose.connect(connection, {
    server: {
      auto_reconnect: true
    }
  });
});

mongoose.connect(connection, {
  server: {
    auto_reconnect: true
  }
});
mongoose.set('debug', false);
mongoose.Promise = Promise;

module.exports = mongoose;