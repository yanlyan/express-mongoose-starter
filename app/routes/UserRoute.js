const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const ResponseMiddleware = require('../middlewares/ResponseMiddleware');

router.get('/', userController.all, ResponseMiddleware);
router.put('/', userController.create, ResponseMiddleware);

router.post('/login', userController.login, ResponseMiddleware);

module.exports = router;