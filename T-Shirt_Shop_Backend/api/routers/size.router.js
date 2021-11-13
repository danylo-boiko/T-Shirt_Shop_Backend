const sizeRouter = require('express').Router();
const {sizeController} = require('./../controllers');

sizeRouter.get('/', sizeController.getAll);
sizeRouter.get('/:id', sizeController.getById);
sizeRouter.post('/', sizeController.create);
sizeRouter.put('/:id', sizeController.update);
sizeRouter.delete('/:id', sizeController.delete);

module.exports = sizeRouter;