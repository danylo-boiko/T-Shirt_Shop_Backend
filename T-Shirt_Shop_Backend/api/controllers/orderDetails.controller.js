const {OrderDetails} = require('./../database');

class OrderDetailsController {
    getAll(req, res) {
        OrderDetails.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving order details."
                });
            });
    };

    getByOrderId(req, res) {
        const order_id = req.params.order_id;

        OrderDetails.findAll({
            where: {
                order_id: order_id
            },
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving order details with id: ${order_id}.`
                })
            });
    };

    create(req, res) {
        const {order_id, tshirt_details_id, count, price_per_one} = req.body;

        if (!order_id) {
            res.status(400).send({
                message: "Order id can't be empty!"
            });
            return;
        }

        if (!tshirt_details_id) {
            res.status(400).send({
                message: "T-shirt details id can't be empty!"
            });
            return;
        }

        if (!count) {
            res.status(400).send({
                message: "Count can't be empty!"
            });
            return;
        }

        if (!price_per_one) {
            res.status(400).send({
                message: "Price per one id can't be empty!"
            });
            return;
        }

        const orderDetails = {
            order_id: order_id,
            tshirt_details_id: tshirt_details_id,
            count: count,
            price_per_one: price_per_one,
        };

        OrderDetails.create(orderDetails)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the order details!"
                });
            });
    };

    update(req, res) {
        const {order_id, tshirt_details_id} = req.params;

        OrderDetails.update(req.body, {
            where: {
                order_id: order_id,
                tshirt_details_id: tshirt_details_id
            },
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Order details was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update order details. Maybe order details was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating order details`
                })
            });
    };

    delete(req, res) {
        const {order_id, tshirt_details_id} = req.params;

        OrderDetails.destroy({
            where: {
                order_id: order_id,
                tshirt_details_id: tshirt_details_id
            },
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Order details was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete order details. Maybe order details was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete order details."
                });
            });
    };
}

module.exports = new OrderDetailsController();