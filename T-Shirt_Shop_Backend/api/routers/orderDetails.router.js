const orderDetailsRouter = require('express').Router();
const {orderDetailsController} = require('./../controllers');

orderDetailsRouter.get('/', orderDetailsController.getAll);
orderDetailsRouter.get('/:order_id', orderDetailsController.getByOrderId);
orderDetailsRouter.post('/', orderDetailsController.create);
orderDetailsRouter.put('/:order_id/:tshirt_details_id', orderDetailsController.update);
orderDetailsRouter.delete('/:order_id/:tshirt_details_id', orderDetailsController.delete);

module.exports = orderDetailsRouter;