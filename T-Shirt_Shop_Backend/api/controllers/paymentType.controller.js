const {PaymentType} = require('./../database');

class PaymentTypeController {
    getAll(req, res) {
        PaymentType.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving payment types."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        PaymentType.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving payment type with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {title} = req.body;

        if (!title) {
            res.status(400).send({
                message: "Title can't be empty!"
            });
            return;
        }

        const paymentType = {
            title: title
        };

        PaymentType.create(paymentType)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the payment type!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        PaymentType.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Payment type was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update payment type with id: ${id}. Maybe payment type was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating category with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        PaymentType.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Payment type was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete payment type with id: ${id}. Maybe payment type was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete category with id: ${id}`
                });
            });
    };
}

module.exports = new PaymentTypeController();