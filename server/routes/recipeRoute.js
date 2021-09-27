const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');

recipeRouter.post('/', recipeController.createPost);

recipeRouter.get('/:id', recipeController.readPost);

recipeRouter.get('/', recipeController.readPostList);

recipeRouter.patch('/:id', recipeController.updatePost);

recipeRouter.delete('/:id', recipeController.deletePost);

module.exports = recipeRouter;
