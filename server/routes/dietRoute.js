const { Router } = require('express');
const dietRouter = Router();
const { dietController } = require('../controller');

dietRouter.post('/', dietController.createPost.post);

dietRouter.get('/:id', dietController.readPost.get);

module.exports = dietRouter;
