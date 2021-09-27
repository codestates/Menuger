const { Router } = require('express');
const bookmarkRouter = Router({ mergeParams: true });
const { bookmarkController } = require('../controller');

bookmarkRouter.post('/register', bookmarkController.register);

bookmarkRouter.post('/unregister', bookmarkController.unregister);

module.exports = bookmarkRouter;
