const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

recipeRouter.post('/', checkToken, recipeController.createPost);

recipeRouter.get('/:id', recipeController.readPost);

recipeRouter.get('/', recipeController.readPostList);

recipeRouter.patch('/:id', checkToken, recipeController.updatePost);

recipeRouter.delete('/:id', checkToken, recipeController.deletePost);

module.exports = recipeRouter;
