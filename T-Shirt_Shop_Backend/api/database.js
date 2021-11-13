const Sequelize = require('sequelize');
const config = require('./../config/default.json');
const {mySQL} = config;
const models = require('./models')

const sequelize = new Sequelize(mySQL.database, mySQL.user, mySQL.password, {
    host: mySQL.host,
    dialect: mySQL.dialect,
    operatorsAliases: false,
    pool: {
        max: mySQL.pool.max,
        min: mySQL.pool.min,
        acquire: mySQL.pool.acquire,
        idle: mySQL.pool.idle
    },
    define: {
        timestamps: false
    }
});

const database = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Cart: models.cartModel.init(sequelize, Sequelize),
    Category: models.categoryModel.init(sequelize, Sequelize),
    Color: models.colorModel.init(sequelize, Sequelize),
    Customer: models.customerModel.init(sequelize, Sequelize),
    DeliveryMethod: models.deliveryMethodModel.init(sequelize, Sequelize),
    Material: models.materialModel.init(sequelize, Sequelize),
    Order: models.orderModel.init(sequelize, Sequelize),
    OrderDetails: models.orderDetailsModel.init(sequelize, Sequelize),
    PaymentType: models.paymentTypeModel.init(sequelize, Sequelize),
    Size: models.sizeModel.init(sequelize, Sequelize),
    Status: models.statusModel.init(sequelize, Sequelize),
    TShirt: models.tshirtModel.init(sequelize, Sequelize),
    TShirtDetails: models.tshirtDetailsModel.init(sequelize, Sequelize),
    Type: models.typeModel.init(sequelize, Sequelize)
};

database.TShirt.hasMany(database.TShirtDetails, {as: 'tshirt_details'});
database.Order.hasMany(database.OrderDetails, {as: 'order_details'});
database.TShirt.belongsToMany(database.Category, {
    through: 'categories_to_tshirts',
    as: 'categories',
    foreignKey: 'tshirt_id'
});
database.Category.belongsToMany(database.TShirt, {
    through: 'categories_to_tshirts',
    as: 'tshirts',
    foreignKey: 'category_id'
});
database.Cart.belongsTo(database.TShirtDetails, {foreignKey: 'tshirt_details_id', as: 'tshirt_details'});
database.TShirtDetails.belongsTo(database.Type, {foreignKey: 'type_id', as: 'type' });
database.TShirtDetails.belongsTo(database.Color, {foreignKey: 'color_id', as: 'color' });
database.TShirtDetails.belongsTo(database.Size, {foreignKey: 'size_id', as: 'size' });
database.TShirtDetails.belongsTo(database.Material, {foreignKey: 'material_id', as: 'material' });
database.Order.belongsTo(database.Status, {foreignKey: 'status_id', as: 'status' });
database.Order.belongsTo(database.DeliveryMethod, {foreignKey: 'delivery_method_id', as: 'delivery_method' });
database.Order.belongsTo(database.PaymentType, {foreignKey: 'payment_type_id', as: 'payment_type' });
database.Cart.removeAttribute('id');
database.OrderDetails.removeAttribute('id');

module.exports = database;