const tshirtDetailsRouter = require('express').Router();
const {tshirtDetailsController} = require('./../controllers');

tshirtDetailsRouter.get('/', tshirtDetailsController.getAll);
tshirtDetailsRouter.get('/:id', tshirtDetailsController.getById);
tshirtDetailsRouter.post('/', tshirtDetailsController.create);
tshirtDetailsRouter.put('/:id', tshirtDetailsController.update);
tshirtDetailsRouter.delete('/:id', tshirtDetailsController.delete);

module.exports = tshirtDetailsRouter;