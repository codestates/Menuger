const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { commentController } = require('../controller');

commentRouter.post('/', commentController.createComment);

module.exports = commentRouter;
