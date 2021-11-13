const cartRouter = require('express').Router();
const {cartController} = require('./../controllers');

cartRouter.get('/', cartController.getAll);
cartRouter.get('/:customer_id', cartController.getByCustomerId);
cartRouter.post('/', cartController.create);
cartRouter.put('/:customer_id/:tshirt_details_id', cartController.update);
cartRouter.delete('/:customer_id/:tshirt_details_id', cartController.delete);

module.exports = cartRouter;