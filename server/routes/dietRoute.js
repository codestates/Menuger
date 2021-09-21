const { Router } = require('express');
const dietRouter = Router();
const { dietController } = require('../controller');

dietRouter.post('/', dietController.createPost.post);

module.exports = dietRouter;
