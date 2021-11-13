const typeRouter = require('express').Router();
const {typeController} = require('./../controllers');

typeRouter.get('/', typeController.getAll);
typeRouter.get('/:id', typeController.getById);
typeRouter.post('/', typeController.create);
typeRouter.put('/:id', typeController.update);
typeRouter.delete('/:id', typeController.delete);

module.exports = typeRouter;