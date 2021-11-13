const {Model} = require('sequelize');

class CustomerModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            surname: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
            hashed_password: {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        }, {
            sequelize,
            underscored: true,
            modelName: 'customers'
        });
    };
}

module.exports = CustomerModel;