module.exports = (express) => {
  let router = express.Router();
  router.get('/', (req, res) => res.json({
    status: 200
  }));
  const UserRoute = require('./UserRoute');
  router.use('/users', UserRoute);

  return router;
};