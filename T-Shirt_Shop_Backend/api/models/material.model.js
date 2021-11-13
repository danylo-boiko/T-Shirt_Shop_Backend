const {Model} = require('sequelize');

class MaterialModel extends Model {
    static init(sequelize, Sequelize) {
        return super.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            composition : {
                type: Sequelize.STRING(150),
                allowNull: false
            }
        }, {
            sequelize,
            underscored: true,
            modelName: 'materials'
        });
    };
}

module.exports = MaterialModel;