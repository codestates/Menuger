const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');

recipeRouter.post('/', recipeController.createPost.post);

recipeRouter.get('/:id', recipeController.readPost.get);

module.exports = recipeRouter;
