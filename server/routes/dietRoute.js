const { Router } = require('express');
const dietRouter = Router();
const { dietController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

dietRouter.post('/', checkToken, dietController.createPost);

dietRouter.get('/:id', dietController.readPost);

dietRouter.patch('/:id', checkToken, dietController.updatePost);

dietRouter.delete('/:id', checkToken, dietController.deletePost);

module.exports = dietRouter;
