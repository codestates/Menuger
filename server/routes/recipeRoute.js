const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');

recipeRouter.post('/', recipeController.createPost.post);

recipeRouter.get('/:id', recipeController.readPost.get);

recipeRouter.patch('/:id', recipeController.updatePost.patch);

recipeRouter.delete('/:id', recipeController.deletePost.delete);

module.exports = recipeRouter;
