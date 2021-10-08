const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { commentController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

commentRouter.get('/', commentController.readComment);

commentRouter.post('/', checkToken, commentController.createComment);

commentRouter.delete('/:commentId', checkToken, commentController.deleteComment);

commentRouter.patch('/:commentId', checkToken, commentController.updateComment);

module.exports = commentRouter;
