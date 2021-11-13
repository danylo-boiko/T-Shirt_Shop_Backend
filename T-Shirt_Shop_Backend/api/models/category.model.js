const {Model} = require('sequelize');

class CategoryModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'categories'
        });
    };
}

module.exports = CategoryModel;