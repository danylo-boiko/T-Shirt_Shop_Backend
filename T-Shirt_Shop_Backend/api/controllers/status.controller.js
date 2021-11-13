const {Status} = require('./../database');

class StatusController {
    getAll(req, res) {
        Status.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving statuses."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Status.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving status with id: ${id}.`
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

        const status = {
            title: title,
        };

        Status.create(status)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the status!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Status.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Status was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update status with id: ${id}. Maybe status was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating status with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Status.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Status was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete status with id: ${id}. Maybe status was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete status with id: ${id}`
                });
            });
    };
}

module.exports = new StatusController();