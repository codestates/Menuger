const { Router } = require('express');
const userRouter = Router();
const { userController } = require('../controller');

userRouter.post('/signup', userController.signup.post);

userRouter.post('/signin', userController.signin.post);

module.exports = userRouter;
