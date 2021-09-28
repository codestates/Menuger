const { Router } = require('express');
const userRouter = Router();
const { userController } = require('../controller');

userRouter.post('/signup', userController.signup);

userRouter.post('/signin', userController.signin);

userRouter.post('/signout', userController.signout);

userRouter.delete('/', userController.deleteAccount);

userRouter.get('/:nickname', userController.info.get);

userRouter.patch('/', userController.info.patch);

userRouter.post('/subscribe/:nickname', userController.subscribe);

userRouter.post('/unsubscribe/:nickname', userController.unsubscribe);

module.exports = userRouter;
