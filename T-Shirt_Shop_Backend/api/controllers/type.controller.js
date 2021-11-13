const {Type} = require('./../database');

class TypeController {
    getAll(req, res) {
        Type.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving types."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Type.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving type with id: ${id}.`
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

        const type = {
            title: title,
        };

        Type.create(type)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the type!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Type.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Type was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update type with id: ${id}. Maybe type was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating type with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Type.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Type was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete type with id: ${id}. Maybe type was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete type with id: ${id}`
                });
            });
    };
}

module.exports = new TypeController();