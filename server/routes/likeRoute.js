const { Router } = require('express');
const likeRouter = Router({ mergeParams: true });
const { likeController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

likeRouter.post('/uplike', checkToken, likeController.uplike);

likeRouter.post('/unlike', checkToken, likeController.unlike);

module.exports = likeRouter;
