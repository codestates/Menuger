const { Router } = require('express');
const likeRouter = Router({ mergeParams: true });
const { likeController } = require('../controller');
const { checkToken } = require('../controller/utils/checktoken');

likeRouter.post('/', checkToken, likeController.uplike);

likeRouter.delete('/', checkToken, likeController.unlike);

module.exports = likeRouter;
