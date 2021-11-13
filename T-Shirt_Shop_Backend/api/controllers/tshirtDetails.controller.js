const {TShirtDetails} = require('./../database');

class TShirtDetailsController {
    getAll(req, res) {
        TShirtDetails.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving t-shirt details."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        TShirtDetails.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving t-shirt detail with id: ${id}.`
                })
            });
    };

    create(req, res) {
        const {tshirt_id, type_id, color_id, size_id, material_id, count} = req.body;

        if (!tshirt_id) {
            res.status(400).send({
                message: "T-shirt id can't be empty!"
            });
            return;
        }

        if (!type_id) {
            res.status(400).send({
                message: "Type id can't be empty!"
            });
            return;
        }

        if (!color_id) {
            res.status(400).send({
                message: "Color id can't be empty!"
            });
            return;
        }

        if (!size_id) {
            res.status(400).send({
                message: "Size id can't be empty!"
            });
            return;
        }

        if (!material_id) {
            res.status(400).send({
                message: "Material id can't be empty!"
            });
            return;
        }

        if (!count) {
            res.status(400).send({
                message: "Count can't be empty!"
            });
            return;
        }

        const tshirtDetails = {
            tshirt_id: tshirt_id,
            type_id: type_id,
            color_id: color_id,
            size_id: size_id,
            material_id: material_id,
            count: count
        };

        TShirtDetails.create(tshirtDetails)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the t-shirt details!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        TShirtDetails.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "T-shirt details was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update t-shirt details with id: ${id}. Maybe t-shirt details was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating t-shirt details with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        TShirtDetails.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "T-shirt details was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete t-shirt details with id: ${id}. Maybe t-shirt details was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete t-shirt details with id: ${id}`
                });
            });
    };
}

module.exports = new TShirtDetailsController();