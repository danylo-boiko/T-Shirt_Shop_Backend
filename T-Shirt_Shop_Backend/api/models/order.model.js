const {Model} = require('sequelize');

class OrderModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            customer_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            delivery_method_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            payment_type_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            delivery_address: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            order_time: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'orders'
        });
    };
}

module.exports = OrderModel;