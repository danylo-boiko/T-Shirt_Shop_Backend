const {DeliveryMethod} = require('./../database');

class DeliveryMethodController {
    getAll(req, res) {
        DeliveryMethod.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving delivery methods."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        DeliveryMethod.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving delivery method with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {title, cost} = req.body;

        if (!title) {
            res.status(400).send({
                message: "Title can't be empty!"
            });
            return;
        }

        if (!cost) {
            res.status(400).send({
                message: "Cost can't be empty!"
            });
            return;
        }

        const deliveryMethod = {
            title: title,
            cost: cost
        };

        DeliveryMethod.create(deliveryMethod)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the delivery method!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        DeliveryMethod.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Delivery method was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update delivery method with id: ${id}. Maybe delivery method was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating delivery method with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        DeliveryMethod.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Delivery method was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete delivery method with id: ${id}. Maybe delivery method was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete delivery method with id: ${id}`
                });
            });
    };
}

module.exports = new DeliveryMethodController();