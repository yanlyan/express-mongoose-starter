const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const UserValidator = require('../validators/UserValidator');
const ResponseMiddleware = require('../middlewares/ResponseMiddleware');

router.get('/', UserController.all, ResponseMiddleware);
router.put('/', UserController.create, ResponseMiddleware);

router.post('/login', UserValidator.login, UserController.login, ResponseMiddleware);

module.exports = router;