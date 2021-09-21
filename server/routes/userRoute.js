const { Router } = require('express');
const userRouter = Router();
const { userController } = require('../controller');

userRouter.post('/signup', userController.signup.post);

userRouter.post('/signin', userController.signin.post);

userRouter.post('/signout', userController.signout.post);

userRouter.delete('/', userController.deleteAccount.delete);

userRouter.get('/:nickname', userController.info.get);

userRouter.patch('/', userController.info.patch);

module.exports = userRouter;
