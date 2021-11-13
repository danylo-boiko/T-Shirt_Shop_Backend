const categoryRouter = require('express').Router();
const {categoryController} = require('./../controllers');

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.post('/', categoryController.create);
categoryRouter.put('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);

module.exports = categoryRouter;