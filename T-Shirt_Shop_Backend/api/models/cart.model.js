const {Model} = require('sequelize');

class CartModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            customer_id: {
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
        }, {
            sequelize,
            underscored: true,
            modelName: 'carts'
        });
    };
}

module.exports = CartModel;