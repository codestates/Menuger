const { Router } = require('express');
const dietRouter = Router();
const { dietController } = require('../controller');

dietRouter.post('/', dietController.createPost.post);

dietRouter.get('/:id', dietController.readPost.get);

dietRouter.patch('/:id', dietController.updatePost.patch);

dietRouter.delete('/:id', dietController.deletePost.delete);

module.exports = dietRouter;
