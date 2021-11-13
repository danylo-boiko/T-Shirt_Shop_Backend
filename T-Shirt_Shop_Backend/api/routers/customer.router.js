const customerRouter = require('express').Router();
const {customerController} = require('./../controllers');

customerRouter.get('/', customerController.getAll);
customerRouter.get('/:id', customerController.getById);
customerRouter.post('/', customerController.create);
customerRouter.put('/:id', customerController.update);
customerRouter.delete('/:id', customerController.delete);

module.exports = customerRouter;