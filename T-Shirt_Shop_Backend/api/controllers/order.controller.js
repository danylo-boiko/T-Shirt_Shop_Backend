const {Order, OrderDetails} = require('./../database');

class OrderController {
    getAll(req, res) {
        Order.findAll({
            include: ['order_details', 'status', 'delivery_method', 'payment_type']
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving cart."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;
        Order.findByPk(id, {
            include: ['order_details', 'status', 'delivery_method', 'payment_type']
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving order with id: ${id}.`
                });
            });
    };

    create(req, res) {
        const {customer_id, status_id, delivery_method_id, payment_type_id, delivery_address, order_time} = req.body;

        if (!customer_id) {
            res.status(400).send({
                message: "Customer id can't be empty!"
            });
            return;
        }

        if (!status_id) {
            res.status(400).send({
                message: "Status id can't be empty!"
            });
            return;
        }

        if (!delivery_method_id) {
            res.status(400).send({
                message: "Delivery method id can't be empty!"
            });
            return;
        }

        if (!payment_type_id) {
            res.status(400).send({
                message: "Payment type id can't be empty!"
            });
            return;
        }

        if (!delivery_address) {
            res.status(400).send({
                message: "Delivery address can't be empty!"
            });
            return;
        }

        if (!order_time) {
            res.status(400).send({
                message: "Order time can't be empty!"
            });
            return;
        }

        const order = {
            customer_id: customer_id,
            status_id: status_id,
            delivery_method_id: delivery_method_id,
            payment_type_id: payment_type_id,
            delivery_address: delivery_address,
            order_time: order_time
        };

        Order.create(order)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the order!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Order.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Order was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update order with id: ${id}. Maybe order was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating order with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Order.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Order was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete order with id: ${id}. Maybe order was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete order with id: ${id}`
                });
            });
    };
}

module.exports = new OrderController();