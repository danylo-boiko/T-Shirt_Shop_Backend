const {Category} = require('./../database');

class CategoryController {
    getAll(req, res) {
        Category.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving categories."
                });
            });
    };

    getById(req, res) {
        const id = req.params.id;

        Category.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving category with id: ${id}.`
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

        const category = {
            title: title
        };

        Category.create(category)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the category!"
                });
            });
    };

    update(req, res) {
        const id = req.params.id;

        Category.update(req.body, {
            where: {id: id},
            limit: 1
        })
            .then(num => {
                if (num[0] === 1) {
                    res.send({
                        message: "Category was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update category with id: ${id}. Maybe category was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating category with id: ${id}`
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
                        message: "Category was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete category with id: ${id}. Maybe category was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete category with id: ${id}`
                });
            });
    };
}

module.exports = new CategoryController();