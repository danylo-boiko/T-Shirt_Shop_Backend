const {Model} = require('sequelize');

class TShirtDetailsModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            tshirt_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            color_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            size_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            material_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

        }, {
            sequelize,
            underscored: true,
            modelName: 'tshirts_details'
        });
    };
}

module.exports = TShirtDetailsModel;