const { Router } = require('express');
const searchRouter = Router();
const { searchController } = require('../controller');

searchRouter.post('/', searchController);

module.exports = searchRouter;
