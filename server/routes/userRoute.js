const { Router } = require('express');
const userRouter = Router();
const { userController } = require('../controller');

userRouter.post('/signup', userController.signup.post);

userRouter.post('/signin', userController.signin.post);

userRouter.post('/signout', userController.signout.post);

userRouter.delete('/', userController.deleteaccount.delete);

module.exports = userRouter;
