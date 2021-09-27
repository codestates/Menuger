const { Router } = require('express');
const likeRouter = Router({ mergeParams: true });
const { likeController } = require('../controller');

likeRouter.post('/uplike', likeController.uplike);

likeRouter.post('/unlike', likeController.unlike);

module.exports = likeRouter;
