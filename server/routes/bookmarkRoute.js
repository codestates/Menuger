const { Router } = require('express');
const bookmarkRouter = Router({ mergeParams: true });
const { bookmarkController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

bookmarkRouter.post('/', checkToken, bookmarkController.register);

bookmarkRouter.delete('/', checkToken, bookmarkController.unregister);

module.exports = bookmarkRouter;
