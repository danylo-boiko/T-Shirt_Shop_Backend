const {Customer} = require('./../database');

class CustomerController {
    getAll(req, res) {
        Customer.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving customers."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Customer.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving customer with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {name, surname, email, hashed_password} = req.body;

        if (!name) {
            res.status(400).send({
                message: "Name can't be empty!"
            });
            return;
        }

        if (!surname) {
            res.status(400).send({
                message: "Surname can't be empty!"
            });
            return;
        }

        if (!email) {
            res.status(400).send({
                message: "Email can't be empty!"
            });
            return;
        }
        if (!hashed_password) {
            res.status(400).send({
                message: "Hashed password can't be empty!"
            });
            return;
        }

        const customer = {
            name: name,
            surname: surname,
            email: email,
            hashed_password: hashed_password
        };

        Customer.create(customer)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the customer!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Customer.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                console.log(num);
                if (num[0] === 1) {
                    res.send({
                        message: "Customer was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update customer with id: ${id}. Maybe customer was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating customer with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Customer.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Customer was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete customer with id: ${id}. Maybe customer was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete customer with id: ${id}`
                });
            });
    };
}

module.exports = new CustomerController();