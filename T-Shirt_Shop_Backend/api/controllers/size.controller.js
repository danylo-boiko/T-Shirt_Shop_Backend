const {Size} = require('./../database');

class SizeController {
    getAll(req, res) {
        Size.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving sizes."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Size.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving size with id: ${id}.`
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

        const size = {
            title: title,
        };

        Size.create(size)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the size!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Size.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Size was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update size with id: ${id}. Maybe size was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating size with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Size.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Size was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete size with id: ${id}. Maybe size was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete size with id: ${id}`
                });
            });
    };
}

module.exports = new SizeController();