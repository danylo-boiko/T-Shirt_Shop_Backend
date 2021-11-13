const deliveryMethodRouter = require('express').Router();
const {deliveryMethodController} = require('./../controllers');

deliveryMethodRouter.get('/', deliveryMethodController.getAll);
deliveryMethodRouter.get('/:id', deliveryMethodController.getById);
deliveryMethodRouter.post('/', deliveryMethodController.create);
deliveryMethodRouter.put('/:id', deliveryMethodController.update);
deliveryMethodRouter.delete('/:id', deliveryMethodController.delete);

module.exports = deliveryMethodRouter;