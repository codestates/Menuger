const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');

recipeRouter.post('/', recipeController.createPost.post);

module.exports = recipeRouter;
