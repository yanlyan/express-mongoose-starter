const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

const inputAccessor = require('./app/middlewares/InputAccessorMiddleware');
const appRoutes = require('./app/routes/Index');

const app = express();

app.use(bodyParser.json({
  limit: '5mb'
}));

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '5mb'
}));

// validation
app.use(expressValidator);

// handle CORS
var originsWhitelist = [
  'http://localhost:4200',
  'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function (origin, callback) {
    var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(inputAccessor);

// handle routes
app.use(appRoutes(express));

// handle 404 error
app.use((req, res, next) => {
  let err = new Error('Path Not Found');
  err.status = 404;
  next(err);
});

// handle server error
app.use((err, req, res, next) => {
  let statusCode = err.code;
  if (statusCode >= 100 && statusCode < 600)
    res.status(statusCode);
  else
    res.status(500);
  let message = err.message;
  delete err.message;
  delete err.code;
  res.json({
    status: false,
    message: message,
    data: config.isDevelopment() ? err : {}
  });
});

module.exports = app;