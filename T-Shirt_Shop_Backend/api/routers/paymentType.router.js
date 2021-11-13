const paymentTypeRouter = require('express').Router();
const {paymentTypeController} = require('./../controllers');

paymentTypeRouter.get('/', paymentTypeController.getAll);
paymentTypeRouter.get('/:id', paymentTypeController.getById);
paymentTypeRouter.post('/', paymentTypeController.create);
paymentTypeRouter.put('/:id', paymentTypeController.update);
paymentTypeRouter.delete('/:id', paymentTypeController.delete);

module.exports = paymentTypeRouter;