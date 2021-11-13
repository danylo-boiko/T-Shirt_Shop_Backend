const statusRouter = require('express').Router();
const {statusController} = require('./../controllers');

statusRouter.get('/', statusController.getAll);
statusRouter.get('/:id', statusController.getById);
statusRouter.post('/', statusController.create);
statusRouter.put('/:id', statusController.update);
statusRouter.delete('/:id', statusController.delete);

module.exports = statusRouter;