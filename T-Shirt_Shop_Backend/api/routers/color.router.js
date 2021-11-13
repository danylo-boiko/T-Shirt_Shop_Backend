const colorRouter = require('express').Router();
const {colorController} = require('./../controllers');

colorRouter.get('/', colorController.getAll);
colorRouter.get('/:id', colorController.getById);
colorRouter.post('/', colorController.create);
colorRouter.put('/:id', colorController.update);
colorRouter.delete('/:id', colorController.delete);

module.exports = colorRouter;