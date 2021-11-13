const {Model} = require('sequelize');

class DeliveryMethodModel extends Model {
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
            },
            cost: {
                type: Sequelize.DOUBLE,
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'delivery_methods'
        });
    };
}

module.exports = DeliveryMethodModel;