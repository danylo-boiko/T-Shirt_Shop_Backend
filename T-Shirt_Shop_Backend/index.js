const express = require('express');
const cors = require('cors');
const config = require('./config/default.json');
const database = require('./api/database');
const routers  = require('./api/routers');

const app = express();

app.use(cors({
    origin: "http://localhost:4200"
}));

database.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', routers.authRouter);
app.use('/api/carts', routers.cartRouter);
app.use('/api/categories', routers.categoryRouter);
app.use('/api/colors', routers.colorRouter);
app.use('/api/customers', routers.customerRouter);
app.use('/api/delivery_methods', routers.deliveryMethodRouter);
app.use('/api/materials', routers.materialRouter);
app.use('/api/orders', routers.orderRouter);
app.use('/api/order_details', routers.orderDetailsRouter);
app.use('/api/payment_types', routers.paymentTypeRouter);
app.use('/api/sizes', routers.sizeRouter);
app.use('/api/statuses', routers.statusRouter);
app.use('/api/tshirts', routers.tshirtRouter);
app.use('/api/tshirt_details', routers.tshirtDetailsRouter);
app.use('/api/types', routers.typeRouter);

const port = config.app.port || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});