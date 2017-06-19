module.exports = (express) => {
  let router = express.Router();


  router.use(require('../middlewares/AccessTokenMiddleware')
    .unless({
      path: [{
        url: '/users',
        methods: ['PUT']
      }, {
        url: '/users/login',
        methods: ['POST']
      }]
    }));

  const UserRoute = require('./UserRoute');
  router.use('/users', UserRoute);

  return router;
};