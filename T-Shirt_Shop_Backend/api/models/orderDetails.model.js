const {Model} = require('sequelize');

class OrderDetailsModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tshirt_details_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price_per_one: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
        }, {
            sequelize,
            underscored: true,
            modelName: 'orders_details'
        });
    };
}

module.exports = OrderDetailsModel;