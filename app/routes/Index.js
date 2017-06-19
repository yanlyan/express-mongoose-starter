module.exports = (express) => {
  const router = express.Router();

  router.use(require('../middlewares/AccessTokenMiddleware')
    .unless({

    }));


  const UserRoute = require('./UserRoute');
  router.use('users/', UserRoute);

  return router;
};