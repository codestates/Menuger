const { Router } = require('express');
const bookmarkRouter = Router({ mergeParams: true });
const { bookmarkController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

bookmarkRouter.post('/register', checkToken, bookmarkController.register);

bookmarkRouter.post('/unregister', checkToken, bookmarkController.unregister);

module.exports = bookmarkRouter;
