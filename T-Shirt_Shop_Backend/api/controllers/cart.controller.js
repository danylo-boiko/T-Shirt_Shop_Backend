const {Cart, TShirtDetails} = require('./../database');

class CartController {
    getAll(req, res) {
        Cart.findAll({
            include: [
                {
                    model: TShirtDetails,
                    as: 'tshirt_details',
                    attributes: ['id'],
                    include: ['type','color', 'size', 'material']
                }
            ]
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

    getByCustomerId(req, res) {
        const customer_id = req.params.customer_id;
        Cart.findAll({
            where: {
                customer_id: customer_id
            },
            include: [
                {
                    model: TShirtDetails,
                    as: 'tshirt_details',
                    attributes: ['id'],
                    include: ['type','color', 'size', 'material']
                }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving cart with id: ${customer_id}.`
                })
            });
    };

    create(req, res) {
        const {customer_id, tshirt_details_id, count} = req.body;
        if (!customer_id) {
            res.status(400).send({
                message: "Customer id can't be empty!"
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

        const cart = {
            customer_id: customer_id,
            tshirt_details_id: tshirt_details_id,
            count: count
        };

        Cart.create(cart)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the cart item!"
                });
            });
    };

    update(req, res) {
        const {customer_id, tshirt_details_id} = req.params;

        Cart.update(req.body, {
            where: {
                customer_id: customer_id,
                tshirt_details_id: tshirt_details_id
            },
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Cart item was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update cart item. Maybe cart item was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating cart item`
                })
            });
    };

    delete(req, res) {
        const {customer_id, tshirt_details_id} = req.params;

        Cart.destroy({
            where: {
                customer_id: customer_id,
                tshirt_details_id: tshirt_details_id
            },
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Cart item was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete cart item. Maybe cart item was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete cart item.`
                });
            });
    };
}

module.exports = new CartController();