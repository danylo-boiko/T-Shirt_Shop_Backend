const {Material} = require('./../database');

class MaterialController {
    getAll(req, res) {
        Material.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving materials."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Material.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving material with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {composition} = req.body;

        if (!composition) {
            res.status(400).send({
                message: "Title can't be empty!"
            });
            return;
        }

        const material = {
            composition: composition,
        };

        Material.create(material)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the material!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Material.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Material was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update material with id: ${id}. Maybe material was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating material with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Material.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Material was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete material with id: ${id}. Maybe status was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete material with id: ${id}`
                });
            });
    };
}

module.exports = new MaterialController();