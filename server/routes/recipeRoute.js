const { Router } = require('express');
const recipeRouter = Router();
const { recipeController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');
const { upload } = require('../middleware/imageUpload');

recipeRouter.post('/', checkToken, upload.array('image', 5), recipeController.createPost);

recipeRouter.get('/:id', recipeController.readPost);

recipeRouter.get('/', recipeController.readPostList);

recipeRouter.patch('/:id', checkToken, recipeController.updatePost);

recipeRouter.delete('/:id', checkToken, recipeController.deletePost);

recipeRouter.post('/presigned', recipeController.createPresigned);

module.exports = recipeRouter;
