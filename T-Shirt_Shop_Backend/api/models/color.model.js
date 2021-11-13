const {Model} = require('sequelize');

class ColorModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            hexadecimal: {
                type: Sequelize.STRING(10),
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'colors'
        });
    };
}

module.exports = ColorModel;