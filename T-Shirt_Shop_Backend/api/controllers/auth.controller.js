const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./../../config/default.json');
const {Customer} = require('./../database');

class AuthController {
    login(req, res) {
        const {email, password} = req.headers;

        if (!email) {
            return res.status(401).send({
                success: false,
                message: "Email can't be null!"
            })
        }

        if (!password) {
            return res.status(401).send({
                success: false,
                message: "Password can't be null!"
            })
        }

        Customer.findOne({
            where: {
                email: email
            }
        })
            .then(data => {
                let customer = data.dataValues;
                if (customer === undefined) {
                    return res.status(400).send({
                        success: false,
                        message: `Customer with email ${email} not found.`
                    })
                }

                if (!bcrypt.compareSync(password, customer.hashed_password)) {
                    return res.status(401).send({
                        success: false,
                        message: 'Invalid password!'
                    })
                }

                const token = jwt.sign({id: customer.id}, config.auth.secret);

                res.status(200).json({
                    success: true,
                    token: token
                });

            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving customer with email: ${email}.`
                })
            });
    }

    register(req, res) {
        const {name, surname, phone, email, password} = req.headers;

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

        if (!phone) {
            res.status(400).send({
                message: "Phone can't be empty!"
            });
            return;
        }

        if (!email) {
            res.status(400).send({
                message: "Email can't be empty!"
            });
            return;
        }

        if (!password) {
            res.status(400).send({
                message: "Password can't be empty!"
            });
            return;
        }

        const hashed_password = bcrypt.hashSync(password, 8);

        Customer.findOne({
            where: {
                email: email
            }
        })
            .then(data => {
                if (data === null) {
                    const customer = {
                        name: name,
                        surname: surname,
                        phone: phone,
                        email: email,
                        hashed_password: hashed_password
                    };
                    Customer.create(customer)
                        .then(data => {
                            res.send({
                                success: true
                            });
                        })
                } else {
                    res.status(400).send({
                        message: "Email already used!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving customer with email: ${email}.`
                })
            });
    };

    verifyToken(req, res) {
        const {token} = req.headers;

        if (!token) {
            return res.status(403).json({
                success: false,
                message: 'No token provided.'
            });
        }

        jwt.verify(token, config.auth.secret, (error, decoded) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }

            return res.status(200).json({
                success: true,
                customerId: decoded.id
            });
        });
    }
}

module.exports = new AuthController();