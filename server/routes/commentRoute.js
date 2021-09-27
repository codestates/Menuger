const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { commentController } = require('../controller');

commentRouter.get('/', commentController.readComment);

commentRouter.post('/', commentController.createComment);

commentRouter.delete('/:commentId', commentController.deleteComment);

commentRouter.patch('/:commentId', commentController.updateComment);

module.exports = commentRouter;
