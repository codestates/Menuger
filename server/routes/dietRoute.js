const { Router } = require('express');
const dietRouter = Router();
const { dietController } = require('../controller');

dietRouter.post('/', dietController.createPost);

dietRouter.get('/:id', dietController.readPost);

dietRouter.patch('/:id', dietController.updatePost);

dietRouter.delete('/:id', dietController.deletePost);

module.exports = dietRouter;
