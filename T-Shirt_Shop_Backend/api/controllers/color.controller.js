const {Color} = require('./../database');

class ColorController {
    getAll(req, res) {
        Color.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving colors."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Color.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving color with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {title, hexadecimal} = req.body;

        if (!title) {
            res.status(400).send({
                message: "Title can't be empty!"
            });
            return;
        }

        if (!hexadecimal) {
            res.status(400).send({
                message: "Hexadecimal can't be empty!"
            });
            return;
        }

        const color = {
            title: title,
            hexadecimal: hexadecimal
        };

        Color.create(color)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the color!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Color.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Color was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update color with id: ${id}. Maybe color was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating color with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Color.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Color was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete color with id: ${id}. Maybe color was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete color with id: ${id}`
                });
            });
    };
}

module.exports = new ColorController();