const tshirtRouter = require('express').Router();
const {tshirtController} = require('./../controllers');

tshirtRouter.get('/', tshirtController.getAll);
tshirtRouter.get('/:id', tshirtController.getById);
tshirtRouter.post('/', tshirtController.create);
tshirtRouter.put('/:id', tshirtController.update);
tshirtRouter.delete('/:id', tshirtController.delete);

module.exports = tshirtRouter;