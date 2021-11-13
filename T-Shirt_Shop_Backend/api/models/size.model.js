const {Model} = require('sequelize');

class SizeModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(20),
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'sizes'
        });
    };
}

module.exports = SizeModel;