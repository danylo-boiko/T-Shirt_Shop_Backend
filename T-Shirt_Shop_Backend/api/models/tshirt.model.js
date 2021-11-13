const {Model} = require('sequelize');

class TShirtModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            image: {
                type: Sequelize.BLOB,
                allowNull: false
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'tshirts'
        });
    };
}

module.exports = TShirtModel;