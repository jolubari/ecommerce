'use-strict';

var express = require('express');
var app = express(); // inicializar express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.port || 4201;
//configuracion para el socket-io instalar con ->  npm i socket.io
var server = require('http').createServer(app);
// inicializar el paquete socket-io
var io = require('socket.io')(server, {
    cors: { origin: '*' } // peticiones que vengan del frontend sean de cualquier url
});

io.on('connection', function(socket) {
    // socket para eliminacion de item del carrito
    socket.on('delete-item-cart', function(data) { // poner a la escucha de un metodo
        io.emit('new-cart-delete');
        console.log(data);
    });

    // socket para añadir item del carrito
    socket.on('add-item-cart', function(data) { // poner a la escucha de un metodo
        io.emit('new-cart-add');
        console.log(data);
    });
});




// routes back-office:
var routeAuthAdmin = require('./routes/back-office/auth-routes');
var routeClientAdmin = require('./routes/back-office/client-routes');
var routeProductAdmin = require('./routes/back-office/product-routes');
var routeProductBalanceAdmin = require('./routes/back-office/product-balance-routes');
var routeCouponAdmin = require('./routes/back-office/coupon-routes');
var routeConfigAdmin = require('./routes/back-office/config-routes');
var routeDiscountAdmin = require('./routes/back-office/discount-routes');
var routeContactAdmin = require('./routes/back-office/contact-routes');
var routeSaleAdmin = require('./routes/back-office/sale-routes');
var routeKpiAdmin = require('./routes/back-office/kpi-routes');


// routes ecommerce:
var routeClient = require('./routes/ecommerce/client-routes');
var routeProduct = require('./routes/ecommerce/product-routes');
var routeConfig = require('./routes/ecommerce/config-routes');
var routeCart = require('./routes/ecommerce/cart-routes');
var routeAddress = require('./routes/ecommerce/address-routes');
var routeSale = require('./routes/ecommerce/sale-routes');
var routeDiscount = require('./routes/ecommerce/discount-routes');
var routeContact = require('./routes/ecommerce/contact-routes');
var routeOrders = require('./routes/ecommerce/orders-routes');
var routeReview = require('./routes/ecommerce/review-routes');

// usar la variable de mongoose para la conexion a BBDD:
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce_db', { useUnifiedTopology: true, useNewUrlParser: true }, (error, response) => {
    if (error) {
        console.error('Connection error: ', error);
    } else {
        server.listen(port, function() { // enviamos server en vez de app.listen por el socket-io
            console.info('Server is running on port: ', port);
        });
    }
});

app.use(bodyParser.urlencoded({ extended: true })); // para analizar los cuerpos de las peticiones, nos devuelve un json
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.use((req, res, next) => { // Permisos cors porque el backend es un proyecto separado del front
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', routeAuthAdmin);
app.use('/api', routeClientAdmin);
app.use('/api', routeProductAdmin);
app.use('/api', routeProductBalanceAdmin);
app.use('/api', routeCouponAdmin);
app.use('/api', routeConfigAdmin);
app.use('/api', routeDiscountAdmin);
app.use('/api', routeContactAdmin);
app.use('/api', routeSaleAdmin);
app.use('/api', routeKpiAdmin);




app.use('/api', routeClient);
app.use('/api', routeProduct);
app.use('/api', routeConfig);
app.use('/api', routeCart);
app.use('/api', routeAddress);
app.use('/api', routeSale);
app.use('/api', routeDiscount);
app.use('/api', routeContact);
app.use('/api', routeOrders);
app.use('/api', routeReview);


module.exports = app; // exportamos el app.js