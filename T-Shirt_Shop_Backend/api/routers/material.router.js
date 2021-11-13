const materialRouter = require('express').Router();
const {materialController} = require('./../controllers');

materialRouter.get('/', materialController.getAll);
materialRouter.get('/:id', materialController.getById);
materialRouter.post('/', materialController.create);
materialRouter.put('/:id', materialController.update);
materialRouter.delete('/:id', materialController.delete);

module.exports = materialRouter;