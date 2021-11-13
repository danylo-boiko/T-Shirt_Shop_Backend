const {TShirt, TShirtDetails, Category} = require('./../database');

class TShirtController {
    getAll(req, res) {
        TShirt.findAll({
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: TShirtDetails,
                    as: 'tshirt_details',
                    include: ['type','color', 'size', 'material']
                }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving t-shirts."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;
        TShirt.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'title'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: TShirtDetails,
                    as: 'tshirt_details',
                    include: ['type','color', 'size', 'material']
                }
            ]
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving t-shirt."
                });
            });
    };

    create(req, res) {
        const {title, image, price} = req.body;

        if (!title) {
            res.status(400).send({
                message: "Title can't be empty!"
            });
            return;
        }

        if (!image) {
            res.status(400).send({
                message: "Image can't be empty!"
            });
            return;
        }

        if (!price) {
            res.status(400).send({
                message: "Price can't be empty!"
            });
            return;
        }

        const tshirt = {
            title: title,
            image: image,
            price: price
        };

        TShirt.create(tshirt)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the t-shirt!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        TShirt.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "TShirt was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update t-shirt with id: ${id}. Maybe t-shirer was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating t-shirt with id: ${id}`
                })
            });
    };

    delete(req, res) {
        const id = req.params.id;

        Category.destroy({
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "TShirt was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete t-shirt with id: ${id}. Maybe t-shirt was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete t-shirt with id: ${id}`
                });
            });
    };
}

module.exports = new TShirtController();