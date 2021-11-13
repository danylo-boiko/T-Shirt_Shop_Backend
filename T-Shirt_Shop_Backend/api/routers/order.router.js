const orderRouter = require('express').Router();
const {orderController} = require('./../controllers');

orderRouter.get('/', orderController.getAll);
orderRouter.get('/:id', orderController.getById);
orderRouter.post('/', orderController.create);
orderRouter.put('/:id', orderController.update);
orderRouter.delete('/:id', orderController.delete);

module.exports = orderRouter;