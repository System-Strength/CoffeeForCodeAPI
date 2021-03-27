const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')

const ShoppingCart = require('./routes/shoppingcart')
const CardRoute = require('./routes/cards')
const ProductRoute = require('./routes/products')
const CategoryRoute = require('./routes/category')
const OrderRoute = require('./routes/orders')
const userRoute = require('./routes/users')
const ImagesRoute = require('./routes/images')
const MobileRoute = require('./routes/mobile')

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false})); // APenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

//  Routes
app.get('/', async (request, response) => {
    response.redirect('https://www.kauavitorio.com/systemstrength/api/')
});
app.use('/products', ProductRoute);
app.use('/category', CategoryRoute);
app.use('/orders', OrderRoute);
app.use('/images', ImagesRoute);
app.use('/user', userRoute);
app.use('/shoppingcart', ShoppingCart);
app.use('/card', CardRoute);
app.use('/mobile', MobileRoute);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
    const erro = new Error('Not found');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;